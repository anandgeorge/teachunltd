import React, {  useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Button, Badge } from 'react-bootstrap'
// import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  joinClass,
} from '../actions/contentActions'

const JoinScreen = ({ history, match }) => {
  const contentId = match.params.id
  const courseId = match.params.courseId
  const dispatch = useDispatch()

  const joinc = useSelector((state) => state.joinc)
  const { loading, error, join } = joinc

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(joinClass(contentId, courseId))
    }
  }, [dispatch, userInfo, contentId, courseId, history])

  const joinClassHandler = () => {
    // const openClass = window.open(join.url, '_blank');
    history.push(`/learn/${courseId}`)
  }

  return (
    <> 
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta />
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h5>{join.name}</h5>
                  {join.notRunning ? (
                      <Badge variant="secondary">Pending</Badge>
                    ) : (
                      <Badge variant="secondary">Live</Badge>
                    )
                  }
                  
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              {userInfo && userInfo.isTutor && join.notRunning ? (
                  <Button variant='primary' className='btn-block' type='button' onClick={joinClassHandler}>
                    START THE CLASS
                  </Button>
                ) : userInfo && userInfo.isTutor ? (
                  <Button variant='primary' className='btn-block' type='button' onClick={joinClassHandler}>
                    JOIN THE CLASS
                  </Button>
                ): (
                  <Button variant='primary' className='btn-block' type='button' onClick={joinClassHandler} disabled = {join.notRunning}>
                    JOIN THE CLASS
                  </Button>
                )
              }
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default JoinScreen
