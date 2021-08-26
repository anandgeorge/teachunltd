import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listCourseDetails,
  createCourseReview,
} from '../actions/courseActions'
import { 
  listMyOrders
 } from '../actions/orderActions';
import { COURSE_CREATE_REVIEW_RESET } from '../constants/courseConstants'

const CourseScreen = ({ history, match }) => {
  // const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  // console.log('Location', location);

  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy);
  var orders = [];
  var learn = false;

  if(orderListMy && orderListMy.orders && orderListMy.orders.length > 0) {
    orders = orderListMy.orders
    // console.log('Orders', orders);
    orders.map((order) => {
      order.orderItems.map((item) => {
        // console.log('Order map', order.isPaid, item.course, course._id, course.price);
        if(course.price === 0 || (order.isPaid && item.course === course._id)) {
          learn = true;
        }
        return null;
      })
      return null;
    })
    // console.log('Learn', learn);
  }


  const courseReviewCreate = useSelector((state) => state.courseReviewCreate)
  const {
    success: successCourseReview,
    error: errorCourseReview,
  } = courseReviewCreate

  useEffect(() => {
    if (successCourseReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: COURSE_CREATE_REVIEW_RESET })
    }
    dispatch(listCourseDetails(match.params.id))
    dispatch(listMyOrders())
  }, [dispatch, match, successCourseReview])

  const addToCartHandler = () => {
    if(learn) {
      history.push(`/learn/${match.params.id}`)
    }
    else {
      // history.push(`/cart/${match.params.id}?qty=${qty}`)
      history.push(`/cart/${match.params.id}`)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCourseReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta/>
          <Row>
            <Col md={6}>
              {course && course.image ? (
                <Image src={`https://teachun.ltd${course.image}`} alt={course.name} fluid />
                ):(
                  <Loader />
                )
              }
              {/* <ListGroup variant='flush'>
                <ListGroup.Item>
                  Description: {course.description}
                </ListGroup.Item>
              </ListGroup> */}
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{course.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={course.rating}
                    text={`${course.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ₹{course.price} (${(Math.round(course.price) / 75).toFixed(2)})</ListGroup.Item>
                {/* <ListGroup.Item>
                  Description: {course.description}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
              {!learn ? (
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{course.price} (${(Math.round(course.price) / 75).toFixed(2)})</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {course.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )} */}

                  <ListGroup.Item>
                      <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={course.countInStock === 0 || (userInfo && userInfo._id && course.tutor === userInfo._id)}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              ) :
              (
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={course.countInStock === 0}
                    >
                      Go To The Course
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}
              </Card>
            </Col>
          </Row>
          <Row>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                Description: {course.description}
              </ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {course.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {course.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorCourseReview && (
                    <Message variant='danger'>{errorCourseReview}</Message>
                  )}
                  {userInfo && userInfo._id && course.tutor !== userInfo._id ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : userInfo && userInfo._id && course.tutor === userInfo._id ? (
                    <Message>
                      You cannot write review your own course
                    </Message>
                  ): (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>                    
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default CourseScreen
