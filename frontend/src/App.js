import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
// import CourseScreen from './screens/CourseScreen'
// import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
// import ShippingScreen from './screens/ShippingScreen'
// import PaymentScreen from './screens/PaymentScreen'
// import PlaceOrderScreen from './screens/PlaceOrderScreen'
// import OrderScreen from './screens/OrderScreen'
// import UserListScreen from './screens/UserListScreen'
// import TutorListScreen from './screens/TutorListScreen'
// import UserEditScreen from './screens/UserEditScreen'
// import CourseListScreen from './screens/CourseListScreen'
// import PendingListScreen from './screens/PendingListScreen'
import CourseEditScreen from './screens/CourseEditScreen'
// import OrderListScreen from './screens/OrderListScreen'

import ContentPdfEditScreen from './screens/ContentPdfEditScreen'
// import ContentEditScreen from './screens/ContentEditScreen'
import ContentLinkEditScreen from './screens/ContentLinkEditScreen'
import ContentImageEditScreen from './screens/ContentImageEditScreen'
import ContentAudioEditScreen from './screens/ContentAudioEditScreen'
import ContentTextEditScreen from './screens/ContentTextEditScreen'
import ComingSoonScreen from './screens/ComingSoonScreen'


import SigninScreen from './screens/SigninScreen'
import AuthScreen from './screens/AuthScreen'
import ThreadScreen from './screens/ThreadScreen'
import TweetScreen from './screens/TweetScreen'

// import StudentPdfEditScreen from './screens/StudentPdfEditScreen'
// import StudentListScreen from './screens/StudentListScreen'
// import StudentContentScreen from './screens/StudentContentScreen'
// import StudentCourseListScreen from './screens/StudentCourseListScreen'
// import TutorCourseListScreen from './screens/TutorCourseListScreen'
// import TutorOrderListScreen from './screens/TutorOrderListScreen'

import LearnScreen from './screens/LearnScreen'
import TeachScreen from './screens/TeachScreen'
// import JoinScreen from './screens/JoinScreen'

var host = window.location.host
var subdomain = host.split('.')[0]
// console.log('In App', subdomain);
localStorage.setItem("domain", subdomain);

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/signin/:cid' component={SigninScreen} exact />
          <Route path='/user/:uid' component={HomeScreen} exact />
          <Route path='/comingsoon' component={ComingSoonScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path="/auth-page" component={AuthScreen} exact />
          <Route path='/tutor/course/:id/edit' component={CourseEditScreen} />
          <Route path='/tutor/pdf/:id/edit' component={ContentPdfEditScreen} exact />
          <Route path='/tutor/link/:id/edit' component={ContentLinkEditScreen} exact />
          <Route path='/tutor/audio/:id/edit' component={ComingSoonScreen} exact />
          <Route path='/tutor/image/:id/edit' component={ContentImageEditScreen} exact />
          <Route path='/tutor/text/:id/edit' component={ContentTextEditScreen} exact />
          <Route path='/:uid/teach/:id' component={TeachScreen} />
          <Route path='/:uid/learn/:id?' component={LearnScreen} />
          <Route path='/:uid/thread/:id' component={ThreadScreen} exact />
          <Route path='/:uid/tweet/:id' component={TweetScreen} exact />
          {/* <Route path='/:uid/tweet/:id' render={(props) => (<Dashboard {...props} />)} exact/> */}
          <Route path='/' component={HomeScreen} exact />
          {/* <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />

          <Route path='/profile' component={ProfileScreen} />
          <Route path='/course/:url/:id' component={CourseScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/tutor/students/:id' component={StudentListScreen} />
          <Route path='/tutor/student/:courseId/:id' component={StudentContentScreen} exact />
          <Route path='/student/pdf/:id/edit' component={StudentPdfEditScreen} exact />
          <Route path='/tutor/pdf/:id/edit' component={ContentPdfEditScreen} exact />
          <Route path='/tutor/link/:id/edit' component={ContentLinkEditScreen} exact />
          <Route path='/tutor/class/:id/edit' component={ContentClassEditScreen} exact />
          <Route path='/tutor/courses' component={TutorCourseListScreen} exact />
          <Route path='/tutor/course/:id/edit' component={CourseEditScreen} />
          <Route path='/tutor/courses/:pageNumber' component={TutorCourseListScreen} exact />
          <Route path='/learn/:id' component={LearnScreen} exact />
          <Route path='/join/:id/:courseId' component={JoinScreen} exact />
          <Route path='/courses' component={StudentCourseListScreen} exact />
          <Route path='/courses/:id' component={HomeScreen} exact />

          <Route path='/admin/tutors' component={TutorListScreen} />
          <Route path='/admin/students' component={UserListScreen} />
          <Route path='/admin/users' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/courses' component={CourseListScreen} exact />
          <Route path='/admin/course/:id/edit' component={CourseEditScreen} />
          <Route path='/admin/pending' component={PendingListScreen} exact />
          <Route path='/admin/courses/:pageNumber' component={CourseListScreen} exact />
          <Route path='/admin/orders' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
