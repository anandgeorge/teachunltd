// import { LinkContainer } from 'react-router-bootstrap'
import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Table, Button, Row, Col, Navbar, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Course from '../components/Course'
// import Paginate from '../components/Paginate'
// import { listCourses } from '../actions/courseActions'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Iframe from 'react-iframe'

import {
  listContent,
  deleteContent,
  createContent,
  acceptContent
} from '../actions/contentActions'
import { listCourses } from '../actions/courseActions'
import { CONTENT_CREATE_RESET } from '../constants/contentConstants'

const TeachScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const uid = match.params.uid
  const id = match.params.id

  const courseList = useSelector((state) => state.courseList)
  const { loading, error, courses } = courseList

  // const contentList = useSelector((state) => state.contentList)
  // const { loading, error, contents } = contentList

  useEffect(() => {
    dispatch(listCourses())
  }, [dispatch])
  
  const createPdfHandler = () => {
    dispatch(createContent('pdf', id))
  }

  const createLinkHandler = () => {
    dispatch(createContent('link', id))
  }

  const previewHandler = () => {
    history.push(`/${uid}/learn/${id}`)
  }    
  
  return (
    <>
      {true ? (
        // <Navbar bg='light' variant='light' expand='lg' fixed="bottom" collapseOnSelect style={{'padding': '0.2rem'}}>
        <Row className='align-items-center' style={{'marginLeft':'0px'}}>
          {/* <Col className='text-right'> */}
          {/* </Col> */}
          {/* <Col className='text-right'> */}
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-edit'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}}  onClick={createPdfHandler}>
              {/* <i className='fas fa-plus'></i>  */}
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-file-pdf'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-volume-up'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-file-image'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-link'></i>
            </Button>
            {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.7rem', 'fontSize':'20px'}} onClick={createLinkHandler}> */}
              {/* <i className='fas fa-plus'></i> */}
              {/* <i className='fas fa-film'></i> */}
            {/* </Button> */}
            <Button style={{'marginLeft': '0px', 'color': '#2d8cff', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-video'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={previewHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-folder-open'></i>
            </Button>
            <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={previewHandler}>
              {/* <i className='fas fa-plus'></i> */}
              <i className='fas fa-eye'></i>
            </Button>

{/* Buttons to be added in the list screen */}

            {/* <Button style={{'marginLeft': '0px', 'color': 'red', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              <i className='fas fa-lock'></i>
            </Button>
            
            <Button style={{'marginLeft': '0px', 'color': 'green', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              <i className='far fa-money-bill-alt'></i>
            </Button> */}

            {/* <Button style={{'marginLeft': '0px', 'color': 'black', 'background': 'white', 'padding':'0.75rem 0.6rem', 'fontSize':'20px'}} onClick={createLinkHandler}>
              <i className='fas fa-users'></i>
            </Button> */}

{/* Button to be added to the list screen */}

            {/* <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white'}} onClick={createLinkHandler}> */}
              {/* <i className='fas fa-plus'></i>&nbsp; */}
              {/* <i className='fas fa-lg fa-link'></i> */}
              {/* <i className='fas fa-code-branch'></i>&nbsp; */}
              {/* <i className='fas fa-2x fa-clone'></i>
              <Badge variant="light">4</Badge>
            </Button> */}
            {/* <Button style={{'marginLeft':'0px', 'color': 'red', 'background': 'white'}} onClick={createLinkHandler}> */}
              {/* <i className='fas fa-plus'></i>&nbsp; */}
              {/* <i className='fas fa-lg fa-link'></i> */}
              {/* <i className='far fa-lg fa-heart'></i>
              <Badge variant="light">28</Badge>
            </Button> */}
            {/* <Button style={{'marginLeft':'0px', 'color': '#000000', 'background': 'white'}} onClick={createLinkHandler}> */}
              {/* <i className='fas fa-plus'></i>&nbsp; */}
              {/* <i className='fas fa-lg fa-link'></i> */}
              {/* <i className='fas fa-share'></i> */}
              {/* <i className='fas fa-lg fa-share-alt'></i> */}
              {/* <Badge variant="light">9</Badge> */}
            {/* </Button> */}
            {/* <Button style={{'marginLeft':'0px', 'color': '#ff914d', 'background': 'white'}} onClick={createLinkHandler}> */}
              {/* <i className='fas fa-plus'></i>&nbsp; */}
              {/* <i className='fas fa-lg fa-link'></i> */}
              {/* <i className='fas fa-2x fa-bullhorn'></i>
            </Button> */}
          {/* </Col> */}
          {/* <Col className='text-right'> */}

          {/* </Col> */}
          {/*  <Col className='text-right'> */}
          {/*   <Button style={'marginLeft': '9px'} onClick={createClassHandler}> */}
          {/*     <i className='fas fa-plus'></i> Live */}
          {/*   </Button> */}
          {/*  </Col> */}
        </Row>
        // </Navbar>
      ) : (
        <Row className='align-items-center'>
          <Col>
            <h1>Content</h1>
          </Col>
        </Row>
      )}
      {/* {loadingDelete && <Loader />} */}
      {/* {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
      {/* {loadingCreate && <Loader />} */}
      {/* {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
      {/* {loadingAccept && <Loader />} */}
      {/* {errorAccept && <Message variant='danger'>{errorAccept}</Message>} */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row >
            {/* <Col sm={12} md={8} lg={8} xl={8} style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '10px', 'border':'0px'}}> */}
            {/* <Button style={{'position':'fixed', 'bottom': 10, 'right': 15, 'zIndex':2, 'color': '#ff914d', 'background': '#ffffff00'}} onClick={createLinkHandler}>
                  <i className='fas fa-3x fa-bullhorn'></i>
            </Button> */}
            <Col sm={12} md={8} lg={8} xl={8}>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <h4 style={{'textTransform': 'none', 'letterSpacing': '1px'}}>Morris Chang</h4>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px'}}>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '4px'}}>by
                </span>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '2px'}}>Sahil Bloom
                {/* <i style={{'color': '#ff914d', 'fontSize': '10px'}} className='fas fa-bullhorn'></i> */}
                </span>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '4px'}}>and
                </span>                
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '2px'}}>Alistair George
                {/* <i style={{'color': '#ff914d', 'fontSize': '10px'}} className='fas fa-bullhorn'></i> */}
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <span>
                  In 1983, a 52-year-old senior executive at Texas Instruments was passed over for the company's top job. He would go on to found and build the most strategically important company in the world.
                </span>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
                  {/* <i style={{'color': '#000000', 'fontSize': '15px', 'paddingLeft':'60px'}} className='fas fa-plus'></i> */}
                    <i style={{'color': 'red', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <img src="https://pbs.twimg.com/media/EsgeyJMVEAA8J02?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
                {/* <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4'}}>Sahil Bloom&nbsp;<i style={{'color': '#d3d3d4', 'fontSize': '10px'}} className='fas fa-bullhorn'></i></span> */}
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
                  {/* <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'60px'}} className='fas fa-plus'></i> */}
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>
              </Row>

                           

              {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <Iframe url="https://bbb.classroom.ltd/bigbluebutton/api/join?fullName=moderator&meetingID=14&password=supersecret&checksum=9ddca30b8e8f92e0b1c50c79ed05442024a21517"
                  width="100%"
                  height="600px"
                  id="myId1"
                  className="myClassname"
                  display="initial"
                  position="relative"/>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>                  
              </Row> */}

              {/* <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                  width="100%"
                  height="400px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"/>
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>                  
              </Row> */}

              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <span>Morris Chang was born into a middle-class family on July 10, 1931 in Ningbo, Chekiang, China. The early years of his life were set against a backdrop of hardship. Wars and widespread poverty had overwhelmed the country, exposing him to this suffering at a young age.                
                </span>                
                <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Alistair George
                {/* <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'60px'}} className='fas fa-plus'></i> */}
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom':'5px'}}>
                <span>
                  His father - an official in the local government - encouraged Morris to focus on school. Fleeing the violence of the ongoing wars, Morris and his mother moved frequently. His studies became his respite. In 1948, at the height of the Civil War, they moved to Hong Kong.                
                  </span>                
                  <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': '#d3d3d4', 'paddingTop':'10px'}}>Sahil Bloom
              {/* <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'60px'}} className='fas fa-plus'></i> */}
                    <i style={{'color': 'red', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-trash'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-up'></i>
                    <i style={{'color': '#000000', 'fontSize': '16px', 'paddingLeft':'20px'}} className='fas fa-arrow-down'></i>
                    <i style={{'color': 'green', 'fontSize': '15px', 'paddingLeft':'20px'}} className='fas fa-check'></i>
                    <i style={{'color': '#619863', 'fontSize': '15px', 'paddingLeft':'20px'}} className='far fa-money-bill-alt'></i>
              </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <img src="https://pbs.twimg.com/media/Esgfoj3VkAMDfm0?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  In 1949, Morris Chang was accepted to Harvard University. He moved to America. After just one year at Harvard, he transferred to The Massachusetts Institute of Technology (MIT) to study engineering. He graduated in 1953 with a B.S. and M.S. in Mechanical Engineering.                
                </span>                
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <img src="https://pbs.twimg.com/media/EsgfvVcUwAIbhQf?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  While he had originally intended to continue his studies and get a PhD, he failed his qualifying exam, so was forced to enter the job market. He took an entry-level job with Sylvania Semiconductor, but quickly realized the company wasn't forward-thinking enough for his style.       
                  </span>       
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  After just three years, he left Sylvania and accepted an engineering supervisor role at Texas Instruments, a growing technology company in Dallas, Texas. It all clicked for Morris Chang at TI. By 1961, he was managing a full department. He was on the fast track.
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  Seeing his potential, TI offered to sponsor him for a PhD, even agreeing to continue paying his full salary while he was pursuing the degree. This was an offer he was unable to pass up. He passed his qualifying exam (the second time was the charm!) and enrolled at Stanford.              
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <img src="https://pbs.twimg.com/media/EsggBDpVoAEZMWS?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  Completing the degree in 1964, he returned to TI and continued to climb the corporate ladder. By 1967, he became the GM of the most important semiconductor department at the company. A few years later, he was promoted to Vice President of its entire semiconductor business.                
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <img src="https://pbs.twimg.com/media/EsggIkdVkAAR1Y3?format=jpg&name=small" style={{maxWidth:'100%'}}></img>                
              </Row> 
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  After 6 years running the semiconductor business, and seemingly on the fast track to the C-suite, Morris Chang's career took an unexpected turn. He was transferred to lead the struggling consumer business, then to a staff role. In his own words, he was "put out to pasture."
                </span>
              </Row>
              <Row style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px'}}>
                <span>
                  There is a lot of speculation about why - some believe he was passed over due to being of Chinese origin - but Morris Chang had clearly been snubbed. He resigned from TI in 1983. Now 52, an age where most careers are winding down, Morris Chang's journey was just beginning.
                </span>
              </Row>
              {/* <Row className='align-items-center'>
                <Button style={{'marginLeft':'0px', 'color': 'black', 'background': 'white'}} onClick={createLinkHandler}>
                <i className='fas fa-2x fa-clone'></i>
                <Badge variant="light">4</Badge>
                </Button>
                <Button style={{'marginLeft':'0px', 'color': 'red', 'background': 'white'}} onClick={createLinkHandler}>
                  <i className='far fa-2x fa-heart'></i>
                  <Badge variant="light">28</Badge>
                </Button>
                <Button style={{'marginLeft':'0px', 'color': '#000000', 'background': 'white'}} onClick={createLinkHandler}>
                  <i className='fas fa-2x fa-share-alt'></i>
                </Button>
              </Row> */}
            </Col>
            {/* If the count of my discourses is less than 5 show my discourses as well as latest discourses or show latest contents added */}
            <Col sm={12} md={4} lg={4} xl={4} style={{'paddingRight': '15px', 'paddingLeft':'15px', 'paddingTop': '15px', 'paddingBottom': '15px', 'border':'0px'}}>
            <h3 style={{'letterSpacing': '0px'}}>Latest DisCourses</h3>
              {courses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </Col>
          </Row>
      )}
    </>
  )
}

export default TeachScreen
