import React from 'react'
import { Link } from 'react-router-dom'
// import { Card } from 'react-bootstrap'
// import Rating from './Rating'

const Course = ({ course }) => {
  course.dollarPrice = (Math.round(course.price) / 75).toFixed(2)

  return (
      <Link to={`/${course.username}/learn/${course._id}`} style={{textDecoration:'none'}}>
        {/* <span style={{'textTransform': 'none', 'letterSpacing':'1px', 'fontSize':'16px', 'color':'#ff914d'}}>{course.name.length > 30 ? course.name.substring(0, 30) + ' ...' : course.name} by {course.username}</span> */}
        {/* <span style={{'textTransform': 'none', 'letterSpacing':'1px', 'fontSize':'16px', 'color':'#ff914d'}}>{course.name.length > 50 ? course.name.substring(0, 50) + ' ...' : course.name}</span><small style={{'color':'black'}}> by </small><span style={{'color':'blue', 'fontSize':'14px'}}>{course.username}</span> */}
        <span style={{'textTransform': 'none', 'letterSpacing':'1px', 'fontSize':'16px', 'fontWeight':'bold'}}>{course.name.length > 50 ? course.name.substring(0, 50) + ' ...' : course.name}</span>
        <p style={{'letterSpacing':'0px', 'color':'#272522'}}>{course.description && course.description.length > 180 ? course.description.substring(0, 180) + ' ...' : course.description}<small style={{'color':'#919aa6'}}> by </small><span style={{'color':'blue', 'fontSize':'16px'}}>{course.username}</span></p>
      </Link>
  )
}

export default Course
