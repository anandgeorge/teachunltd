import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from "axios";

const SigninScreen = ({ location, history, match }) => {
  const courseId = match.params.cid
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [loading, setLoading] = useState(false);

  // set up the action and reducer. If this action is cancelled we go back to the original page. If this action succeeds we route to the Tweets while setting the tweets list before redirecting.
  const startAuth = () => {
    setLoading(true);
    axios
      .get("https://api.teachun.ltd/start-auth")
      .then(res => {
        if (res.data.redirectUrl) {
          localStorage.setItem(
            "oauthRequestTokenSecret",
            res.data.oauthRequestTokenSecret
          );
          localStorage.setItem("oauthRequestToken", res.data.oauthRequestToken);
          localStorage.setItem("courseId", courseId);
          // console.log('In redirectUrl', res.data.redirectUrl);
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch(err => {
        setLoading(false);
        alert("auth error", err);
      });
  };

  const error = false


  useEffect(() => {
    if (!userInfo) {
        history.push(`/login?redirect=${location.pathname}`)
    }
  }, [userInfo, history])

  return (
    <> 
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row >
            <Col sm={12} md={4} lg={4} xl={4}>
            </Col>
            <Col sm={12} md={4} lg={4} xl={4}>
                <p>Signing in with Twitter allows us to post this thread on your behalf. Twitter access credentials are not stored on the platform and we use it to only post this thread. Every time you need to post we will ask you to signin to enable these credentials.</p>
                <Button onClick={startAuth}> Sign In With Twitter </Button>
            </Col>
            <Col sm={12} md={4} lg={4} xl={4}>
            </Col>
        </Row>
      )}
    </>
  )
}

export default SigninScreen
