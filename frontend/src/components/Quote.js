import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Course = ({ course }) => {
  course.dollarPrice = (Math.round(course.price) / 75).toFixed(2)

  return (
    // <Card className='my-3 p-3 rounded'>
    // <Card style={{'border': '0px'}}>
    // <Link to={`/course/${course.url}/${course._id}`}>
    <Link to={`/learn/${course._id}`}>
      {/* <Card> */}
        {/* <Card.Header as='strong' style={{'background': 'linear-gradient(45deg, orange, transparent)'}}>{course.name.substring(0, 28)}</Card.Header> */}
        {/* <Card.Header as='strong' style={{'background': 'linear-gradient(45deg, orange, transparent)'}}>{course.name.substring(0, 28)} ...</Card.Header> */}
        <h5 style={{'textTransform': 'none', 'letterSpacing': '1px'}}>{course.name.substring(0, 30)}...</h5>
        {/* <Card.Header as='strong' style={{'background': '#00acee'}}>{course.name.substring(0, 25)} ...</Card.Header> */}
        
        {/* <Card.Body> */}
          {/* <Link to={`/course/${course.url}/${course._id}`}>
            <Card.Title as='div'>
              <strong>{course.name}</strong>
            </Card.Title>
          </Link> */}

          
            {/* <Card.Text as='p'> */}
              <p style={{'letterSpacing':'0px'}}>{course.description.substring(0, 140)}</p>
            {/* </Card.Text> */}
          {/* </Link> */}
          {/* <Card.Text as='h5'>₹{course.price} (${course.dollarPrice})</Card.Text> */}
          {/* <Button variant="primary">Buy Now</Button> */}
        {/* </Card.Body> */}
      {/* </Card> */}
    </Link>
  )
}

export default Course
