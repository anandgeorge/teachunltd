import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getStudentContentDetails, updateStudentContent } from '../actions/studentActions'
import { SCONTENT_UPDATE_RESET } from '../constants/studentConstants'

const StudentPdfEditScreen = ({ match, history }) => {
  const id = match.params.id

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const scontentDetails = useSelector((state) => state.scontentDetails)
  const { loading, error, scontent } = scontentDetails

  const scontentUpdate = useSelector((state) => state.scontentUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = scontentUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SCONTENT_UPDATE_RESET })
      history.push(`/tutor/student/${scontent.course}/${scontent.student}`)
    } else {
      if (!scontent.name || scontent._id !== id) {
        dispatch(getStudentContentDetails(id))
      } else {
        setName(scontent.name)
        setImage(scontent.image)
        setUrl(scontent.url)
      }
    }
  }, [dispatch, history, id, scontent, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('pdf', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      // const { data } = await axios.post('https://api.gurukul.best/api/upload/pdf', formData, config)
      const { data } = await axios.post('https://api.teachun.ltd/api/upload/pdf', formData, config)

      setUrl(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateStudentContent({
        _id: id,
        name,
        image,
        url
      })
    )
  }

  return (
    <>
      <Link to={`/tutor/student/${scontent.course}/${scontent.student}`} className='btn btn-light my-3'>
        Go Back
      </Link>
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
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            {/* <Form.Group controlId='url'>
              <Form.Label>Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              ></Form.Control>
            </Form.Group> */}
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default StudentPdfEditScreen
