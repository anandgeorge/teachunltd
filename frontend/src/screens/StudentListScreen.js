import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStudents } from '../actions/studentActions'


const StudentListScreen = ({ history, match }) => {
  const courseId = match.params.id
  const dispatch = useDispatch()

  const studentList = useSelector((state) => state.studentList)
  const { loading, error, students } = studentList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isTutor) {
      dispatch(listStudents(courseId))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo, courseId])

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>NAME</th>
              <th>EMAIL</th>
              {/* <th>ADMIN</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                {/* <td>{student._id}</td> */}
                <td>{student.name}</td>
                <td>
                  <a href={`mailto:${student.email}`}>{student.email}</a>
                </td>
                {/* <td>
                  {student.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td> */}
                <td>
                  <LinkContainer to={`/tutor/student/${courseId}/${student._id}`}>
                    <Button variant='link' className='btn-sm'>
                      <i className='fas fa-arrow-right'></i>
                    </Button>
                  </LinkContainer>
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default StudentListScreen
