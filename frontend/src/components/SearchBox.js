import React, { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
      window.location.reload();
    } else {
      history.push('/')
    }
  }



  return (
    <Form onSubmit={submitHandler} inline>
      <InputGroup>
        {/* <Button href="/" variant='light' className='p-2' style={{'marginRight': '10px'}}><i className='fas fa-2x fa-fire'></i></Button>
        <Button href="/" variant='light' className='p-2' style={{'marginRight': '10px'}}><img src="gurukul-logo.png" height="40"></img>
        <i className='fas fa-2x fa-fire'>
        </Button> */}
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search DisCourses, Users'
          className='mr-sm-2 ml-sm-5'
          // style={{'border': '1px solid gray', 'borderRadius': '15px'}}
          style={{'borderRadius': '15px'}}
        ></Form.Control>
        <Button type='submit' variant='light' className='p-2'><i className='fas fa-lg fa-search'></i></Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
