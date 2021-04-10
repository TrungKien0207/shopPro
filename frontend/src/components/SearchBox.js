import { React, useState } from 'react'
import { Form, Button, Image, InputGroup } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'
import { FormGroup, Input } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandle = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandle} inline>
      <div className='d-flex'>
        <Form.Control
          type='text'
          name='q'
          placeholder='Search Product...'
          className='mr-sm-2 ml-sm-5 rounded-pill'
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: '30rem' }}
        ></Form.Control>
      </div>

      <Button
        type='submit'
        className='p-2 btn_color rounded-pill'
        style={{ fontSize: '0.7rem' }}
      >
        <SearchIcon />
      </Button>
    </Form>
  )
}

export default SearchBox
