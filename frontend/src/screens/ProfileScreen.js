import Avatar from '@material-ui/core/Avatar'
import Link from '@material-ui/core/Link'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import Loader from '../components/Loader'
import '../toast.css'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(59),
    height: theme.spacing(60),
    fontSize: '20rem',
  },
}))

function ProfileScreen({ location, history }) {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  // console.log('hello anh em', userUpdateProfile)
  const { success } = userUpdateProfile

  const submitHandler = (e) => {
    e.preventDefault()
    error &&
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> {error}
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )

    if (password !== confirmPassword) {
      toast.error(
        <div>
          <ErrorOutlineIcon className='pr-1' fontSize='large' /> Password is not
          match
        </div>,
        {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    } else {
      dispatch(
        updateUserProfile({ id: user._id, email, name, avatar, password })
      )

      toast.success(
        <div>
          <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
          Profile Updated
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
        }
      )
    }
  }

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

      const { data } = await axios.post('/api/uploads', formData, config)

      setAvatar(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setAvatar(user.avatar)
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <div>
      {message && <Announcement variant='danger'>{message}</Announcement>}
      {error && <Announcement variant='danger'>{error}</Announcement>}
      {/* {loading && <Loader />} */}
      <div className='card_color border-0'>
        <Row className='justify-content-center '>
          <Col
            md={7}
            className='pt-5 shadow '
            style={{
              backgroundColor: '#977bd5',
              // borderTopLeftRadius: '0.8rem',
              // borderBottomLeftRadius: '0.8rem',
            }}
          >
            <div
              className='m-auto text-center'
              style={{
                border: '5px solid #55595c',
                borderRadius: '50%',
                width: '30rem',
                height: '30.6rem',
              }}
            >
              <div className='text-center mb-3'>
                {user.avatar ? (
                  <Image
                    style={{
                      width: '30rem',
                      height: '30rem',
                    }}
                    src={avatar}
                    className='rounded-circle'
                    fluid
                  />
                ) : (
                  <Avatar className={classes.orange}>
                    {userInfo.name.substring(0, 1)}
                  </Avatar>
                )}
              </div>
              <div className='text-center'>
                <Link
                  href='/myorders'
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.05rem',
                  }}
                  className='text-decoration-none shadow'
                >
                  <Button
                    variant='outline-light'
                    className='rounded-pill shadow'
                    style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
                  >
                    MY ORDERS
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col
            md={4}
            className='pt-4 pb-4 mr-1 bg-light shadow border-0'
            style={{
              backgroundColor:
                'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);',
              // borderTopRightRadius: '0.8rem',
              // borderBottomRightRadius: '0.8rem',
            }}
          >
            <h2 className='text-center'>User Profile</h2>
            <Form onSubmit={submitHandler} className='pl-4 pr-4 pt-3'>
              <Form.Group controlId='name'>
                <Form.Label as='p' className='mb-1'>
                  Name
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label as='p' className='mb-1'>
                  Email address
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label as='p' className='mb-1'>
                  Image
                </Form.Label>
                <Form.Control
                  className='border border-grey'
                  type='text'
                  placeholder='Enter image url'
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                ></Form.Control>
                <Form.File
                  className='border border-grey'
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Password
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label as='p' className='mb-1'>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  className='border border-grey rounded-pill'
                  type='password'
                  placeholder='Enter Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div>
                <Button
                  type='submit'
                  variant='outline-success'
                  className='btn-block shadow rounded-pill'
                  style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
                >
                  Update
                </Button>
              </div>
              <ToastContainer />
            </Form>{' '}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProfileScreen
