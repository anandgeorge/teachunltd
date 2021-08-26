import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
// import { Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'
import {
  // listContent,
  deleteContent,
  // createContent,
  acceptContent,
  listPendingContent
} from '../actions/contentActions'
import { CONTENT_CREATE_RESET } from '../constants/contentConstants'

const PendingListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const courseId = match.params.id

  const dispatch = useDispatch()

  const pendingList = useSelector((state) => state.pendingList)
  const { loading, error, pendings } = pendingList

  const contentDelete = useSelector((state) => state.contentDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contentDelete

  const contentAccept = useSelector((state) => state.contentAccept)
  const {
    loading: loadingAccept,
    error: errorAccept,
    success: successAccept,
  } = contentAccept

  const contentCreate = useSelector((state) => state.contentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    content: createdContent,
  } = contentCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CONTENT_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listPendingContent())
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successAccept,
    createdContent,
    pageNumber,
    courseId
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Sure you want to delete')) {
      dispatch(deleteContent(id))
    }
  }

  const acceptHandler = (id) => {
    if (window.confirm('Sure you want to accept')) {
      dispatch(acceptContent(id))
    }
  }

  // const createPdfHandler = () => {
  //   dispatch(createContent('pdf', courseId))
  // }

  // const createLinkHandler = () => {
  //   dispatch(createContent('link', courseId))
  // }

  // const createClassHandler = () => {
  //   dispatch(createContent('class', courseId))
  // }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Content</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingAccept && <Loader />}
      {errorAccept && <Message variant='danger'>{errorAccept}</Message>}
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
              {pendings.map((course) => (
                <tr key={course._id}>
                  {/* <td>{course._id}</td> */}
                  <td>{course.name}</td>
                  {/* <td>${course.price}</td> */}
                  {/* <td>{course.category}</td> */}
                  {/* <td>{course.brand}</td> */}
                  {userInfo.isTutor || userInfo.isAdmin ? (
                    <td>
                    {course.type === 'pdf' ? (
                      <a href={`https://gurukul.best${course.url}`} target="_blank" rel="noopener noreferrer">
                        <Button variant='link' className='btn-sm'>
                          <i className='fas fa-file'></i>
                        </Button>
                      </a>
                      ) : course.type === 'link' ? (
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        <Button variant='link' className='btn-sm'>
                          <i className='fas fa-film'></i>
                        </Button>
                      </a>
                      ) : (
                        <LinkContainer to={`/join/${course._id}/${courseId}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-video'></i>
                          </Button>
                        </LinkContainer>
                      )
                    }
                    {course.type === 'pdf' ? (
                      <LinkContainer to={`/tutor/pdf/${course._id}/edit`}>
                        <Button variant='light' className='btn-sm' disabled={course.accepted}>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    ) : course.type === 'link' ? (
                      <LinkContainer to={`/tutor/link/${course._id}/edit`}>
                        <Button variant='light' className='btn-sm' disabled={course.accepted}>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>                      
                    ) : (
                      <LinkContainer to={`/tutor/class/${course._id}/edit`}>
                        <Button variant='light' className='btn-sm'  disabled={course.accepted}>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>  
                    )
                    }
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(course._id)}
                      disabled={(userInfo.isTutor && course.accepted) || course.type === 'class'}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                    {course.accepted ? (
                      <Button
                        variant='success'
                        className='btn-sm'
                        onClick={() => acceptHandler(course._id)}
                        disabled={course.accepted}
                      >
                        <i className='fas fa-check'></i>
                      </Button>
                      ) : userInfo.isAdmin ? (
                        <Button
                          variant='success'
                          className='btn-sm'
                          onClick={() => acceptHandler(course._id)}
                          disabled={course.type === 'class'}
                        >
                          <i className='fas fa-check'></i>
                        </Button>
                      ) :(
                        <> </>
                      )
                      }
                  </td>
                  ) : (
                    <td>
                    {course.type === 'pdf' ? (
                      <a href={`https://gurukul.best${course.url}`} target="_blank" rel="noopener noreferrer">
                        <Button variant='link' className='btn-sm'>
                          <i className='fas fa-file'></i>
                        </Button>
                      </a>
                      ) : course.type === 'link' ? (
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        <Button variant='link' className='btn-sm'>
                          <i className='fas fa-film'></i>
                        </Button>
                      </a>
                      ) : (
                        <LinkContainer to={`/join/${course._id}/${courseId}`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-video'></i>
                          </Button>
                        </LinkContainer>
                      )
                    }
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default PendingListScreen
