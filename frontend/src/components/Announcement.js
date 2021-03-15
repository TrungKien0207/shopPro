import React from 'react'
import { Alert } from 'react-bootstrap'

const Announcement = ({ variant, children }) => {
  return (
    <Alert className='rounded-pill' variant={variant}>
      {children}
    </Alert>
  )
}

Announcement.defaultProps = {
  variant: 'info',
}

export default Announcement
