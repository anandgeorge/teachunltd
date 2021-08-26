import asyncHandler from 'express-async-handler'
import Content from '../models/contentModel.js'
import Course from '../models/courseModel.js'
import User from '../models/userModel.js'
import sanitizeHtml from 'sanitize-html';

import lp from 'link-preview-js';

import bbb from 'bigbluebutton-js'

import dotenv from 'dotenv'
dotenv.config()


const api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)
const http = bbb.http

const getContentById = asyncHandler(async (req, res) => {
  const contents = await Content.findById(req.params.id)

  if (contents) {
    res.json(contents)
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const getPendingContent = asyncHandler(async (req, res) => {
  const pendings = await Content.find({accepted:false})

  if (pendings) {
    res.json({pendings})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const deleteContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id)

  if (content && !content.accepted) {
    await content.remove()
    res.json({ message: 'Content removed' })
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

const createContent = asyncHandler(async (req, res) => {
  const content = new Content({
    name: 'Title of the content',
    tutor: req.user._id,
    username: req.user.username,
    course: req.body.id,
    image: '/images/sample.jpg',
    url: 'sample-name',
    type: req.body.type,
    description: 'Elaborate the content'
  })

  const createdContent = await content.save()
  // console.log('Created content', createdContent);
  let course = await Course.findById(req.body.id)
  // console.log('Course', course)
  if(course) {
    if(course.contents) {
      course.contents.push(createdContent._id)
    }
    else {
      course.contents = [];
      course.contents.push(createdContent._id)
    }
    course.accepted = false;
    course.changed = true;
    const updatedCourse = await course.save()
    res.status(201).json(createdContent)
  }
  else {
    res.status(404)
    throw new Error('Course not found')    
  }
})

const addContent = asyncHandler(async (req, res) => {
  const content = new Content({
    name: 'Sample name',
    tutor: req.user._id,
    username: req.user.username,
    course: req.body.id,
    image: '/images/sample.jpg',
    url: 'sample-name',
    type: 'text',
    description: 'Sample description'
  })

  const createdContent = await content.save()
  // console.log('Created content', createdContent);
  let course = await Course.findById(req.body.id)
  // console.log('Course', course)
  if(course) {
    if(course.contents) {
      course.contents.splice(req.body.idx + 1, 0, createdContent._id)
    }
    else {
      course.contents = [];
      course.contents.splice(req.body.idx + 1, 0, createdContent._id)
    }
    const updatedCourse = await course.save()
    res.status(201).json({content:createdContent, contentsArr:updatedCourse.contents})
  }
  else {
    res.status(404)
    throw new Error('Course not found')    
  }
})

const updateContent = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    url,
    description
  } = req.body

  console.log('In updateContent', name, image, url, description);

  const content = await Content.findById(req.params.id)

  if (content) {
    content.name = name
    content.image = image
    content.url = url
    if(description) {
      content.description = sanitizeHtml(description)
    }

    if(content.type === 'link') {
      if(url.indexOf('teachun.ltd') > -1 || url.indexOf('localhost') > -1) {
        let urls = url.split('/');
        let courseId = urls.pop();
        let course = await Course.findById(courseId)        
        if(course) {
          content.name = course.name
          content.description = course.description
          content.type = 'self'
        }
      }
      else {
        const urlObj = await lp.getLinkPreview(url);
        // console.log('In content type link urlObj', urlObj);
        if(urlObj.siteName === 'YouTube' && urlObj.mediaType === 'video.other') {
          content.type = 'youtube'
          let urlView = urlObj.url;
          let splits = urlView.split('=');
          let videoId = splits[1];
          content.url = 'https://www.youtube.com/embed/' + videoId
          // if(urlObj.images && urlObj.images[0]) {
          //   content.image = urlObj.images[0]
          // }
        }
        else if(urlObj.siteName === 'Twitter') {
          content.type = 'twitter'
          let urlView = urlObj.url;
          let splits = urlView.split('/status/');
          let statusId = splits[1];
          content.url = statusId;
        }
        else if(urlObj.mediaType === 'link' || urlObj.mediaType === 'website' || urlObj.mediaType === 'article' || urlObj.siteName === 'Scribd' || urlObj.mediaType === 'news' || urlObj.mediaType === 'video') {
          content.type = 'link'
          if(urlObj.images && urlObj.images[0]) {
            // check if the request to the image returns 200. Only then save it.
            content.image = urlObj.images[0] 
          }
          content.url = urlObj.url
          if(urlObj.description && urlObj.description.length > 10) {
            content.description = urlObj.description
          }
          else {
            content.description = content.name
          }
          content.name = urlObj.title
        }
      }      
    }

    content.accepted = false;
    console.log('Content in update content', content);

    const updatedContent = await content.save()
    // await Course.update({ contents: req.params.id}, {$set:{changed:true, accepted:false}},{multi:true})
    res.json(updatedContent)
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

const acceptContent = asyncHandler(async (req, res) => {
  // const content = await Content.findById(req.params.id)
  // // console.log('In accept content', req.params.id, content);

  // if (content) {
  //   content.accepted = true
  //   const updatedContent = await content.save()
  //   res.json(updatedContent)
  // } else {
  //   res.status(404)
  //   throw new Error('Content not found')
  // }
  const content = await Content.findById(req.params.id);
  const tutor = content.tutor;

  if (content) {
    if(!content.subscribers) {
      content.subscribers = [];
    }
    content.subscribers.push(req.user._id);
    const userDebit = await User.findById(req.user._id).select('balance')
    const userCredit = await User.findById(tutor).select('balance')
    const newcollected = content.collected + content.coins
    const newDebitBalance = userDebit.balance - content.coins
    const newCreditBalance = userCredit.balance + content.coins
    content.collected = newcollected
    const updatedContent = await content.save()
    userDebit.balance = newDebitBalance
    userCredit.balance = newCreditBalance
    const updatedDebitUser = await userDebit.save()
    const updatedCreditUser = await userCredit.save()
    // console.log('In subscribe', newcollected, newbalance)
    res.json({balance: newDebitBalance, subscribers: content.subscribers, id:req.params.id})
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

const subscribeContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id);
  const tutor = content.tutor;

  if (content) {
    if(!content.subscribers) {
      content.subscribers = [];
    }
    content.subscribers.push(req.user._id);
    const userDebit = await User.findById(req.user._id).select('balance')
    const userCredit = await User.findById(tutor).select('balance')
    const newcollected = content.collected + content.coins
    const newDebitBalance = userDebit.balance - content.coins
    const newCreditBalance = userCredit.balance + content.coins
    content.collected = newcollected
    const updatedContent = await content.save()
    userDebit.balance = newDebitBalance
    userCredit.balance = newCreditBalance
    const updatedDebitUser = await userDebit.save()
    const updatedCreditUser = await userCredit.save()
    // console.log('In subscribe', newcollected, newbalance)
    res.json({balance: newDebitBalance, subscribers: content.subscribers, id:req.params.id})
  } else {
    res.status(404)
    throw new Error('Content not found')
  }
})

const likeContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id)

  if (content) {
    if(!content.likes) {
      content.likes = [];
    }    
    content.likes.push(req.user._id)
    content.likesc++
    const updatedContent = await content.save()
    res.json({likesc:content.likesc, id:req.params.id, likes: content.likes})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const payContent = asyncHandler(async (req, res) => {
  const content = await Content.findById(req.params.id)

  if (content) {
    let coins = content.coins;
    coins = coins > 0 ? 0 : 10;
    content.coins = coins;
    content.accepted = false
    const updatedContent = await content.save()
    await Course.update({ contents: req.params.id}, {$set:{changed:true, accepted:false}},{multi:true})
    res.json({coins:updatedContent.coins, id: req.params.id, accepted: updatedContent.accepted})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const upContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.cid)
  const idx = req.params.idx

  if (course) {
    let contents = course.contents;
    let arrDeletedItems = contents.splice(idx, 1);
    let upItem = arrDeletedItems[0]
    let newIdx = idx - 1
    contents.splice(newIdx, 0, upItem);
    course.contents = contents
    course.accepted = false
    course.changed = true
    const updatedCourse = await course.save()
    // console.log('UpdatedCourse in upContent', updatedCourse)
    res.json({contentsArr: updatedCourse.contents, idx: idx})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const downContent = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.cid)
  const idx = req.params.idx

  if (course) {
    let contents = course.contents;
    let arrDeletedItems = contents.splice(idx, 1);
    let downItem = arrDeletedItems[0]
    let newIdx = parseInt(idx) + 1
    contents.splice(newIdx, 0, downItem);
    course.contents = contents
    course.accepted = false
    course.changed = true
    const updatedCourse = await course.save()
    // console.log('UpdatedCourse in downContent', updatedCourse)
    res.json({contentsArr: updatedCourse.contents, idx: idx})
  } else {
    res.status(404)
    throw new Error('Course not found')
  }
})

const joinClass = asyncHandler(async (req, res) => {
  // console.log('In join class', req.params);
  const id = req.params.id;
  const courseId = req.params.courseId;
  const logoutURL = 'https://gurukul.best/learn/' + courseId
  const content = await Content.findById(id);
  // console.log('Content', content, 'User', req.user._id);

  const tutor = content.tutor

  const checkRunningUrl = api.monitoring.isMeetingRunning(id);

  http(checkRunningUrl).then((resul) => {
    const isRunning = resul.running;
    const name = content.name;

    if(req.user._id && req.user._id.toString() === tutor.toString()) {
      if(isRunning) {
          const moderatorUrl = api.administration.join(req.user.name, id, id);
          const join = { url: moderatorUrl, name: name, notRunning: !isRunning}      
          res.json(join)
      } else {
        const meetingCreateUrl = api.administration.create(name.replace(/[^a-zA-Z0-9 ]/g, ""), id, {
          attendeePW: 'student',
          moderatorPW: id,
          record: true,
          logoutURL: logoutURL
        })

        http(meetingCreateUrl).then((result) => {
          if (result && result.returncode === "SUCCESS" && result.messageKey !== "duplicateWarning") {
            const moderatorUrl = api.administration.join(req.user.name, id, id);
            content.url = result.internalMeetingID
            const updatedContent = content.save()
            const join = { url: moderatorUrl, name: name, notRunning: !isRunning}
            res.json(join)
          } else if (result && result.returncode === "SUCCESS" && result.messageKey === "duplicateWarning") {
            const moderatorUrl = api.administration.join(req.user.name, id, id);
            const join = { url: moderatorUrl, name: name, notRunning: !isRunning}
            res.json(join)
          } else if (result && result.returncode === "FAILED" && result.messageKey === 'idNotUnique') {
            const moderatorUrl = api.administration.join(req.user.name, id, id);
            const join = { url: moderatorUrl, name: name, notRunning: !isRunning}
            res.json(join)
          } else {
            res.status(404)
            throw new Error('Content not found')
          }
        })      
      }
    }
    else {
      const attendeeUrl = api.administration.join(req.user.name, id, 'student');
      // console.log('attendeeUrl', attendeeUrl);
      const join = { url: attendeeUrl, name: name, notRunning: !isRunning}
      res.json(join)
    }
  })




  // const join = {
  //   url:'https://bbb.classroom.ltd/bigbluebutton/api/join?fullName=moderator&meetingID=200&password=supersecret&checksum=a50b3de0a1b522c1535ff3c27f3c4997f5544f99', 
  //   name:'Linear Equations in Two Variables Test'}

// conditionally create or join the class
// if tutor is trying to join the class, create the class and then send back the join link
// if student is trying to join, check if the meeting is on. if on allow student to join. Else inform that meeting has not started / ended and maybe keep the spinner running to
// regularly check if the meeting has started and then enable the join button.



  // const pageSize = 10
  // const page = Number(req.query.pageNumber) || 1

  // const count = await Course.countDocuments({ tutor: req.user._id })
  // const tcourses = await Course.find({ tutor: req.user._id })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))


  // http(meetingCreateUrl).then((result) => {
  //   console.log(result)
   

  // })

  //   let moderatorUrl = api.administration.join('moderator', '2', 'supersecret')
  //   let attendeeUrl = api.administration.join('attendee', '2', 'secret')
  //     console.log(`Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`)
   
  //   let meetingEndUrl = api.administration.end('1', 'supersecret')
  //   console.log(`End meeting link: ${meetingEndUrl}`)

  // const tcourse = await Course.findById(req.params.id)

  // if (tcourse) {
  //   res.json(tcourse)
  // } else {
  //   res.status(404)
  //   throw new Error('Course not found')
  // }

  // res.json(join)

})



export {
	getContentById,
	deleteContent,
	createContent,
	updateContent,
  joinClass,
  acceptContent,
  getPendingContent,
  subscribeContent,
  likeContent,
  payContent,
  upContent,
  downContent,
  addContent
}
