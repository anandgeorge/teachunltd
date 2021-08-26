import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Toast } from 'react-bootstrap'
// import Rating from './Rating'


const Notification = ({ message, show }) => {

  const [tmessage, setMessage] = useState(message);
  const [tshow, setShow] = useState(show);
  const toggleShow = () => setShow(!tshow);

  useEffect(() => {
    setMessage(message);
  }, [message]);  

  return (
    // <Toast show={show} onClose={toggleShow} delay={3000} autohide>
    <Toast show={tshow} onClose={toggleShow} style={{'position':'fixed', 'top': 60, 'right': 8, 'zIndex':2, 'width': '300px', 'backgroundColor': 'rgb(255 255 255)'}} >
    <Toast.Header>
        <img src="/logo-teach.png" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Teach Unltd</strong>
        <small>11 mins ago</small>
    </Toast.Header>
    <Toast.Body>{tmessage}</Toast.Body>
    </Toast>
  )
}

export default Notification
