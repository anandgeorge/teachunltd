import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { createCourse } from '../actions/courseActions'
import { COURSE_UPDATE_RESET } from '../constants/courseConstants'

const TutorListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const courseCreate = useSelector((state) => state.courseCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    course: createdCourse,
  } = courseCreate

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch({ type: COURSE_UPDATE_RESET })
    if (successCreate) { 
        history.push(`/admin/course/${createdCourse._id}/edit`)
    } else if (userInfo && userInfo.isAdmin) {
        dispatch(listUsers('tutor'))
    } else {
        history.push('/login')
    }
  }, [dispatch, history, successDelete, successCreate, courseCreate, createdCourse, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  const createCourseHandler = (id) => {
    dispatch(createCourse(id))
  }  

  return (
    <>
      <h1>Tutors</h1>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                  <Button variant='light' className='btn-sm' onClick={() => createCourseHandler(user._id)}>
                    <i className='fas fa-plus'></i>
                  </Button>                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default TutorListScreen
