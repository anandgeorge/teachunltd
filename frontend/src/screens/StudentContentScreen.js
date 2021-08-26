import React, { useEffect } from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import {
  getStudentContent,
  deleteStudentContent,
  createStudentContent
} from '../actions/studentActions'
import { SCONTENT_CREATE_RESET } from '../constants/studentConstants'


const StudentContentScreen = ({ history, match }) => {
  const id = match.params.id
  const courseId = match.params.courseId

  const dispatch = useDispatch()

  const studentContent = useSelector((state) => state.studentContent)
  const { loading, error, contents } = studentContent

  const contentDelete = useSelector((state) => state.scontentDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contentDelete

  const contentCreate = useSelector((state) => state.scontentCreate)

  // console.log('Content create', contentCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    scontent: createdContent,
  } = contentCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: SCONTENT_CREATE_RESET })
    if (successCreate) {
        history.push(`/student/pdf/${createdContent._id}/edit`)
    }
    else if(userInfo) {
      dispatch(getStudentContent(courseId, id))
    } 
    else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    courseId,
    id,
    successDelete,
    successCreate,
    createdContent,    
  ])

  const addPdfHandler = () => {
    dispatch(createStudentContent(courseId, id))
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteStudentContent(id))
    }
  }

  return (
    <>
      {
        userInfo && (userInfo.isTutor || userInfo.isAdmin) ? (
          <Row className='align-items-center'>
            {/*<Col><h1>Content</h1></Col>*/}
            <Col className='text-right'>
              <Button className='my-3' onClick={addPdfHandler}>
                <i className='fas fa-plus'></i> PDF
              </Button>
            </Col>
            {/* <Col className='text-right'>
              <Button className='my-3' onClick={addUrlHandler}>
                <i className='fas fa-plus'></i> URL
              </Button>
            </Col> */}
          </Row>
        ):
        (
          <Col><h1>Content</h1></Col>    
        )
      }
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : contents.length === 0 ? (
          <Message>
            Your course is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>NAME</th>
              {/* <th>EMAIL</th> */}
              {/* <th>ADMIN</th> */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contents.map((content) => (
              <tr key={content._id}>
                {/* <td>{content._id}</td> */}
                <td>{content.name}</td>
                {userInfo.isTutor ? (
                  <td>
                    <a href={`https://teachun.ltd${content.url}`} target="_blank" rel="noopener noreferrer">
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-arrow-right'></i>
                      </Button>
                    </a>
                    <LinkContainer to={`/student/pdf/${content._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(content._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                ) : (
                  <td>
                    <a href={`https://teachun.ltd${content.url}`} target="_blank" rel="noopener noreferrer">
                      <Button variant='link' className='btn-sm'>
                        <i className='fas fa-arrow-right'></i>
                      </Button>
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default StudentContentScreen
