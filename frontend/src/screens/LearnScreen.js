// import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Navbar, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Iframe from 'react-iframe'

import Message from '../components/Message'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Course from '../components/Course'
import Content from '../components/Content'
import Notification from '../components/Notification'
// import Paginate from '../components/Paginate'
import { listCourseDetails, createCourse, likeCourse, notifyCourse, acceptCourse, listCourses
  // lockCourse
} from '../actions/courseActions'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  listContent,
  deleteContent,
  createContent,
  acceptContent,
  subscribeContent, 
  likeContent,
  addContent
} from '../actions/contentActions'

import {
  resendEmail
} from '../actions/userActions'

import { CONTENT_CREATE_RESET, CONTENT_LIKE_RESET, CONTENT_LIST_SUCCESS, CONTENT_SUBSCRIBE_RESET, CONTENT_ADD_RESET } from '../constants/contentConstants'
import { COURSE_LIKE_RESET, COURSE_DETAILS_SUCCESS, COURSE_NOTIFY_RESET, COURSE_CREATE_RESET, COURSE_ACCEPT_RESET } from '../constants/courseConstants'
import { USER_EMAIL_RESET } from '../constants/userConstants'

const LearnScreen = ({ location, history, match }) => {
  const dispatch = useDispatch()
  const uid = match.params.uid
  const id = match.params.id

  // console.log('Location', location.pathname, window.location.href);

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  // console.log('Course details', course);

  const courseLike = useSelector((state) => state.courseLike)
  const {
    loading: loadingLike,
    error: errorLike,
    success: successLike,
    cid: ccid,
    likesc: clikesc,
    likes: clikes
  } = courseLike

  // get the data in the return call and then call  dispatch({type: COUSRSE_LIST_SUCCESS, payload: {course:newCourse}})

  const contentLike = useSelector((state) => state.contentLike)
  const {
    loading: loadingCLike,
    error: errorCLike,
    success: successCLike,
    cid: cid,
    likesc: likesc,
    likes: likes
  } = contentLike

  // console.log('In contentLike', cid, likesc, likes);

  const courseNotify = useSelector((state) => state.courseNotify)
  const {
    loading: loadingNotify,
    error: errorNotify,
    success: successNotify,
    cid: cncid,
    notifyc: notifyc,
    notify: notify
  } = courseNotify

  // console.log('CourseNotify', courseNotify)

  const courseAccept = useSelector((state) => state.courseAccept)
  // console.log('CourseAccept', courseAccept)

  const {
    success: successAccept,
  } = courseAccept


  const contentSubscribe = useSelector((state) => state.contentSubscribe)
  const {
    loading: loadingSubscribe,
    error: errorSubscribe,
    success: successSubscribe,
    balance: balance,
    subscribers: subscribers,
    csid: csid
  } = contentSubscribe

  // console.log('contentSubscribe', contentSubscribe);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contentCreate = useSelector((state) => state.contentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    content: createdContent,
  } = contentCreate

  const contentAdd = useSelector((state) => state.contentAdd)
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
    content: addedContent,
    contentsArr: contentsAddArr
  } = contentAdd

    // console.log('Contents Add', contentAdd)

  const contentList = useSelector((state) => state.contentList)
  const { loading: loadingContent, errorContent, contents } = contentList

  const courseList = useSelector((state) => state.courseList)
  const { 
    loading: loadingCourse,
    courses
   } = courseList

  // console.log('Courses', courses);

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    success: successCourseCreate,
    course: createdCourse,
  } = courseCreate

  useEffect(() => {
    dispatch({ type: CONTENT_CREATE_RESET })
    dispatch({ type: COURSE_CREATE_RESET })  
    dispatch({ type: COURSE_ACCEPT_RESET })
    dispatch({ type: CONTENT_ADD_RESET })
    dispatch({ type: USER_EMAIL_RESET })

    if (successCourseCreate) {
      // console.log('In successCourseCreate', createdCourse);
      history.push(`/tutor/course/${createdCourse._id}/edit`)    
    } else if (successCreate) {
      if(createdContent.type === 'pdf') {
        history.push(`/tutor/pdf/${createdContent._id}/edit`)
      }
      else if(createdContent.type === 'link'){
        history.push(`/tutor/link/${createdContent._id}/edit`)
      }
      else if(createdContent.type === 'image'){
        history.push(`/tutor/image/${createdContent._id}/edit`)
      }
      else if(createdContent.type === 'audio'){
        history.push(`/tutor/audio/${createdContent._id}/edit`)
      }
      else if(createdContent.type === 'text'){
        history.push(`/tutor/text/${createdContent._id}/edit`)
      }
    } else if(successCLike) {
      const newContent = contents.map(function(content) {
        if(content._id === cid) {
          content.likesc = likesc;
          content.likes = likes;
        }
        return content
      })
      // console.log('Contents in newcontent', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      dispatch({ type: CONTENT_LIKE_RESET }) 
    } else if(successSubscribe) {
      const newContent = contents.map(function(content) {
        if(content._id === csid) {
          content.subscribers = subscribers;
        }
        return content
      })
      // console.log('Contents in successSubscribe', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      dispatch({ type: CONTENT_SUBSCRIBE_RESET })
    } else if(successLike) {
      const newCourse = Object.assign({}, course);
      newCourse.likes = clikes
      newCourse.likesc = clikesc
      // console.log('Course in newliks', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: COURSE_LIKE_RESET })
    } else if(successNotify) {
      const newCourse = Object.assign({}, course);
      newCourse.notify = notify
      newCourse.notifyc = notifyc
      // console.log('Course in newNotify', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: COURSE_NOTIFY_RESET })
    } else if(successAccept) {
      const newContent = contents.map(function(content) {
        content.accepted = true;
        return content;
      })
      // console.log('Contents in successAccept', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = true
      newCourse.changed = false
      // console.log('Course in newNotify', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: COURSE_ACCEPT_RESET })
    } else if(successAdd) {
      // console.log('In successAdd', contentsAddArr, addedContent);
      contents.push(addedContent);
      const newContent = contents.sort((a,b) => contentsAddArr.indexOf(a._id) - contentsAddArr.indexOf(b._id))
      // console.log('Contents in successAdd', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      history.push(`/tutor/text/${addedContent._id}/edit`)
    } else if(!course.name || course._id !== id) {
      // console.log('Course in details for list content and listcoursedetails', course.name, course._id, id)
      dispatch(listCourseDetails(id))  
      dispatch(listContent(id))
      if(courses.length === 0) {
        dispatch(listCourses()) // will change it later based on some criteria
      }
      // setTimeout(function() {
      //   window.scroll({top: 0, left: 0, behavior: 'smooth' })
      // }, 10000)
    }
  }, [dispatch, history, successCreate, successLike, successNotify, successSubscribe, successCLike, successCourseCreate, successAccept, successAdd, id])
  
  const createCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // console.log('In create course handler dispatch', userInfo)
      dispatch(createCourse(userInfo._id))
    }    
  }  

  const editHandler = () => {
      history.push(`/${uid}/teach/${id}`)
  }  

  const likeContentHandler = (cont) => {
    // console.log('In likeContentHandler', cont._id)
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      dispatch(likeContent(cont._id))
    }
  }  

  const commentHandler = (idx) => {
    // console.log('In commentHandler', idx)
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      dispatch(addContent(course._id, idx))
    }
  }  

  const likeCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      dispatch(likeCourse(course._id))
    }
  }  

  const notifyCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // console.log('In notify course handler dispatch', userInfo)
      dispatch(notifyCourse(course._id))
    }  
  }  

  const cloneContentHandler = () => {
    // history.push(`/${uid}/teach/${id}`)
  }  

  const cloneCourseHandler = () => {
    // history.push(`/${uid}/teach/${id}`)
  }    

  const shareHandler = () => {
    // history.push(`/${uid}/teach/${id}`)
  }    
 
  const shareCourseHandler = () => {
    // history.push(`/${uid}/teach/${id}`)
  } 
  
  const subscribeHandler = (id) => {
    // console.log('In subscribeHandler in LearnScreen', id );
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // console.log('In subscribe handler', id)
      dispatch(subscribeContent(id))
    } 
  } 

  const publishCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // console.log('In accept course handler', id)
      dispatch(acceptCourse(id))
    }   
  }  

  const threadCourseHandler = () => {
    // console.log('In threadCourseHandler');
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // history.push(`/signin/${course._id}`)
      history.push(`/${course.username}/thread/${course._id}`)
    }   
  }    

  const showTweetHandler  = () => {
    // console.log('In showTweetHandler');
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      history.push({pathname: `/${course.username}/tweet/${course._id}`, state: { ids: course.tweets}});
    }   
  }  

  // const lockHandler  = () => {
  //   console.log('In lockHandler');
  //   if (!userInfo || !userInfo.isTutor) {
  //     history.push(`/login?redirect=${location.pathname}`)
  //   } else {
  //     history.push({pathname: `/${course.username}/tweet/${course._id}`, state: { ids: course.tweets}});
  //   }   
  // }

  const lockHandler = () => {
    // console.log('In toggle lock', course);
    // dispatch(lockContent(course._id))
  }

  const signUpHandler = () => {
    history.push(`/login?redirect=${location.pathname}`)
  }  

  const resendEmailHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      dispatch(resendEmail())
    }    
  }  

  return (
    <>
    <Meta title={course.name} description={course.description} url={window.location.href}/>

      {/* <Row className='align-items-center'>
          {userInfo && userInfo.username === uid ? (
            <i className='far fa-lg fa-edit' onClick={editHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
          ) : (
            <>
                {course.likes && userInfo && course.likes.indexOf(userInfo._id) > -1 ? (
                  <i className='fas fa-lg fa-heart' style={{'marginLeft':'10px', 'color':'red'}} disabled></i>
                ) : (
                  <i className='far fa-lg fa-heart' style={{'marginLeft':'10px', 'color':'red'}} onClick={likeCourseHandler}></i>
                )}
                <Badge variant="light">{course.likesc}</Badge>
                {course.notify && userInfo && course.notify.indexOf(userInfo._id) > -1 ? (
                  <i className='fas fa-lg fa-bell' style={{'marginLeft':'10px', 'color':'black'}} disabled></i>
                ) : (
                  <i className='far fa-lg fa-bell'  style={{'marginLeft':'10px', 'color':'black'}} onClick={notifyCourseHandler}></i>
                )}
                <Badge variant="light">{course.notifyc}</Badge>
          </>
          )}
          <i className='far fa-lg fa-clone' onClick={cloneCourseHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
          <Badge variant="light">4</Badge>
          <i className='fas fa-lg fa-share-alt' onClick={shareCourseHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
      </Row> */}
      {loadingContent || loadingCourse ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row >
            <Col sm={12} md={6} lg={6} xl={6} style={{'width':'100%'}}>
              {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
              {userInfo && !userInfo.verified ? (
                <div style={{'marginTop':'10px'}} onClick={resendEmailHandler}>
                  <p style={{'fontSize':'16px', 'marginBottom':'0px', 'paddingLeft':'10px', 'paddingTop':'5px', 'paddingLeft':'10px', 'paddingRight':'5px', 'border':'3px solid #0600ff', 'borderRadius':'10px', 'backgroundColor':'wheat','color':'black'}}>Please verify your email. Click here to resend the email  <i className="fas fa-share" style={{'fontSize':'16px'}}></i></p>
                </div>
              ) : !userInfo ? (
                <div style={{'marginTop':'10px'}} onClick={signUpHandler}>
                  <p style={{'fontSize':'16px', 'marginBottom':'0px', 'paddingLeft':'10px', 'paddingTop':'5px', 'paddingLeft':'10px', 'paddingRight':'5px', 'border':'3px solid #0600ff', 'borderRadius':'10px', 'backgroundColor':'wheat','color':'black'}}>Create an account / login to start writing. You'll love the experience  <i className="fas fa-sign-in-alt" style={{'fontSize':'16px'}}></i></p>
                </div>
              ) : (
                <></>
              )}
            </Col>
            <Col className='text-right' sm={12} md={6} lg={6} xl={6} style={{'width':'100%'}}>
              {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            </Col>
            <Col sm={12} md={12} lg={8} xl={8}>
            <i className='fas fa-3x fa-bullhorn' style={{'position':'fixed', 'bottom': 80, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}></i>
              {/* <div style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}> */}
              {/* <div style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}> */}
              <div style={{'paddingTop': '15px'}}>
                <div style={{'paddingBottom': '10px'}}>
                  {userInfo && userInfo.username === uid ? (
                    <>
                      <i className='far fa-edit' onClick={editHandler} style={{'marginLeft':'15px', 'fontSize':'20px'}} disabled={course.locked}></i>
                      {course.accepted ? (
                        <span>
                          <i className='fas fa-check' style={{'marginLeft':'20px', 'color':'green', 'fontSize':'20px'}}></i>
                          {/* {course.tweets && course.tweets.length > 0 ? ( */}
                          {course.tweets && course.tweets.length > 0 ? (
                            <>
                              <i className="fas fa-eye" style={{'marginLeft':'20px', 'color':'#1e9af0', 'fontSize':'12px'}} aria-hidden="true"></i>
                              <i className='fas fa-stream'  style={{'color':'#1e9af0', 'fontSize':'20px'}} onClick={showTweetHandler}></i>
                            </>
                          ) : (
                            <>
                            <i className="fab fa-twitter" style={{'marginLeft':'20px', 'color':'#1e9af0', 'fontSize':'12px'}} aria-hidden="true"></i>
                            <i className='fas fa-stream'  style={{'color':'#1e9af0', 'fontSize':'20px'}} onClick={threadCourseHandler}></i>
                            </>
                          )}
                        </span>
                      ) : (
                        <i className='far fa-newspaper' onClick={publishCourseHandler} style={{'marginLeft':'20px', 'fontSize':'20px'}}></i>
                      )
                      }
                      {/* {course.locked ? (
                        <i className='fas fa-unlock' onClick={lockHandler} style={{'marginLeft':'20px', 'fontSize':'20px','color':'red'}}></i>
                      ) : (
                        <i className='fas fa-lock' onClick={lockHandler} style={{'marginLeft':'20px', 'fontSize':'20px','color':'green'}}></i>
                      )} */}
                    </>
                  ) : (
                    <>
                      {course.likes && userInfo && course.likes.indexOf(userInfo._id) > -1 ? (
                        <i className='fas fa-heart' style={{'marginLeft':'10px', 'color':'red', 'fontSize':'20px'}} disabled></i>
                      ) : (
                        <i className='far fa-heart' style={{'marginLeft':'10px', 'color':'red', 'fontSize':'20px'}} onClick={likeCourseHandler}></i>
                      )}
                      <Badge variant="light">{course.likesc}</Badge>
                      {course.notify && userInfo && course.notify.indexOf(userInfo._id) > -1 ? (
                        <i className='fas fa-bell' style={{'marginLeft':'10px', 'color':'black', 'fontSize':'20px'}} disabled></i>
                      ) : (
                        <i className='far fa-bell'  style={{'marginLeft':'10px', 'color':'black', 'fontSize':'20px'}} onClick={notifyCourseHandler}></i>
                      )}
                      <Badge variant="light">{course.notifyc}</Badge>
                      {course && course.description ? (
                        <>
                          {/* <a className="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${course.description.substring(0, 200) + ' ...'}&url=${window.location.href}`} target="_blank"> */}
                          <a href={`https://twitter.com/intent/tweet?text=${course.description.substring(0, 200) + ' ...'}&url=${window.location.href}`} target="_blank">
                            <i className="fab fa-twitter" style={{'marginLeft':'10px', 'color':'#1e9af0', 'fontSize':'20px'}} aria-hidden="true"></i>
                          </a>
                        </>
                      ) : (
                        <></>
                      )}
                      {course.tweets && course.tweets.length > 0 ? (
                          <>
                            <i className="fas fa-eye" style={{'marginLeft':'10px', 'color':'#1e9af0', 'fontSize':'12px'}} aria-hidden="true"></i>
                            <i className='fas fa-stream'  style={{'color':'#1e9af0', 'fontSize':'20px'}} onClick={showTweetHandler}></i>
                          </>                      
                        ) : (
                          <></>
                        // <i className='fas fa-stream'  style={{'marginLeft':'10px', 'color':'black', 'fontSize':'20px'}} onClick={threadCourseHandler}></i>
                      )}
                      <i className="far fa-copy" style={{'marginLeft':'15px', 'fontSize':'20px'}} aria-hidden="true" onClick={() =>  navigator.clipboard.writeText(`${window.location.href}`)}></i>                      
                    </>
                  )}
                  {/* <i className='far fa-clone' onClick={cloneCourseHandler} style={{'marginLeft':'10px', 'color':'black', 'fontSize':'20px'}}></i> */}
                  {/* <Badge variant="light">4</Badge> */}
                  {/* <i className='fas fa-share-alt' onClick={shareCourseHandler} style={{'marginLeft':'10px', 'color':'black', 'fontSize':'20px'}}></i> */}
                </div>
                {course.name ? (
                  <>
                    <p style={{'textTransform': 'none', 'letterSpacing': '1px', 'fontSize': '18px', 'fontWeight':'700','marginBottom':'5px'}}>{course.name}<small style={{'color':'#919aa6'}}> by </small><span style={{'color':'blue', 'fontSize':'14px'}}>{course.username}</span></p>
                    <span style={{'paddingBottom': '5px', 'letterSpacing': '1px', 'fontSize': '16px', 'color':'#272522'}} >{course.description}</span>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {contents.map((content, idx) => (
                // <div key={content._id} style={{'border': 'solid 2px #1ea1f2', 'borderRadius': '10px', 'padding': '5px', 'marginTop': '5px'}}>
                <div key={content._id}>
                    <div style={{'paddingTop': '15px'}}>
                        <Content content={content} userInfo={userInfo} subscribeHandler={subscribeHandler} />
                    </div>
                    {/* {content.type === 'text' && (userInfo && content.tutor === userInfo._id || content.description.length <= 280 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1) ? ( */}
                    {/* {userInfo && content.tutor === userInfo._id || content.description.length <= 280 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1 ? ( */}
                    {userInfo && content.tutor === userInfo._id || content.coins === 0 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1 ? (
                      <div style={{ 'paddingTop': '5px', 'paddingBottom':'5px'}}>
                        <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': 'blue', 'fontSize':'14px'}}>{content.username}</span>
                          {content.likes && userInfo && content.likes.indexOf(userInfo._id) > -1 ? (
                            <i className='fas fa-heart' style={{'marginLeft':'10px', 'color':'red'}} disabled></i>
                          ) : (
                            <i className='far fa-heart' style={{'marginLeft':'10px', 'color':'red'}} onClick={() => likeContentHandler(content)}></i>
                          )}
                          <Badge variant="light">{content.likesc}</Badge>
                          {content && content.description && content.type !== 'twitter' ? (
                            <a href={`https://twitter.com/intent/tweet?text=${content.description.length > 50 ? content.description.substring(0, 200) + ' ...' : course.name}&url=${window.location.href}`} target="_blank">
                              <i className="fab fa-twitter" style={{'marginLeft':'10px', 'color':'#1e9af0'}} aria-hidden="true"></i>
                            </a>
                          ) : (
                            // <i className="fab fa-twitter" style={{'marginLeft':'10px', 'color':'#1e9af0'}} aria-hidden="true"></i>
                            <></>
                          )}
                          {!userInfo || userInfo && userInfo._id !== content.tutor ? (
                            <i className='fas fa-comment' style={{'marginLeft':'10px', 'fontSize': '20px', 'color':'green'}} onClick={() => commentHandler(idx)}></i>
                          ) : (
                            <></>
                          )}
                        {/* <i style={{'marginLeft':'10px', 'color':'black'}} className='far fa-clone' onClick={cloneContentHandler}></i> */}
                          {/* <Badge variant="light">4</Badge> */}
                        {/* <i style={{'marginLeft':'10px', 'color':'black'}} className='fas fa-share-alt' onClick={shareHandler}></i> */}
                      </div>
                    ) : (
                      <></>
                    )}
                </div>
              ))}
            </Col>
            <Col sm={12} md={12} lg={4} xl={4} style={{'marginTop':'10px'}}>
              {contents.length > 0 ? (
                <>
                  <h4 style={{'color':'#ff914d'}}>Similar Courses</h4>
                  {courses.map((course) => (
                    <Row style={{'paddingRight': '15px', 'paddingLeft':'15px'}} key={course._id}>
                      <Course course={course} />
                    </Row>
                  ))}
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
      )}
    </>
  )
}

export default LearnScreen