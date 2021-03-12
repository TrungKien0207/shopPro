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
          className='mr-sm-2 ml-sm-5'
          onChange={(e) => setKeyword(e.target.value)}
        ></Form.Control>

        {/* <Button type='reset' value='hello' variant='light'>
          <Image src='https://img.icons8.com/fluent/18/000000/delete-sign.png' />
        </Button> */}
      </div>

      <Button type='submit' variant='outline-success' className='p-2'>
        <SearchIcon />
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
