// import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Navbar, Badge, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Iframe from 'react-iframe'

import Message from '../components/Message'
import Loader from '../components/Loader'
import Course from '../components/Course'
import Content from '../components/Content'
// import Paginate from '../components/Paginate'
import { listCourseDetails, deleteCourseContent} from '../actions/courseActions'
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  listContent,
  deleteContent,
  createContent,
  acceptContent,
  subscribeContent, 
  payContent,
  upContent,
  downContent
} from '../actions/contentActions'

import { CONTENT_CREATE_RESET, CONTENT_LIST_SUCCESS, CONTENT_PAY_RESET, CONTENT_UP_RESET, CONTENT_DOWN_RESET } from '../constants/contentConstants'
import { CCONTENT_DELETE_RESET, COURSE_DETAILS_SUCCESS  } from '../constants/courseConstants'
import { logout } from '../actions/userActions'


const TeachScreen = ({ location, history, match }) => {
  const dispatch = useDispatch()
  const uid = match.params.uid
  const id = match.params.id

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  // console.log('Course', course);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contentCreate = useSelector((state) => state.contentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    content: createdContent,
  } = contentCreate

  const contentDelete = useSelector((state) => state.ccontentDelete)
  const {
    success: successDelete,
    ids: ids
  } = contentDelete

  const contentPay = useSelector((state) => state.contentPay)
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
    coins: coins,
    id: payid,
    accepted: accepted
  } = contentPay

  // console.log('In contentPay', contentPay)

  const contentUp = useSelector((state) => state.contentUp)
  const {
    loading: loadingUp,
    error: errorUp,
    success: successUp,
    idx: idx,
    contentsArr: contentsArr
  } = contentUp

  // console.log('In contentUp', contentUp)

  const contentDown = useSelector((state) => state.contentDown)
  const {
    loading: loadingDown,
    error: errorDown,
    success: successDown,
    idx: idxd,
    contentsArr: contentsArrDown
  } = contentDown

  // console.log('In contentDown', contentDown)

  const [show, setShow] = useState(false); 
  const [delcontent, setDelContent] = useState({}); 

  const contentList = useSelector((state) => state.contentList)
  const { loadingContent, errorContent, contents } = contentList

  // console.log('Contents', contents)

  useEffect(() => {
    dispatch({ type: CONTENT_CREATE_RESET })
    if (!userInfo) {
      history.push('/login')
    }
    if(userInfo && course && userInfo._id !== course.tutor) {
      dispatch(logout())
    }
    if (successCreate) {
      contents.push(createdContent)
      // console.log('New content in TeachScreen', contents)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:contents},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = false
      newCourse.changed = true
      // console.log('Course in newliks', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })

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
    } else if(successDelete) {
      // console.log('In success delete', ids);
      const conid = ids.id
      const newContent = [];
      contents.map(function(content) {
        if(content._id !== conid) {
          newContent.push(content);
        }
      })
      // console.log('Contents in successDelete', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = false
      newCourse.changed = true
      // console.log('Course in newliks', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: CCONTENT_DELETE_RESET })
    } else if(successPay) {
      // console.log('In success pay', payid, coins, accepted);
      const newContent = contents.map(function(content) {
        if(content._id === payid) {
          content.coins = coins;
          content.accepted = accepted
        }
        return content;
      })
      // console.log('Contents in successPay', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = false
      newCourse.changed = true
      // console.log('Course in newpay', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: CONTENT_PAY_RESET })


    } else if(successUp) {
      // console.log('In success up', idx, contentsArr);
      const newContent = contents.sort((a,b) => contentsArr.indexOf(a._id) - contentsArr.indexOf(b._id))
      // console.log('Contents in successUp', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = false
      newCourse.changed = true
      // console.log('Course in successup', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: CONTENT_UP_RESET })
    } else if(successDown) {
      // console.log('In success down', idxd, contentsArrDown);
      const newContent = contents.sort((a,b) => contentsArrDown.indexOf(a._id) - contentsArrDown.indexOf(b._id))
      // console.log('Contents in successDown', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      const newCourse = Object.assign({}, course);
      newCourse.accepted = false
      newCourse.changed = true
      // console.log('Course in successdown', newCourse, course)
      dispatch({
        type: COURSE_DETAILS_SUCCESS,
        payload: newCourse,
      })
      dispatch({ type: CONTENT_DOWN_RESET })
    } else if(!course.name || course._id !== id) {
      dispatch(listContent(id))
      dispatch(listCourseDetails(id))  
    }
  }, [dispatch, history, successCreate, successDelete, successPay, successUp, successDown])
  
  const createPdfHandler = () => {
    dispatch(createContent('pdf', id))
  }

  const createImageHandler = () => {
    dispatch(createContent('image', id))
  }

  const createLinkHandler = () => {
    dispatch(createContent('link', id))
  }

  const createTextHandler = () => {
    dispatch(createContent('text', id))
  }

  const createAudioHandler = () => {
    history.push('/comingsoon')
  }

  const createVideoHandler = () => {
    history.push('/comingsoon')
  }  

  const fromLibraryHandler = () => {
    history.push('/comingsoon')
  }  
  
  const previewHandler = () => {
    history.push(`/${uid}/learn/${id}`)
  }    

  // const subscribeHandler = (id) => {
  // }

  const subscribeHandler = (id) => {
    // console.log('In subscribeHandler in LearnScreen', id );
    if (!userInfo || !userInfo.isTutor) {
      history.push(`/login?redirect=${location.pathname}`)
    } else {
      // console.log('In subscribe handler', id)
      dispatch(subscribeContent(id))
    } 
  } 


  const deleteHandler = (id) => {
    // console.log('In deleteHandler', id, course._id)
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      dispatch(deleteCourseContent(id, course._id))
    } 
  }

  const handleClose = () => setShow(false); 
  const handleShow = (content) => {
    setShow(true);
    setDelContent(content);
  }

  const payHandler = (content) => {
    // console.log('In toggle paid', content);
    dispatch(payContent(content._id))
  }

  const handleDelete = () => {
      deleteHandler(delcontent._id);
      setDelContent({});
      handleClose()
  }

  const upHandler = (idx) => {
    // console.log('In uphandler', idx)
    dispatch(upContent(course._id, idx))
  }

  const downHandler = (idx) => {
    // console.log('In downhandler', idx)
    dispatch(downContent(course._id, idx))
  }

  return (
    <>
      {/* <Row className='align-items-center' style={{'marginLeft':'0px'}}> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createTextHandler}> */}
          {/* <i className='fas fa-edit' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createTextHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}}  onClick={createPdfHandler}> */}
          {/* <i className='fas fa-file-pdf' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createPdfHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createAudioHandler}> */}
          {/* <i className='fas fa-volume-up' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createAudioHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createImageHandler}> */}
          {/* <i className='fas fa-file-image' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createImageHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}> */}
          {/* <i className='fas fa-link' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createLinkHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': '#2d8cff', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createVideoHandler}> */}
          {/* <i className='fas fa-video' style={{'marginLeft':'10px', 'color':'#2d8cff', 'fontSize':'20px'}} onClick={createVideoHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={fromLibraryHandler}> */}
          {/* <i className='fas fa-folder-open' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={fromLibraryHandler}></i> */}
        {/* </Button> */}
        {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={previewHandler}> */}
          {/* <i className='fas fa-eye' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={previewHandler}></i> */}
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

      {/* </Row> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row >
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true} > 
              <Modal.Header closeButton><Modal.Title>Confirm</Modal.Title></Modal.Header> 
              <Modal.Body>Do you want to remove "{delcontent.name}"?</Modal.Body> 
              <Modal.Footer>
                  <Button variant="primary" onClick={handleClose}>Close</Button>
                  <Button variant="primary" onClick={handleDelete}>Ok</Button>
              </Modal.Footer>
            </Modal>
            <Col sm={12} md={8} lg={8} xl={8}>
              <div style={{'paddingTop': '15px'}}>
                <div style={{'paddingBottom': '10px'}}>
                  <i className='far fa-file-alt' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createTextHandler}></i>
                    <i className='far fa-file-pdf' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createPdfHandler}></i>
                    <i className='fas fa-volume-up' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createAudioHandler}></i>
                    <i className='far fa-file-image' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createImageHandler}></i>
                    <i className='fas fa-link' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={createLinkHandler}></i>
                    <i className='fas fa-video' style={{'marginLeft':'10px', 'color':'#2d8cff', 'fontSize':'20px'}} onClick={createVideoHandler}></i>
                    <i className='far fa-folder-open' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={fromLibraryHandler}></i>
                    <i className='far fa-eye' style={{'marginLeft':'10px', 'fontSize':'20px'}} onClick={previewHandler}></i>
                </div>
                <h4 style={{'textTransform': 'none', 'letterSpacing': '1px'}}>{course.name}</h4>
                <span style={{'paddingBottom': '5px'}}>{course.description}</span>
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
              {contents.map((content, idx) => (
                <div key={content._id}>
                  {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                        <Content content={content} userInfo={userInfo} />
                  </Row> */}
                  <div style={{'paddingTop': '15px'}}>
                      <Content content={content} userInfo={userInfo} subscribeHandler={subscribeHandler} />
                  </div>
                  {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '5px', 'paddingBottom':'5px'}}> */}
                  <div style={{ 'paddingTop': '5px', 'paddingBottom':'5px'}}>
                  <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': 'blue', 'fontSize':'14px'}}>{content.username}
                        <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash' onClick={() => handleShow(content)}></i>
                        {idx > 0 ? (
                          <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up' onClick={() => upHandler(idx)}></i>
                        ) : (
                          <></>
                        )}
                        {idx < contents.length -1 ? (
                          <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down' onClick={() => downHandler(idx)}></i>
                        ) : (
                          <></>
                        )}
                        {content.accepted ? (
                          <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                        ) : (
                          <i style={{'color': 'red', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                        )}
                        {content.coins > 0 ? (
                          <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-coins' onClick={() => payHandler(content)}></i>
                        ) : (
                          <i style={{'color': '#bebeca', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-coins' onClick={() => payHandler(content)}></i>
                        )}
                    </span>
                  </div>
                  {/* </Row> */}
                </div>
              ))}
            </Col>
          </Row>
      )}
    </>
  )
}

export default TeachScreen
