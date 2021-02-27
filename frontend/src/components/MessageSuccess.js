import React from 'react'
import { Alert } from 'react-bootstrap'
import '../toast.css'
import { ToastContainer, toast } from 'react-toastify'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

MessageSuccess.propTypes = {}

function MessageSuccess({ variant, children }) {
  toast.success(
    <div>
      <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
      {variant}
    </div>,
    {
      className: 'Toastify__toast--success',
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      preventDuplicates: true,
      preventOpenDuplicates: true
    }
  )
  return (
    <ToastContainer></ToastContainer>
  )
}

MessageSuccess.defaultProps = {
  variant: 'info',
}

export default MessageSuccess
