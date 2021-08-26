import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listCourseDetails, updateCourse } from '../actions/courseActions'
import { CONTENT_UPDATE_RESET, CONTENT_LIST_SUCCESS } from '../constants/contentConstants'

const CourseEditScreen = ({ match, history }) => {
  const courseId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const courseDetails = useSelector((state) => state.courseDetails)
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const contentList = useSelector((state) => state.contentList)
  const { loadingContent, errorContent, contents } = contentList    

  const courseUpdate = useSelector((state) => state.courseUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    content: updatecontent
  } = courseUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: COURSE_UPDATE_RESET })
      const newContent = contents.map(function(con) {
        if(con._id === updatecontent._id) {
          con = updatecontent;
        }
        return con
      })
      // console.log('Contents in contentTextEditScreen', newContent)
      dispatch({
        type: CONTENT_LIST_SUCCESS,
        payload: {contents:newContent},
      })
      history.push('/admin/courselist')
    } else {
      if (!course.name || course._id !== courseId) {
        dispatch(listCourseDetails(courseId))
      } else {
        setName(course.name)
        setPrice(course.price)
        setImage(course.image)
        setBrand(course.brand)
        setUrl(course.url)
        setCategory(course.category)
        setCountInStock(course.countInStock)
        setDescription(course.description)
      }
    }
  }, [dispatch, history, courseId, course, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      // const { data } = await axios.post('https://api.gurukul.best/api/upload', formData, config)
      const { data } = await axios.post('https://api.teachun.ltd/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCourse({
        _id: courseId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      {/* <Link to='/admin/courselist' className='btn btn-light my-3'>
        Go Back
      </Link> */}
      <FormContainer>
        <h1>Edit Course</h1>
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

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
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

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default CourseEditScreen
