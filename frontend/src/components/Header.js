import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Badge, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
// import { logout } from '../actions/userActions'
import { getUserBalance, getUserNotification } from '../actions/userActions';

// , getUserBalance

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userBalance = useSelector((state) => state.userBalance)
  const { balance } = userBalance  

  const userNotification = useSelector((state) => state.userNotification)
  const { notification } = userNotification

  // console.log('User notificaiton and balance', balance, notification);

  // const notificationDetails = useSelector((state) => state.notificationDetails)
  // const { loading, error, notification } = notificationDetails
  // const message = 'This is a message';

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserBalance(userInfo._id))
      dispatch(getUserNotification(userInfo._id))
    }
  }, [dispatch, userInfo])


  // const logoutHandler = () => {
  //   dispatch(logout())
  // }

  return (
    <header style={{'marginBottom':'50px'}}>
      {/* <Notification message={message} show={true}></Notification> */}
      {/* <Navbar bg='light' variant='light' expand='lg' fixed="top" collapseOnSelect style={{'paddingTop': '0px', 'paddingBottom': '0px', 'border':'0px'}}> */}
      <Navbar bg='light' variant='light' expand='lg' fixed="top" collapseOnSelect style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
        <Container>
          <LinkContainer to='/' style={{'marginRight': '5px'}}>
            <Navbar.Brand>
              {/* <i style={{'color': '#ff914d', 'fontSize': '24px'}} className='fas fa-bullhorn'></i> */}
              {/* <img src="/logo-orange.png" height="40" alt="Teach Unlimited"></img> */}
              {/* <span style={{'fontFamily':'fantasy', 'textTransform':'none','color':'#ff914d', 'fontSize':'28px'}}>oolif</span> */}
              {/* <span style={{'fontFamily':'fantasy', 'textTransform':'none', 'fontSize':'28px'}}>oolif</span> */}
              {/* <span style={{'textTransform':'none', 'fontSize':'28px', 'color':'#ff914d'}}>teachunltd</span> */}
              {/* <i className='fas fa-3x fa-bullhorn' style={{'color': '#ff914d'}}></i> */}
              <i className='fas fa-2x fa-tint' style={{'color': '#ff914d'}}></i><span style={{'textTransform':'none', 'fontSize':'24px', 'color':'#ff914d'}}> teachunltd</span>
            </Navbar.Brand>
            {/* <Button href="/" style={{'background': '#ffffff'}}><img src="/logo-orange.png" height="40" alt="Gurukul"></img></Button> */}
          </LinkContainer>
          {userInfo ? (
            <ButtonToolbar className="justify-content-between" style={{'paddingTop': '10px'}}>
              <ButtonGroup>
                {/* <LinkContainer to='/notifications' style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                {/* <Button style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                  <span>
                    <i style={{'fontSize':'20px'}} className='far fa-bell'></i>
                    {/* <Badge variant="light">9+</Badge> */}
                    <Badge variant="light">{notification}</Badge>
                  </span>
                {/* </LinkContainer> */}
                {/* </Button> */}
                {/* <Button style={{'color':'#619863', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                {/* <LinkContainer to='/wallet' style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                  <span>
                    <i style={{'fontSize':'20px', 'color':'green'}} className='fas fa-coins'></i>
                    <Badge variant="light">{balance}</Badge>
                    {/* <Badge variant="light">250</Badge> */}
                  </span>
                {/* </LinkContainer> */}
                {/* </Button> */}
                <LinkContainer to='/profile' style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}>
                  {/* <Button style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                    <span>
                      <i style={{'fontSize':'20px'}} className="far fa-user-circle"></i>
                    </span>
                  {/* </Button> */}
                </LinkContainer>
              </ButtonGroup>
            </ButtonToolbar>
            ) : (
              <ButtonToolbar className="justify-content-between" style={{'paddingTop': '10px'}}>
              <ButtonGroup>
                <LinkContainer to='/login' style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}>
                  {/* <Button style={{'color':'#000000', 'background':'#ffffff', 'padding': '2px 2px 2px 4px'}}> */}
                    <span>
                      <i className="fas fa-2x fa-user-circle"></i>
                    </span>
                  {/* </Button> */}
                </LinkContainer>
              </ButtonGroup>
            </ButtonToolbar>            
            )
          }

          {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
          {/* <Navbar.Toggle aria-controls='basic-navbar-nav' /> */}
          {/* <Navbar.Collapse id='basic-navbar-nav' style={{ marginTop: '10px' }}>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? !userInfo.isAdmin && !userInfo.isTutor ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/courses'>
                    <NavDropdown.Item>Courses</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/tutors'>
                    <NavDropdown.Item>Tutors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/students'>
                    <NavDropdown.Item>Students</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/courses'>
                    <NavDropdown.Item>Courses</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/pending'>
                    <NavDropdown.Item>Pending</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.isTutor && (
                <NavDropdown title='Tutor' id='tutormenu'>
                  <LinkContainer to='/tutor/courses'>
                    <NavDropdown.Item>Courses</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
