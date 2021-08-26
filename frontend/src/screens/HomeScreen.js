import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button} from 'react-bootstrap'
import Course from '../components/Course'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
// import CourseCarousel from '../components/CourseCarousel'
import Meta from '../components/Meta'
import { listCourses, listMyCourses } from '../actions/courseActions'
import SearchBox from '../components/SearchBox'

import {
  createCourse, 
  // deleteCourse
} from '../actions/courseActions'

import {
  resendEmail
} from '../actions/userActions'

import { COURSE_CREATE_RESET, COURSE_DETAILS_RESET, MYCOURSE_LIST_RESET } from '../constants/courseConstants'
import { CONTENT_LIST_RESET } from '../constants/contentConstants'


const HomeScreen = ({ location, history, match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const id = match.params.id

  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses, page, pages } = courseList

  const mycourseList = useSelector((state) => state.mycourseList)
  const { myloading, myerror, mycourses, mypage, mypages } = mycourseList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin  

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    success: successCreate,
    course: createdCourse,
  } = courseCreate

  useEffect(() => {
    dispatch({ type: COURSE_CREATE_RESET })  
    dispatch({ type: COURSE_DETAILS_RESET })  
    dispatch({ type: CONTENT_LIST_RESET }) 
    if (successCreate) {
      // console.log('In successCreate', createdCourse);
      history.push(`/tutor/course/${createdCourse._id}/edit`)
    } else {
      dispatch(listCourses(keyword, pageNumber, id))
      if(userInfo) {
        dispatch(listMyCourses(keyword, pageNumber, id))
      }
      else {
        dispatch({ type: MYCOURSE_LIST_RESET }) 
      }
    }
  }, [dispatch, history, successCreate, keyword, pageNumber, id, createdCourse])

  const createCourseHandler = () => {
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    } else {
      // console.log('In create course handler dispatch', userInfo)
      dispatch(createCourse(userInfo._id))
    }    
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
      <Meta />
      {!keyword && !id ? (
        // <CourseCarousel />
        <></>
      ) : keyword ? (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      ) : (
        <></>
      )}
      {/* {!keyword && !id ? (
        <h3>Latest Courses</h3>
      ) : (
        <h3>Courses</h3>      
      )} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : !keyword && !id ? (
        <>
          {/* <Button style={{'position':'fixed', 'bottom': 10, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}> */}
            <i className='fas fa-3x fa-bullhorn' style={{'position':'fixed', 'bottom': 80, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createCourseHandler}></i>
          {/* </Button> */}
          {/* #f7941a The Bitcoin colour code  */}
          <Row className='align-items-center'>
            {/* <Col className='text-right' sm={12} md={8} lg={8} xl={8} style={{'width':'100%', 'paddingRight': '5px', 'paddingLeft':'10px'}}> */}
            {/* <Col className='text-right' sm={12} md={6} lg={6} xl={6} style={{'width':'100%'}}>
              <Route render={({ history }) => <SearchBox history={history} />} />
            </Col> */}
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
            {/* <Col sm={2} md={2} lg={2} xl={2} style={{'width':'20%', 'paddingRight': '5px', 'paddingLeft':'0px'}}>
              <Button onClick={createCourseHandler} style={{'color':'#ff914d', 'background':'#ffffff', 'padding': '10px 5px 5px 15px'}}>
                <i className='fas fa-2x fa-bullhorn'></i>
              </Button>
            </Col> */}
          </Row>
          {/* <h3 style={{'background': 'linear-gradient(45deg, #16f716, transparent)', 'marginLeft':'-10px', 'letterSpacing': '0px'}}>&nbsp;&nbsp; Latest DisCourses</h3> */}
          {mycourses && mycourses.length > 0 ? (
            <>
              <h4 style={{'marginLeft':'-15px', 'letterSpacing': '0px', 'marginTop':'10px', 'color':'#ff914d'}}>&nbsp;&nbsp; My DisCourses</h4>
              <Row>
                {mycourses.map((course) => (
                  // <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '5px', 'paddingLeft':'5px', 'border':'0px'}}>
                  <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '15px', 'paddingLeft':'15px'}}>
                    <Course course={course} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <></>
          )}

          <h4 style={{'marginLeft':'-15px', 'letterSpacing': '0px', 'color':'#ff914d', 'marginTop': '10px'}}>&nbsp;&nbsp; Latest DisCourses</h4>
          <Row>
            {courses.map((course) => (
              // <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '5px', 'paddingLeft':'5px', 'border':'0px'}}>
              <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '15px', 'paddingLeft':'15px'}}>
                <Course course={course} />
              </Col>
            ))}
          </Row>
          {/* <h3 style={{'background': 'linear-gradient(45deg, #f8e924, transparent)', 'marginLeft':'-10px', 'letterSpacing': '0px'}}>&nbsp;&nbsp; Trending DisCourses</h3> */}
          <h4 style={{'marginLeft':'-15px', 'letterSpacing': '0px', 'color':'#ff914d'}}>&nbsp;&nbsp; Trending DisCourses</h4>
          <Row>
            {courses.map((course) => (
              <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '15px', 'paddingLeft':'15px', 'border':'0px'}}>
                <Course course={course} />
              </Col>
            ))}
          </Row>
          {/* <h3 style={{'background': 'linear-gradient(45deg, #2196f3, transparent)', 'marginLeft':'-10px', 'letterSpacing': '0px'}}>&nbsp;&nbsp; Popular DisCourses</h3> */}
          <h4 style={{'marginLeft':'-15px', 'letterSpacing': '0px', 'color':'#ff914d'}}>&nbsp;&nbsp; Popular DisCourses</h4>
          <Row>
            {courses.map((course) => (
              <Col key={course._id} sm={12} md={6} lg={4} xl={3} style={{'paddingRight': '15px', 'paddingLeft':'15px', 'border':'0px'}}>
                <Course course={course} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h4 style={{'color':'#ff914d'}}>Courses</h4>
          <Row>
            {courses.map((course) => (
              <Col key={course._id} sm={12} md={8} lg={4} xl={3}>
                <Course course={course} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            id={id ? id : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
