import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm={12} md={12} lg={12} xl={12} style={{'width':'100%'}} className='text-center py-3'><span style={{'fontSize':'16px'}}>&copy;Teach Unlimited</span><br></br>
          {/* <Col sm={12} md={6} lg={6} xl={6} style={{'width':'100%'}}> */}
            <a href="https://app.teachun.ltd/teachunltd/learn/605c7c73afe29e3ac19a7f95" style={{'textDecoration':'underline'}}>Publishers Agreement</a>
            &nbsp;&nbsp;
            <a href="https://app.teachun.ltd/teachunltd/learn/605c87d6afe29e3ac19a7fa0" style={{'textDecoration':'underline'}}>Terms of Service</a>
            &nbsp;&nbsp;
            <a href="https://app.teachun.ltd/teachunltd/learn/605c95b6afe29e3ac19a7fb1" style={{'textDecoration':'underline'}}>Privacy Policy</a>
            &nbsp;&nbsp;
            <a href="https://app.teachun.ltd/teachunltd/learn/605c9cc9afe29e3ac19a7fbb" style={{'textDecoration':'underline'}}>Content Guidelines</a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
