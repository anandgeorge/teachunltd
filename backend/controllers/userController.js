import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
// import SES from 'aws-sdk/clients/ses';
import AWS from 'aws-sdk'
import fs from 'fs'

const SESConfig = {
  apiVersion: '2010-12-01',
  accessKeyId: "AKIA6DIU2I7J4O6MPXN5",
  secretAccessKey: "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",
  region: 'ap-south-1'
};


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isTutor: user.isTutor,
      token: generateToken(user._id),
      domain: user.domain,
      verified: user.verified
      // balance: user.balance
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username, domain } = req.body
  const emailExists = await User.findOne({ email })
  const userExists = await User.findOne({ username })

  if (emailExists || userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
    domain,
  })

  if (user) {
    // let template = `Hi ${name},</br></br>We just need to verify your email address before you can access Teach Unlimited.</br></br>Verify your email address by clicking <a href="https://api.teachun.ltd/users/verify/${email}/${user._id}">here</a></br></br>Thanks! – Teach Unlimited`
    let template = `Hi ${name},</br></br>We just need to verify your email address before you can access Teach Unlimited.</br></br>Verify your email address by clicking <a href="https://api.teachun.ltd/api/users/verify/${email}/${user._id}">here</a>.</br></br> Thanks! – Teach Unlimited`
    console.log('Template', template);
    var params = {
      Source: 'anand@teachun.ltd',
      Destination: {
        ToAddresses: [
          email
        ]
      },
      ReplyToAddresses: [
        'anand@teachun.ltd',
      ],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: template
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Verify your email'
        }
      }
    };

    if(email.indexOf('teachun.ltd') === -1) {
      new AWS.SES(SESConfig).sendEmail(params).promise().then((resp) => {
        console.log(resp);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          isAdmin: false,
          isTutor: true,
          token: generateToken(user._id),
          domain: user.domain,
          verified: user.verified
        })
      });      
    }
    else {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: false,
        isTutor: true,
        token: generateToken(user._id),
        domain: user.domain,
        verified: user.verified
      })
    }
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const resendEmail = asyncHandler(async (req, res) => {
  console.log('In resend email', req.user._id)
  const user = await User.findById(req.user._id)
  console.log('User in resendemail', user);

  if (user) {
    // let template = `Hi ${name},</br></br>We just need to verify your email address before you can access Teach Unlimited.</br></br>Verify your email address by clicking <a href="https://api.teachun.ltd/users/verify/${email}/${user._id}">here</a></br></br>Thanks! – Teach Unlimited`
    let template = `Hi ${user.name},</br></br>We just need to verify your email address before you can access Teach Unlimited.</br></br>Verify your email address by clicking <a href="https://api.teachun.ltd/users/verify/${user.email}/${user._id}">here</a></br></br>Thanks! – Teach Unlimited`
    console.log('Template', template);
    var params = {
      Source: 'anand@teachun.ltd',
      Destination: {
        ToAddresses: [
          user.email
        ]
      },
      ReplyToAddresses: [
        'anand@teachun.ltd',
      ],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: template
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Verify your email'
        }
      }
    };

    if(user.email.indexOf('teachun.ltd') === -1) {
      new AWS.SES(SESConfig).sendEmail(params).promise().then((resp) => {
        console.log(resp);
        res.status(201).json({
          token: generateToken(user._id),
        })
      });
    }
    else {
      res.status(201).json({
        token: generateToken(user._id),
      })
    }
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isTutor: user.isTutor,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const type = req.query.type;
  let query = {}
  if(type === 'tutor') {
    query = {isTutor: true}
  }
  else {
    query = {isTutor: false, isAdmin: false}
  }
  const users = await User.find(query)
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  console.log('In getUserById', user);

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getBalance = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('balance')

  if (user) {
    res.json({balance: user.balance})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const getNotification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('notification')

  if (user) {
    res.json({notification: user.notification})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const verifyEmail = asyncHandler(async (req, res) => {
  console.log('In verifyEmail', req.params)
  const user = await User.findById(req.params.id)
  console.log('In user', user)
  if (user && user.email === req.params.email) {
    user.verified = true
    const updatedUser = await user.save()

    res.redirect(`https://${user.domain}.teachun.ltd`)
    // res.redirect(`http://localhost:3000`)
  }
  else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getBalance,
  getNotification,
  verifyEmail,
  resendEmail
}
