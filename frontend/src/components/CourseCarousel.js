import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopCourses } from '../actions/courseActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const courseTopRated = useSelector((state) => state.courseTopRated)
  const { loading, error, courses } = courseTopRated

  useEffect(() => {
    dispatch(listTopCourses())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' >
      {courses.map((course) => (
        <Carousel.Item key={course._id}>
          <Link to={`/course/${course.url}/${course._id}`}>
            <Image src={`https://gurukul.best${course.image}`} alt={course.name} fluid />
            {/* <Carousel.Caption className='carousel-caption'>
              <h6><small>{product.name.slice(0,25) + '...'} (₹{product.price}) (${(Math.round(product.price) / 75).toFixed(2)})</small></h6>
            </Carousel.Caption> */}
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
