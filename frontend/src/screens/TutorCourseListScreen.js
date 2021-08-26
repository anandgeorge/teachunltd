import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listTutorCourses,
} from '../actions/tcourseActions'
import {
  createCourse, deleteCourse
} from '../actions/courseActions'

import { COURSE_CREATE_RESET } from '../constants/courseConstants'

const TutorCourseListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const tcourseList = useSelector((state) => state.tcourseList)
  const { loading, error, tcourses, page, pages } = tcourseList

  const courseDelete = useSelector((state) => state.courseDelete)
  const {
    // loading: loadingDelete,
    // error: errorDelete,
    success: successDelete,
  } = courseDelete

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    // loading: loadingCreate,
    // error: errorCreate,
    success: successCreate,
    course: createdCourse,
  } = courseCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: COURSE_CREATE_RESET })
    if (!userInfo || !userInfo.isTutor) {
      history.push('/login')
    }
  
    if (successCreate) {
      history.push(`/tutor/course/${createdCourse._id}/edit`)
    } else {
      dispatch(listTutorCourses('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
    successCreate,
    successDelete,
    createdCourse
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCourse(id))
    }
  }

  const createCourseHandler = () => {
    dispatch(createCourse(userInfo._id))
  }  

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Courses</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCourseHandler}>
            {/* <i className='fas fa-plus'></i> Create Course */}
            <i className='fas fa-plus'></i>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>NAME</th>
                {/* <th>PRICE</th> */}
                {/* <th>CATEGORY</th> */}
                {/* <th>BRAND</th> */}
                <th><center>ACTIONS</center></th>
              </tr>
            </thead>
            <tbody>
              {tcourses.map((course) => (
                <tr key={course._id}>
                  {/* <td>{course._id}</td> */}
                  <td>{course.name}</td>
                  {/* <td>${course.price}</td> */}
                  {/* <td>{course.category}</td> */}
                  {/* <td>{course.brand}</td> */}
                  <td>
                    <LinkContainer to={`/learn/${course._id}`}>
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-arrow-right'></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/tutor/students/${course._id}`}>
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-users'></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/tutor/course/${course._id}/edit`}>
                      <Button 
                        variant='light' 
                        className='btn-sm'
                        disabled={course.accepted}                        
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(course._id)}
                      disabled={course.accepted}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isTutor={true} />
        </>
      )}
    </>
  )
}

export default TutorCourseListScreen
