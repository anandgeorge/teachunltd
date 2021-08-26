import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listCourses,
  deleteCourse,
  // createCourse,
  acceptCourse
} from '../actions/courseActions'
import { COURSE_UPDATE_RESET } from '../constants/courseConstants'

const CourseListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses, page, pages } = courseList

  const courseDelete = useSelector((state) => state.courseDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = courseDelete

  const courseAccept = useSelector((state) => state.courseAccept)
  const {
    // loading: loadingAccept,
    // error: errorAccept,
    success: successAccept,
  } = courseAccept

  // const courseCreate = useSelector((state) => state.courseCreate)
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   course: createdCourse,
  // } = courseCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: COURSE_UPDATE_RESET })
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    // if (successCreate) {
    //   history.push(`/admin/course/${createdCourse._id}/edit`)
    // } else {
      dispatch(listCourses('', pageNumber, '', true))
    // }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successAccept,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCourse(id))
    }
  }

  const acceptHandler = (id) => {
    if (window.confirm('Sure you want to accept')) {
      dispatch(acceptCourse(id))
    }
  }

  // const createCourseHandler = () => {
  //   dispatch(createCourse())
  // }

  return (
    <>
      {/* <Row className='align-items-center'>
        <Col>
          <h1>Courses</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createCourseHandler}>
            <i className='fas fa-plus'></i> Create Course
          </Button>
        </Col>
      </Row> */}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {/* {loadingCreate && <Loader />} */}
      {/* {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
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
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  {/* <td>{course._id}</td> */}
                  <td>{course.name}</td>
                  {/* <td>${course.price}</td> */}
                  <td>{course.category}</td>
                  <td>{course.brand}</td>
                  <td>
                    <LinkContainer to={`/learn/${course._id}`}>
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-arrow-right'></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/admin/course/${course._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(course._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => acceptHandler(course._id)}
                      disabled={course.accepted}
                    >
                      <i className='fas fa-check'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default CourseListScreen
