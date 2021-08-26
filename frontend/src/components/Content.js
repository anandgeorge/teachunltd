// import React from 'react'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Card, Row, Col, Badge, Button, Modal } from 'react-bootstrap'
import Rating from './Rating'
import Iframe from 'react-iframe'
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'
import { TwitterTweetEmbed } from 'react-twitter-embed';

const Content = ({ content, userInfo, subscribeHandler }) => {

  const [show, setShow] = useState(false); 

  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);

  const handleSubscribe = () => {
    //   console.log('In handleSubscribe', content._id);
      subscribeHandler(content._id);
      handleClose()
  }     
 
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={true} > 
        <Modal.Header closeButton><Modal.Title>Confirm</Modal.Title></Modal.Header> 
        <Modal.Body>
            {userInfo ? (
                <span>Do you want to unlock this content for {content.coins} <i style={{'color':'green'}} className='fas fa-coins'></i></span>
            ) : (
                <span>Please click Ok to signup / login. <br/>Unlock this content for {content.coins} <i style={{'color':'green'}} className='fas fa-coins'></i>. <br/>Signup to get 250 <i style={{'color':'green'}} className='fas fa-coins'></i>.</span>                
            )}
            </Modal.Body> 
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSubscribe}>Ok</Button>
        </Modal.Footer>
      </Modal>    
        {/* {content.type === 'text' && (userInfo && content.tutor === userInfo._id || content.description.length <= 280 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1) ? ( */}
        {content.type === 'text' && (userInfo && content.tutor === userInfo._id || content.coins === 0 || userInfo && content.subscribers && content.subscribers.indexOf(userInfo._id) >  -1) ? (
                <div>
                   <h5 style={{'textTransform': 'none', 'letterSpacing': '1px', 'fontSize': '16px'}}>{content.name}</h5>
                   <span style={{'letterSpacing': '1px', 'fontSize': '16px', 'color':'#272522'}} dangerouslySetInnerHTML={{__html: content.description.replace(/\n/g, '</br>')}}></span>
                </div>  
            // ) : content.type === 'text' && content.description.length > 280 ? (
                ) : content.type === 'text' && content.coins > 0 ? (
                <div>
                   {/* <h4 style={{'textTransform': 'none', 'letterSpacing': '1px'}}><i style={{'color':'red', 'fontSize': '14px'}} className='fas fa-lock' onClick={handleShow}></i><Badge variant="light">{content.coins}<i style={{'color':'green', 'fontSize':'12px'}} className='fas fa-coins'></i></Badge><i className='far fa-heart' style={{'marginLeft':'10px', 'color':'red', 'fontSize':'14px'}} disabled></i><Badge variant="light">{content.likesc}</Badge>&nbsp;{content.name}</h4> */}
                   <h5 style={{'textTransform': 'none', 'letterSpacing': '1px'}}><i style={{'color':'red', 'fontSize': '14px'}} className='fas fa-lock' onClick={handleShow}></i><Badge variant="light">{content.coins}<i style={{'color':'green', 'fontSize':'12px'}} className='fas fa-coins'></i></Badge><i className='far fa-heart' style={{'marginLeft':'10px', 'color':'red', 'fontSize':'14px'}} disabled></i><Badge variant="light">{content.likesc}</Badge>&nbsp;{content.name}</h5>
                   {/* <span style={{'textTransform': 'none', 'letterSpacing': '1px', 'paddingRight': '10px', 'color': 'blue', 'fontSize':'14px'}}>{content.username}</span> */}
                   {/* <i className='fas fa-eye'></i><Badge variant="light">4<i style={{'color':'green'}} className='fas fa-coins'></i></Badge>     */}
                   {/* <i className='far fa-clone'></i><Badge variant="light">40<i style={{'color':'green'}} className='fas fa-coins'></i></Badge>     */}
                </div> 
            ) : content.type === 'pdf' ? (
                // <div style={{'background':'#f1f3f4', 'padding':'10px 10px 10px 20px', 'borderRadius': '20px'}}>
                    // <a href={content.url} style={{'textDecoration':'none'}}><span style={{'textTransform': 'none', 'letterSpacing': '1px', 'color':'red'}}><i className='far fa-file-pdf' style={{'marginRight':'8px'}}></i><h5 style={{'textTransform': 'none', 'letterSpacing': '1px', 'fontSize': '18px'}}>{content.name.length > 50 ? content.name.substring(0, 50) + '...' : content.name}&nbsp;&nbsp;</h5></span></a>
                // </div>                
                <>
                {content.url.indexOf('http') > -1 ? (
                        <a href={`${content.url}`} style={{'textDecoration':'none'}}><span style={{'textTransform': 'none', 'letterSpacing': '1px', 'color':'red'}}><i className='far fa-file-pdf' style={{'marginRight':'8px'}}></i><h5 style={{'textTransform': 'none', 'letterSpacing': '1px', 'fontSize': '18px'}}>{content.name.length > 50 ? content.name.substring(0, 50) + '...' : content.name}&nbsp;&nbsp;</h5></span></a>
                    ) : (
                        <a href={`https://app.teachun.ltd${content.url}`} style={{'textDecoration':'none'}}><span style={{'textTransform': 'none', 'letterSpacing': '1px', 'color':'red'}}><i className='far fa-file-pdf' style={{'marginRight':'8px'}}></i><h5 style={{'textTransform': 'none', 'letterSpacing': '1px', 'fontSize': '18px'}}>{content.name.length > 50 ? content.name.substring(0, 50) + '...' : content.name}&nbsp;&nbsp;</h5></span></a>
                    )}
                </>
                ) : content.type === 'voice' ? (
                <span style={{'textTransform': 'none', 'letterSpacing': '1px'}}>{content.name.length > 30 ? content.name.substring(0, 30) + ' ...' : content.name}</span>
            ) : content.type === 'image' ? (
                <>
                {content.url.indexOf('http') > -1 ? (
                    <img src={`${content.url}`} style={{maxWidth:'100%'}}></img>
                ) : (
                    <img src={`https://app.teachun.ltd${content.url}`} style={{maxWidth:'100%'}}></img>
                )}
                </>
            ) : content.type === 'youtube' ? (
                <Iframe url={content.url} width="100%" height="400px" id={content._id} className="myClassname" display="initial" position="relative"/>
                // <ReactPlayer url={content.url} width='100%'/>
                // <ReactPlayer url='https://video.twimg.com/ext_tw_video/1366449458427400196/pu/vid/640x360/wUeqfX_PBcEx1viz.mp4?tag=10' width='100%' controls/>
            ) : content.type === 'twitter' ? (
                    <TwitterTweetEmbed tweetId={content.url} />
                    // <ReactPlayer url={content.url} width='100%'/>
                    // <ReactPlayer url='https://video.twimg.com/ext_tw_video/1366449458427400196/pu/vid/640x360/wUeqfX_PBcEx1viz.mp4?tag=10' width='100%' controls/>
    
            ) : content.type === 'audio' ? (
                <ReactAudioPlayer src={content.url} controls />
                // <ReactAudioPlayer src='https://dts.podtrac.com/redirect.mp3/seekjustice.fm/media/001.mp3' controls />
                // <>
                // <video width="100%" controls>
                //     <source src="https://filesamples.com/samples/video/ogv/sample_640x360.ogv" type="video/mp4" />Your browser does not support HTML video.
                // </video>
                // </>
                // <ReactAudioPlayer src='https://www.mixcloud.com/mixcloud/meet-the-curators/' controls />
                // <ReactPlayer url={content.url} controls style={{'border':'solid 1px black', 'width':'100% !important', 'height':'20px !important'}}/>
            // ) : content.type === 'article' ? (
                // <div>
                    // <a href={content.url}><h5 style={{'color':'blue', 'textTransform': 'none'}}>{content.name}</h5></a>
                    // <span style={{'letterSpacing': '1px'}}>{content.description}</span>
                // </div>
            ) : content.type === 'link' || content.type === 'self' ? (
                <div style={{'borderRadius': '15px', 'border': '1px solid', 'padding': '10px', 'borderColor': '#ececf5'}}>
                    <a href={content.url} style={{'textDecoration':'none'}}>
                        {/* <h5 style={{'color':'blue', 'textTransform': 'none'}}>{content.name}<i style={{'color':'#657786', 'marginLeft':'4px', 'fontSize':'14px'}} className='fas fa-link'></i></h5> */}
                        <h4 style={{'textTransform': 'none', 'fontSize': '16px', 'letterSpacing': '1px'}}>
                            {content.type ===  'link' ? (
                                <i style={{'color':'#657786', 'marginRight':'4px', 'fontSize':'16px'}} className='fas fa-link'></i>
                            ) : (
                                <i style={{'color':'#ff914d', 'marginRight':'4px', 'fontSize':'18px'}} className='fas fa-bullhorn'></i>
                            )}
                            {content.name}</h4>
                        <span style={{'letterSpacing': '1px', 'fontSize': '16px', 'color':'#272522'}}>{content.description}</span>
                    </a>
              </div>
            ) : content.type === 'live' ? (
                <span style={{'textTransform': 'none', 'letterSpacing': '1px'}}>{content.name.length > 30 ? content.name.substring(0, 30) + ' ...' : content.name}</span>
            ) : (
                <></>
            )
        }
    </>
  )
}

export default Content

