import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'
import {
  getStudentCourses,
} from '../actions/studentActions'
// import { STUDENT_DETAILS_REQUEST } from '../constants/studentConstants'

const CourseListScreen = ({ history, match }) => {

  const dispatch = useDispatch()

  const studentDetails = useSelector((state) => state.studentDetails)
  const { loading, error, courses } = studentDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    else {
      const id = userInfo._id
      dispatch(getStudentCourses(id))
    }
  }, [
    dispatch,
    history,
    userInfo,
  ])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Courses</h1>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
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
                    <LinkContainer to={`/tutor/student/${course._id}/${userInfo._id}`}>
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-sticky-note'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default CourseListScreen
