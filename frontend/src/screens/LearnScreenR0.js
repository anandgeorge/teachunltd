import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listCourses,
  deleteCourse,
} from '../actions/courseActions'

import {
  listContent
} from '../actions/contentActions'

const LearnScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const courseId = match.params.id

  const dispatch = useDispatch()

  const contentList = useSelector((state) => state.contentList)

  const { loading, error, contents, page, pages } = contentList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listContent(courseId))
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
  ])

  const addPdfHandler = (id) => {
  }

  const addUrlHandler = () => {
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCourse(id))
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
            <Col className='text-right'>
              <Button className='my-3' onClick={addUrlHandler}>
                <i className='fas fa-plus'></i> URL
              </Button>
            </Col>
          </Row>
        ):
        (
          <Col><h1>Content</h1></Col>    
        )
      }
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
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  {userInfo.isTutor || userInfo.isAdmin ? (
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
                    </td>
                    ) : (
                    <td>
                      <LinkContainer to={`/learn/${course._id}`}>
                        <Button variant='link' className='btn-sm'>
                          <i className='fas fa-arrow-right'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    )}
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

export default LearnScreen
