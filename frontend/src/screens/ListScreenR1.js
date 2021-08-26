import React, { useEffect } from 'react'
import { LinkContainer} from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {
  listContent,
  createContent,
  deleteContent
} from '../actions/contentActions'

import { COURSE_CREATE_RESET } from '../constants/courseConstants'
import { SchemaType } from 'mongoose'

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

  const createContentHandler = (type) => {
    dispatch(createContent(type))
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteContent(id))
    }
  }

  return (
    <>
      {
        userInfo && (userInfo.isTutor || userInfo.isAdmin) ? (
          <Row className='align-items-center'>
            {/*<Col><h1>Content</h1></Col>*/}
            <Col className='text-right'>
              <Button className='my-3' onClick={createContentHandler('pdf')}>
                <i className='fas fa-plus'></i> Pdf
              </Button>
            </Col>
            <Col className='text-right'>
              <Button className='my-3' onClick={createContentHandler('link')}>
                <i className='fas fa-plus'></i> Link
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
      ) : contents.length === 0 ? (
          <Message>
            Your course is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : userInfo.isTutor ? (
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
                  {contents.map((content) => (
                    <tr key={content._id}>
                      {/* <td>{course._id}</td> */}
                      <td>{content.name}</td>
                      {/* <td>${course.price}</td> */}
                      {/* <td>{content.category}</td> */}
                      {/* <td>{course.brand}</td> */}
                      <td>
                        <LinkContainer to={`/content/${content.url}/${content.course}`}>
                          <Button variant='link' className='btn-sm'>
                            <i className='fas fa-arrow-right'></i>
                          </Button>
                        </LinkContainer>
                        <LinkContainer to={`/admin/course/${content._id}/edit`}>
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
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate pages={pages} page={page} isAdmin={true} />
            </>
          ) : (
          <h1>Nothing to render</h1>
          )
        }
    </>
  )
}

export default LearnScreen
