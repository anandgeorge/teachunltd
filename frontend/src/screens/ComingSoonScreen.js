import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import Loader from '../components/Loader'

const ComingSoonScreen = ({  }) => {

  const courseDetails = useSelector((state) => state.courseDetails)
  const { course } = courseDetails

  return (
    <Row >
        <Col sm={12} md={4} lg={4} xl={4}>
            {course && course.name ? (
                <Link to={`/${course.username}/teach/${course._id}`} className='btn btn-light my-3'>
                    Go Back
                </Link>
            ) : (
                <Link to={'/'} className='btn btn-light my-3'>
                    Go Back
                </Link>
            )}
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>
            <div className="App-header " style={{'minHeight': '100px'}}>
                <i style={{'color':'#ff914d'}}className="fas fa-3x fa-hourglass-start"></i>
            </div>
        </Col>
        <Col sm={12} md={4} lg={4} xl={4}>

        </Col>
    </Row>

  )
}

export default ComingSoonScreen