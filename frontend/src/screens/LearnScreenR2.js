// import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Navbar, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Iframe from 'react-iframe'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Course from '../components/Course'
import Content from '../components/Content'
import Notification from '../components/Notification'
// import Paginate from '../components/Paginate'
import { listCourseDetails, createCourse, likeCourse, notifyCourse} from '../actions/courseActions'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  listContent,
  deleteContent,
  createContent,
  acceptContent,
  subscribeContent, 
  // likeContent
} from '../actions/contentActions'
import { CONTENT_CREATE_RESET } from '../constants/contentConstants'

const LearnScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const uid = match.params.uid
  const id = match.params.id

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const courseLike = useSelector((state) => state.courseLike)
  const {
    loading: loadingLike,
    error: errorLike,
    success: successLike,
  } = courseLike

  const courseNotify = useSelector((state) => state.courseNotify)
  const {
    loading: loadingNotify,
    error: errorNotify,
    success: successNotify,
  } = courseNotify

  const contentSubscribe = useSelector((state) => state.contentSubscribe)
  const {
    loading: loadingSubscribe,
    error: errorSubscribe,
    success: successSubscribe,
  } = contentSubscribe

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contentCreate = useSelector((state) => state.contentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    content: createdContent,
  } = contentCreate

  const contentList = useSelector((state) => state.contentList)
  const { loadingContent, errorContent, contents } = contentList

  console.log('Contents', contents)

  useEffect(() => {
    dispatch({ type: CONTENT_CREATE_RESET })

    if (successCreate) {
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
    // } else if(successLike) {
    //   dispatch(listCourseDetails(id))
    // }
    } else {
      dispatch(listContent(id))
      dispatch(listCourseDetails(id))  
    }
  }, [dispatch, history, successCreate, successLike, successNotify, successSubscribe])
  
  const createCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      console.log('In create course handler dispatch', userInfo)
      dispatch(createCourse(userInfo._id))
    }    
  }  

  const editHandler = () => {
      history.push(`/${uid}/teach/${id}`)
  }  

  const likeContentHandler = (cont) => {
    console.log('In likeContentHandler', cont._id)
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      // dispatch(likeContent(course._id))
    }
  }  

  const likeCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      dispatch(likeCourse(course._id))
    }
  }  

  const notifyCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
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
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      console.log('In subscribe handler', id)
      dispatch(subscribeContent(id))
    } 
  } 
  
  return (
    <>
      {/* <Notification message='Discourse cloned successfully'></Notification> */}
      {/* <Row className='align-items-center' style={{'marginLeft':'15px'}}> */}
      <Row className='align-items-center'>
          {userInfo && userInfo.username === uid ? (
            <i className='far fa-lg fa-edit' onClick={editHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
          ) : (
            <>
              {/* <Button style={{'marginLeft':'0px', 'color': 'red', 'background': 'white'}} onClick={likeCourseHandler} disabled={course.likes && course.likes.indexOf(userInfo._id) > -1 }> */}
                {course.likes && userInfo && course.likes.indexOf(userInfo._id) > -1 ? (
                  <i className='fas fa-lg fa-heart' style={{'marginLeft':'10px', 'color':'red'}} disabled></i>
                ) : (
                  <i className='far fa-lg fa-heart' style={{'marginLeft':'10px', 'color':'red'}} onClick={likeCourseHandler}></i>
                )}
                <Badge variant="light">{course.likesc}</Badge>
              {/* </Button> */}
              {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white'}} onClick={notifyCourseHandler}>
                <i className='far fa-lg fa-bell'></i>
                <Badge variant="light">12</Badge>
              </Button> */}
                {course.notify && userInfo && course.notify.indexOf(userInfo._id) > -1 ? (
                  <i className='fas fa-lg fa-bell' style={{'marginLeft':'10px', 'color':'black'}} disabled></i>
                ) : (
                  <i className='far fa-lg fa-bell'  style={{'marginLeft':'10px', 'color':'black'}} onClick={notifyCourseHandler}></i>
                )}
                <Badge variant="light">{course.notifyc}</Badge>
          </>
          )}
          {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white'}} > */}
            <i className='far fa-lg fa-clone' onClick={cloneCourseHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
            <Badge variant="light">4</Badge>
          {/* </Button> */}
          {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white'}} > */}
            <i className='fas fa-lg fa-share-alt' onClick={shareCourseHandler} style={{'marginLeft':'10px', 'color':'black'}}></i>
          {/* </Button> */}
            {/* Buttons to be added in the list screen */}

                        {/* <Button style={{'marginLeft': '0px', 'color': 'red', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
                          <i className='fas fa-lock'></i>
                        </Button>
                        
                        <Button style={{'marginLeft': '0px', 'color': 'green', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
                          <i className='far fa-money-bill-alt'></i>
                        </Button> */}

                        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
                          <i className='fas fa-users'></i>
                        </Button> */}

            {/* Button to be added to the list screen */}

      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row >
            {/* <Button style={{'position':'fixed', 'bottom': 10, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}> */}
                  <i className='fas fa-3x fa-bullhorn' style={{'position':'fixed', 'bottom': 10, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}></i>
            {/* </Button> */}
            {/* <Col sm={12} md={8} lg={8} xl={8}> */}
              <div style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <h4 style={{'textTransform': 'none', 'letterSpacing': '1px'}}>{course.name}</h4>
                {/* <h4 style={{'letterSpacing': '1px'}}>{course.name}</h4> */}
                <span>{course.description}</span>
              </div>
              {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px'}}>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '4px'}}>by
                </span>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '2px'}}>{course.username}
                </span>
              </Row> */}
              {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <img src="https://pbs.twimg.com/media/EsgeyJMVEAA8J02?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>
              </Row> */}
              {contents.map((content) => (
                <div key={content._id}>
                    <div style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                        <Content content={content} userInfo={userInfo} subscribeHandler={subscribeHandler} />
                    </div>
                    {content.type === 'text' && (userInfo && content.tutor === userInfo._id || content.description.length <= 280 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1) ? (
                      <div style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '0px', 'paddingBottom':'0px'}}>
                        <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': 'blue', 'fontSize':'14px'}}>{content.username}</span>
                        {/* <Button style={{'marginLeft':'0px', 'color': 'red', 'background': 'white', 'padding':'5px 5px 5px 5px'}} > */}
                            <i style={{'marginLeft':'10px', 'color':'red'}} className='far fa-heart' onClick={() => likeContentHandler(content)}></i>
                            <Badge variant="light">28</Badge>
                        {/* </Button> */}
                        {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white', 'padding':'5px 5px 5px 5px'}} > */}
                        <i style={{'marginLeft':'10px', 'color':'black'}} className='far fa-clone' onClick={cloneContentHandler}></i>
                          <Badge variant="light">4</Badge>
                        {/* </Button> */}
                        {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white', 'padding':'5px 5px 5px 5px'}}> */}
                            <i style={{'marginLeft':'10px', 'color':'black'}} className='fas fa-share-alt' onClick={shareHandler}></i>
                        {/* </Button> */}
                    </div>
                    ) : (
                      <></>
                    )}
                </div>
              ))}
            {/* </Col> */}
          </Row>
      )}
    </>
  )
}

export default LearnScreen


