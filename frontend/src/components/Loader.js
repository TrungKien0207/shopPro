import React from 'react'
import { Spinner } from 'react-bootstrap'

Loader.propTypes = {}

function Loader(props) {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span class='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
