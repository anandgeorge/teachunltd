// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import { listContent } from '../actions/contentActions'
// import { listCourseDetails } from '../actions/courseActions'
import Thread from '../components/Thread'
import axios from "axios";
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { createCourse } from '../actions/courseActions'
import { COURSE_CREATE_RESET } from '../constants/courseConstants'

const TweetScreen = ({ match, history, location }) => {
  const id = match.params.id
  const username = match.params.uid
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    success: successCourseCreate,
    course: createdCourse,
  } = courseCreate

  const createCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      dispatch(createCourse(userInfo._id))
    }    
  }  

  useEffect(() => {
    dispatch({ type: COURSE_CREATE_RESET })
    if (successCourseCreate) {
        // console.log('In successCourseCreate', createdCourse);
        history.push(`/tutor/course/${createdCourse._id}/edit`)    
    }
    if (!userInfo) {
        history.push(`/${username}/learn/${id}`)
    }
    else {
        // console.log('Tweetsids', location.state.ids)
        setTweets(location.state.ids);
        // console.log('location.state.ids', location.state.ids.length)
        let timer = location.state.ids.length / 3 * 1000
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }
  }, [location, successCourseCreate]);

  return (
    <>
        <h4 style={{'marginLeft':'-10px', 'letterSpacing': '0px','textTransform':'none', 'marginTop':'10px'}}>&nbsp;&nbsp; Rendered Thread</h4>
        {loading ? (
            <>
            <Row >
                <Col sm={12} md={8} lg={8} xl={8}>
                    <i className='fas fa-3x fa-bullhorn' style={{'position':'fixed', 'bottom': 80, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}></i>
                    {[0,1].map((idx) => (
                        <TwitterTweetEmbed tweetId={tweets[idx]} key={tweets[idx]} />
                    ))}
                </Col>
                <Col sm={12} md={4} lg={4} xl={4}>
                  <Loader />
                  <p style={{'paddingLeft': '10px', 'fontSize': '16px'}}>Loading Tweets...</p>
                </Col>
            </Row>
          </>
        ):(
            <>
                <Row >
                    <Col sm={12} md={8} lg={8} xl={8}>
                        <i className='fas fa-3x fa-bullhorn' style={{'position':'fixed', 'bottom': 10, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}></i>
                        {tweets.map((tweet, idx) => (
                            <TwitterTweetEmbed tweetId={tweet} key={tweet} />
                        ))}
                    </Col>
                    <Col sm={12} md={4} lg={4} xl={4}>
                        {/* <Link to={`/${username}/learn/${id}`} className='btn btn-light my-3'>
                            Go Back
                        </Link> */}
                    </Col>
                </Row>
            </>
        )
        }
    </>
  )
}

export default TweetScreen
