import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import oauth from 'oauth'
const consumerKey = 'jHbq93O8UUMXPVwtS2XP5SMiV'
const consumerSecret = 'RBngDERlPp7wSba6gGkbJ8pY2ENkEN2pBgS5CNOjfUA2ZYLNiB'

// import productRoutes from './routes/productRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import tcourseRoutes from './routes/tcourseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import studentRoutes from './routes/studentRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import {tweetThread} from './controllers/threadController.js'

const consumer = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
  // consumerKey, consumerSecret, "1.0A", "http://localhost:3000/auth-page", "HMAC-SHA1");
  consumerKey, consumerSecret, "1.0A", "https://app.teachun.ltd/auth-page", "HMAC-SHA1");

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// app.use('/api/products', productRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/tcourses', tcourseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.get('/start-auth', (req, res) => {
	consumer.getOAuthRequestToken(function(error, oauthRequestToken, oauthRequestTokenSecret, results){
    if (error) {
      console.log(error)
      res.status(500).send({error:"Error getting OAuth request token : " + error});

    } else {  
      console.log("oauthRequestToken "+oauthRequestToken);
      console.log("oauthRequestTokenSecret "+oauthRequestTokenSecret);
      res.status(200).send({redirectUrl: "https://twitter.com/oauth/authorize?oauth_token="+oauthRequestToken,
       oauthRequestToken: oauthRequestToken,
       oauthRequestTokenSecret: oauthRequestTokenSecret 
     })
    }
  }); 
})

app.get('/callback/:oauthRequestToken/:oauthRequestTokenSecret/:oauth_verifier', (req, res) => { 
  console.log("oauthRequestToken "+req.params.oauthRequestToken);
  console.log("oauthRequestTokenSecret "+req.params.oauthRequestTokenSecret);
  console.log("oauth_verifier "+req.params.oauth_verifier);

  consumer.getOAuthAccessToken(req.params.oauthRequestToken, req.params.oauthRequestTokenSecret, req.params.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.status(500).send({error :"Error getting OAuth access token : " + error + "[" + oauthAccessToken + "]" + "[" + oauthAccessTokenSecret + "]" + "[" + results + "]"});
    } else {      
        res.status(200).send({oauthAccessToken: oauthAccessToken, oauthAccessTokenSecret: oauthAccessTokenSecret})
          }
      });
  })

app.get('/verify/:oauthAccessToken/:oauthAccessTokenSecret/:courseId', (req, res) => {
  consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.params.oauthAccessToken, req.params.oauthAccessTokenSecret, function (error, data, response) {
    if (error) {
      console.log(error)
      res.status(500).send({error: "authentication error"});
    } else {
      const parsedData = JSON.parse(data);
      // console.log('parsedData', JSON.stringify(parsedData));

      const config = {
        consumer_key:"jHbq93O8UUMXPVwtS2XP5SMiV",
        consumer_secret:"RBngDERlPp7wSba6gGkbJ8pY2ENkEN2pBgS5CNOjfUA2ZYLNiB",
        access_token:req.params.oauthAccessToken,
        access_token_secret:req.params.oauthAccessTokenSecret,
      };
      req.config = config
      req.courseId = req.params.courseId
      req.parsedData = parsedData
      tweetThread(req, res)
    } 
  });
})

const __dirname = path.resolve()
app.use('/content', express.static(path.join(__dirname, '/content')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
