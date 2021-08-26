import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from "axios";
import qs from "query-string";
import { COURSE_DETAILS_SUCCESS } from '../constants/courseConstants'


const AuthScreen = ({ location, history, match }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const courseDetails = useSelector((state) => state.courseDetails)
  const { loadingCourse, errorCourse, course } = courseDetails

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // console.log('In authscreen', location.search);
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    if(!error) {
      if (query.oauth_token === localStorage.getItem("oauthRequestToken")) {
        axios
          .get(
            // `https://api.teachun.ltd/callback/${localStorage.getItem("oauthRequestToken")}/${localStorage.getItem("oauthRequestTokenSecret")}/${query.oauth_verifier}`
            `https://api.teachun.ltd/callback/${localStorage.getItem("oauthRequestToken")}/${localStorage.getItem("oauthRequestTokenSecret")}/${query.oauth_verifier}`
          )
          .then(response => {
            if (response.data.oauthAccessToken) {
              axios
                .get(
                  // `https://api.teachun.ltd/verify/${response.data.oauthAccessToken}/${response.data.oauthAccessTokenSecret}/${localStorage.getItem("courseId")}`
                  `https://api.teachun.ltd/verify/${response.data.oauthAccessToken}/${response.data.oauthAccessTokenSecret}/${localStorage.getItem("courseId")}`
                )
                .then(res => {
                  const { tweets } = res.data;
                  const keys = response.data;

                  // console.log('In verify response', res);

                  // setError(true);
                  // return;

                  // const userInfo = {
                  //   accessToken: keys.oauthAccessToken,
                  //   secret: keys.oauthAccessTokenSecret,
                  //   user_id: user.id_str,
                  //   screen_name: user.screen_name,
                  //   photo: user.profile_image_url_https.replace("_normal", "")
                  // };
                  const newCourse = Object.assign({}, course);
                  newCourse.tweets = tweets
                  dispatch({
                    type: COURSE_DETAILS_SUCCESS,
                    payload: newCourse,
                  })

                  // console.log('Tweets', tweets);
                  // history.push({pathname: `/${userInfo.username}/tweet/${localStorage.getItem("courseId")}`, state: { ids: tweets}});
                  let domain = localStorage.getItem("domain");
                  let redirect = `https://${domain}.teachun.ltd/${userInfo.username}/learn/${localStorage.getItem("courseId")}`;
                  // console.log('Redirect', redirect);
                  if(domain === 'app' || domain.indexOf('localhost') > -1) {
                    history.push({pathname: `/${userInfo.username}/tweet/${localStorage.getItem("courseId")}`, state: { ids: tweets}});
                  }
                  else {
                    window.location.href = `https://${domain}.teachun.ltd/${userInfo.username}/learn/${localStorage.getItem("courseId")}`; 
                  }                
                });
            }
          })
          .catch(err => {
            // alert("authentication error");
            setError(true)
            // history.push({
            //   pathname: "/"
            // });
          });
      } else {
        // alert("authentication error");
        setError(true)
        // authentication error
        // history.push('/');
      }
    }
    else {
      setErrorMessage('There was an issue with your authentication. Please click on the link below to retry.')
    }
  }, [location.search, history, error]);

  return (
    <Row >
        <Col sm={12} md={4} lg={4} xl={4}>
        </Col>
        {error ? (
          <Col sm={12} md={4} lg={4} xl={4}>
            <Message variant='danger'>{errorMessage}</Message>
            <Link style={{'marginTop':'10px', 'marginLeft':'20px', 'color':'blue'}} to={`https://${localStorage.getItem("domain")}.teachun.ltd/${userInfo.username}/learn/${localStorage.getItem("courseId")}`}>
              Try Again
            </Link>
          </Col>
        ) : (
          <Col sm={12} md={4} lg={4} xl={4}>
            <div className="App-header ">
                <Loader />
                <p style={{'paddingLeft': '10px', 'fontSize': '16px'}}>Please wait while we create the threads. This may take some time.</p>
            </div>
          </Col>
        )}
        <Col sm={12} md={4} lg={4} xl={4}>
        </Col>
    </Row>

  )
}

export default AuthScreen