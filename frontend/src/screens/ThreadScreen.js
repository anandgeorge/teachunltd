// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import { listContent } from '../actions/contentActions'
// import { listCourseDetails } from '../actions/courseActions'
import Thread from '../components/Thread'
import axios from "axios";

const ThreadScreen = ({ match, history }) => {
  const id = match.params.id
  const username = match.params.uid
//   console.log('In Tweet Screen', username, id);

//   const [name, setName] = useState('') 
//   const [description, setDescription] = useState('')
  const [tthreads, setThread] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loadingCourse, errorCourse, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const contentList = useSelector((state) => state.contentList)
  const { loadingContent, error, contents } = contentList


  const startAuth = () => {
    setLoading(true);
    axios
      .get("https://api.teachun.ltd/start-auth")
    //   .get("/start-auth")
      .then(res => {
        if (res.data.redirectUrl) {
          localStorage.setItem(
            "oauthRequestTokenSecret",
            res.data.oauthRequestTokenSecret
          );
          localStorage.setItem("oauthRequestToken", res.data.oauthRequestToken);
          localStorage.setItem("courseId", id);
          console.log('In redirectUrl', res.data.redirectUrl);
          window.location.href = res.data.redirectUrl;
        }
      })
      .catch(err => {
        setLoading(false);
        alert("auth error", err);
      });
  };

//   const error = false

  useEffect(() => {
    if (!course.name || course._id !== id) { 
        history.push(`/${username}/learn/${id}`)
        // dispatch(listCourseDetails(id))
        // dispatch(listContent(id))
    }
    else {
        const qthreads = contents.filter(content => {
            return content.type === 'text' && content.coins === 0
        })
        qthreads.unshift({name:course.name, description:course.description})
        // const url = `https://app.teachun.ltd/${course.username}/learn/${course._id}`
        let domain = userInfo.domain;
        let url = `https://${domain}.teachun.ltd/${course.username}/learn/${course._id}`
        // if(domain === 'app') {
        //     url = `https://app.teachun.ltd/${course.username}/learn/${course._id}`
        // }
        // else if(domain.indexOf('localhost') > -1) {
        //     url = `http://${domain}/${course.username}/learn/${course._id}`
        // }
        // else {
        //     url = `https://${domain}.teachun.ltd/${course.username}/learn/${course._id}`
        // }
        qthreads.push({name:'Link to discourse', description:url})
        // qthreads.push({name:'Link to discourse', description:''})
        // console.log('QThreads', qthreads);

        let threads = [];
        let threadsArr = [];
        qthreads.map(qt => {
            threadsArr.push(qt.name + '\n\n' + qt.description)
        })
        threadsArr.map(ta => {
            let taArr = ta.split('.\n\n')
            taArr.map(tr => {
                if(tr.length < 264) {
                    threads.push({text:tr})
                    // console.log('Step 1', tr)
                }
                else {
                    let tnArr = tr.split('\n\n')
                    tnArr.map(tn => {
                        if(tn.length < 265) {
                            threads.push({text:tn + '\n'})
                            // console.log('Step 2', tn)
                        }
                        else {
                            let tadArr = tn.split('. ')
                            let skip = false;
                            tadArr.map((tar, idx) => {
                                if(tar.length < 266) {
                                    if(!skip && tadArr[idx + 1]) {
                                        let curTad = tar + '. ' + tadArr[idx + 1] + '. '
                                        if(curTad.length < 266) {
                                            threads.push({text:curTad})
                                            // console.log('Step 3', curTad)
                                            skip = true
                                        }
                                    }
                                    else if(!skip && !tadArr[idx + 1]) {
                                        threads.push({text:tar})
                                        // console.log('Step 4', tar)
                                    }
                                    else {
                                        skip = false
                                    }
                                }
                                else {
                                    let ttdArr = tar.match(/(.|[\r\n]){1,270}/g);
                                    ttdArr.map(ttd => {
                                        threads.push({text:ttd})
                                        // console.log('Step 5', ttd)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
        setThread(threads)
    }
  }, [dispatch, history])

  return (
    <>
        {loadingContent ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <>
                <h4 style={{'marginLeft':'-10px', 'letterSpacing': '0px','textTransform':'none', 'marginTop':'10px'}}>&nbsp;&nbsp; Post to Twitter <small style={{'color':'blue', 'fontSize':'12px'}}> ({tthreads.length} tweets)</small></h4>
                <p style={{'color':'blue', 'fontSize':'12px', 'marginTop':'10px', 'marginLeft':'5px'}}>Only text content marked as free will be posted to Twitter.</p> 
                <Row >
                    <Col sm={12} md={8} lg={8} xl={8}>
                        {tthreads.map((thread, idx) => (
                            // <div key={idx} style={{'marginBottom':'5px', 'borderRadius': '8px', 'background': '#faebd7', 'padding': '6px'}}>
                            <div key={idx} style={{'marginBottom':'5px', 'borderRadius': '8px', 'border': '1px solid', 'padding': '6px'}}>
                                <Thread thread={thread}></Thread>
                            </div>
                        ))}
                        <Button style={{'marginTop':'10px'}} onClick={startAuth}> Sign In To Twitter And Post </Button>
                        <p style={{'color':'blue', 'fontSize':'12px', 'marginTop':'10px'}}>Signing in with Twitter allows us to post this thread on your behalf. We do not store Twitter access credentials and use it only to post this thread.</p> 
                    </Col>
                    <Col sm={12} md={4} lg={4} xl={4}>
                        <Link to={`/${username}/learn/${id}`} className='btn btn-light my-3'>
                            Go Back
                        </Link>
                    </Col>
                </Row>
            </>
        )
        }
    </>
  )
}

export default ThreadScreen
