// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listContentDetails, updateContent } from '../actions/contentActions'
import { CONTENT_UPDATE_RESET, CONTENT_LIST_SUCCESS } from '../constants/contentConstants'

const ContentLinkEditScreen = ({ match, history }) => {
  const id = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  // const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loadingCourse, errorCourse, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contentDetails = useSelector((state) => state.contentDetails)
  const { loading, error, content } = contentDetails

  const contentList = useSelector((state) => state.contentList)
  // const { loadingContent, errorContent, contents } = contentList  
  const { contents } = contentList  

  const contentUpdate = useSelector((state) => state.contentUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    content: updatecontent
  } = contentUpdate

  useEffect(() => {
    if (successUpdate) {
      const newContent = contents.map(function(con) {
        if(con._id === updatecontent._id) {
          con = updatecontent;
        }
        return con
      })
      // console.log('Contents in contentTextEditScreen', newContent)
      // dispatch({
      //   type: CONTENT_LIST_SUCCESS,
      //   payload: {contents:newContent},
      // })
      // history.push(`/${content.username}/teach/${content.course}`)
      // console.log('Contents in contentTextEditScreen', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      if(course.tutor === userInfo._id) {
        history.push(`/${course.username}/teach/${course._id}`)
      }
      else {
        history.push(`/${course.username}/learn/${course._id}`)
      }
      dispatch({ type: CONTENT_UPDATE_RESET })
    } else {
      if (!content.name || content._id !== id) {
        dispatch(listContentDetails(id))
      } else {
        setName(content.name)
        setImage(content.image)
        setUrl(content.url)
      }
    }
  }, [dispatch, history, id, content, successUpdate, contents, updatecontent])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateContent({
        _id: id,
        name,
        image,
        url
      })
    )
  }

  return (
    <>
      {/* <Link to={`/${content.username}/teach/${content.course}`} className='btn btn-light my-3'>
        Go Back
      </Link> */}
      <FormContainer>
        <h1>Edit Content</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='url'>
              <Form.Label>Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ContentLinkEditScreen
