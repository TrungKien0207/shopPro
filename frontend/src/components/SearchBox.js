import { React, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import SearchIcon from '@material-ui/icons/Search'

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
      <Form.Control
        type='text'
        name='q'
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        <SearchIcon />
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
