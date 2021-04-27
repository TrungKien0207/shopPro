import DateFnsUtils from '@date-io/date-fns'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange } from '@material-ui/core/colors'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Announcement from '../components/Announcement'
import Banner from '../components/Banner'
import Loader from '../components/Loader'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import data from '../data.json'
import '../toast.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(48.8),
    height: theme.spacing(50),
    fontSize: '20rem',
  },
}))

function ProfileScreen({ location, history }) {
  const classes = useStyles()

  const [state, setState] = useState(false)

  const handleChange = () => {
    setState(!state)
  }

  const [selectedDate, setSelectedDate] = useState(
    new Date('2021-03-22T21:11:54')
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  // console.log('user', user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [sex, setSex] = useState('')
  const [thanhPho, setThanhPho] = useState('')
  const [huyen, setHuyen] = useState('')
  const [xa, setXa] = useState('')
  const [diaChi, setDiachi] = useState('')
  const [numberPhone, setNumberPhone] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { loading: loadingUpdate, success } = userUpdateProfile

  let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '')

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return '(' + match[1] + ') ' + match[2] + ' ' + match[3]
    }

    return null
  }

  // console.log('length', numberPhone.length)

  // console.log(
  //   'length',
  //   JSON.stringify(formatPhoneNumber(formatPhoneNumber)).length
  // )

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
      if (numberPhone.length === 14 || numberPhone.length === 10) {
        dispatch(
          updateUserProfile({
            id: user._id,
            email,
            name,
            avatar,
            password,
            sex,
            numberPhone,
            selectedDate,
            diaChi,
            xa,
            huyen,
            thanhPho,
          })
        )
        toast.success(
          <div>
            <CheckCircleOutlineIcon className='pr-1' fontSize='large' />
            Hồ sơ đã được cập nhật
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
      } else {
        toast.error(
          <div>
            <ErrorOutlineIcon className='pr-1' fontSize='large' /> Số điện thoại
            phải có đúng 10 số
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
      }
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
        // setAddress(user.address)
        setThanhPho(user.address.thanhPho)
        setHuyen(user.address.huyen)
        setXa(user.address.xa)
        setDiachi(user.address.diaChi)
        setSelectedDate(user.birthDay)
        setSex(user.sex)
        setNumberPhone(user.numberPhone)
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <div>
      {message && <Announcement variant='danger'>{message}</Announcement>}
      {error && <Announcement variant='danger'>{error}</Announcement>}
      {/* {loading && <Loader />} */}

      <div className='border-0'>
        <Row className='justify-content-center m-0'>
          <Col
            md={4}
            className='pt-5 shadow'
            style={{
              backgroundColor: '#977bd5',
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem',
            }}
          >
            <div
              className='text-center mt-5 m-auto'
              style={{
                border: '5px solid #55595c',
                borderRadius: '50%',
                width: '25rem',
                height: '25.6rem',
              }}
            >
              <div className='text-center mb-3 avatar_container'>
                {user.avatar && user.avatar ? (
                  <>
                    <Image
                      style={{
                        width: '25rem',
                        height: '25rem',
                      }}
                      src={avatar}
                      className='rounded-circle avatar_img'
                      fluid
                    />
                    <div className='avatar_upload'>
                      <div className='avatar_edit'>
                        {uploading && <Loader />}
                        <Form.Group>
                          <Image
                            className='avatar_icon'
                            src='https://img.icons8.com/fluent/40/000000/camera.png'
                          />
                          <Form.File
                            id='image-file'
                            custom
                            onChange={uploadFileHandler}
                            className='avatar_file'
                          ></Form.File>
                        </Form.Group>
                      </div>
                    </div>
                  </>
                ) : (
                  <Avatar className={classes.orange}>
                    {uploading && <Loader />}
                    {userInfo.name.substring(0, 1)}
                  </Avatar>
                )}
              </div>
              <div className='text-center mt-5'>
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
                    className='rounded-pill shadow '
                    style={{ fontSize: '1rem', letterSpacing: '0.25rem' }}
                  >
                    ĐƠN HÀNG CỦA TÔI
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
          <Col
            md={8}
            className='pt-4 pb-4  bg-light shadow border-0'
            style={{
              backgroundColor:
                'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);',
              borderTopRightRadius: '1rem',
              borderBottomRightRadius: '1rem',
            }}
          >
            <h2 className='text-center'>Thông tin cá nhân</h2>
            <Form onSubmit={submitHandler} className='pl-4 pr-4 pt-3'>
              <Row>
                <Col md={6}>
                  <Form.Group controlId='name'>
                    <Form.Label as='p' className='mb-1'>
                      Họ và tên
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill'
                      type='name'
                      placeholder='Nhập họ và tên'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId='email'>
                    <Form.Label as='p' className='mb-1'>
                      Địa chỉ email
                    </Form.Label>
                    <Form.Control
                      className='border border-grey rounded-pill'
                      type='email'
                      placeholder='Nhập địa chỉ email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Row>
                  <Col md={6}>
                    <p>Ngày sinh</p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify='space-between'>
                        <KeyboardDatePicker
                          className='m-0'
                          margin='normal'
                          id='date-picker-dialog'
                          format='MM/dd/yyyy'
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Col>
                  <Col md={6}>
                    <p>Giới tính:</p>
                    <RadioGroup
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      size='small'
                    >
                      <div className='d-flex justify-content-evenly align-items-center'>
                        <FormControlLabel
                          value='Nam'
                          control={<Radio />}
                          label='Nam'
                        />
                        <FormControlLabel
                          value='Nữ'
                          control={<Radio />}
                          label='Nữ'
                        />
                      </div>
                    </RadioGroup>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId='address'>
                      <Form.Label as='p' className='mb-1'>
                        Thành Phố / Tỉnh
                      </Form.Label>
                      <Form.Control
                        type='text'
                        as='select'
                        placeholder='Enter address'
                        value={thanhPho}
                        onChange={(e) => setThanhPho(e.target.value)}
                        className='border border-gray rounded-pill'
                      >
                        <option>Vui lòng chọn thành phố/tỉnh...</option>
                        {data.map((tp) => (
                          <option
                            style={{ color: 'black' }}
                            key={tp.Id}
                            value={tp.Name}
                          >
                            {tp.Name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId='city'>
                      <Form.Label as='p' className='mb-1'>
                        Quận / Huyện
                      </Form.Label>
                      <Form.Control
                        type='text'
                        as='select'
                        placeholder='Enter city'
                        value={huyen}
                        onChange={(e) => setHuyen(e.target.value)}
                        className='border border-gray rounded-pill'
                      >
                        <option>Vui lòng chọn quận/huyện...</option>
                        {data.map(
                          (a) =>
                            a.Name === thanhPho &&
                            a.Districts.map((b) => (
                              <option
                                key={b.Id}
                                style={{ color: 'black' }}
                                value={b.Name}
                              >
                                {b.Name}
                              </option>
                            ))
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId='postalCode'>
                      <Form.Label as='p' className='mb-1'>
                        Phường / Xã
                      </Form.Label>
                      <Form.Control
                        type='text'
                        as='select'
                        placeholder='Enter postalCode'
                        value={xa}
                        onChange={(e) => setXa(e.target.value)}
                        className='border border-gray rounded-pill'
                      >
                        <option>Vui lòng chọn thành xã/phường...</option>
                        {data.map(
                          (a) =>
                            a.Name === thanhPho &&
                            a.Districts.map(
                              (b) =>
                                b.Name === huyen &&
                                b.Wards.map((c) => (
                                  <option style={{ color: 'black' }}>
                                    {c.Name}
                                  </option>
                                ))
                            )
                        )}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col md={8}>
                  <Form.Group controlId='country'>
                    <Form.Label as='p' className='mb-1'>
                      Địa chỉ chi tiết
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter country'
                      value={diaChi}
                      onChange={(e) => setDiachi(e.target.value)}
                      className='border border-gray rounded-pill'
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId='country'>
                    <Form.Label as='p' className='mb-1'>
                      Số điện thoại
                    </Form.Label>
                    <Form.Control
                      type='string'
                      placeholder='Nhập số điện thoại'
                      value={formatPhoneNumber(numberPhone)}
                      onChange={(e) => setNumberPhone(e.target.value)}
                      className='border border-gray rounded-pill'
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              {/* <Form.Group controlId='image'>
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
              </Form.Group> */}
              <div className='d-flex align-items-center'>
                <Switch
                  value={state}
                  onChange={handleChange}
                  color='secondary'
                  name='checkedB'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                {state === true ? (
                  <p className='mb-0' style={{ opacity: '1' }}>
                    Đổi mật khẩu
                    <Image
                      style={{ opacity: '1' }}
                      src='https://img.icons8.com/fluent/32/000000/unlock-2.png'
                    />
                  </p>
                ) : (
                  <p className='mb-0' style={{ opacity: '0.7' }}>
                    Đổi mật khẩu
                    <Image
                      style={{ opacity: '1' }}
                      src='https://img.icons8.com/fluent/32/000000/lock-2.png'
                    />
                  </p>
                )}
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group controlId='password' fluid>
                    <Form.Label as='p' className='mb-1'>
                      Mật khẩu mới
                    </Form.Label>
                    {state === true ? (
                      <>
                        <Form.Control
                          className='border border-grey rounded-pill '
                          type='password'
                          placeholder='Nhập mật khẩu mới'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                      </>
                    ) : (
                      <Form.Control
                        className='border border-grey rounded-pill '
                        type='password'
                        placeholder='Nhập mật khẩu mới'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled
                        // style={{ visibility: 'hidden' }}
                      ></Form.Control>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='password'>
                    <Form.Label as='p' className='mb-1'>
                      Nhập lại mật khẩu
                    </Form.Label>
                    {state === true ? (
                      <>
                        <Form.Control
                          className='border border-grey rounded-pill'
                          type='password'
                          placeholder='Nhập lại mật khẩu'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                      </>
                    ) : (
                      <Form.Control
                        className='border border-grey rounded-pill'
                        type='password'
                        placeholder='Nhập lại mật khẩu'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled
                        // style={{ visibility: 'hidden' }}
                      ></Form.Control>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className='d-flex justify-content-center'>
                <Button
                  type='submit'
                  variant='outline-light'
                  className='rounded-pill btn_color_created'
                  style={{
                    fontSize: '1rem',
                    letterSpacing: '0.25rem',
                    width: '10rem',
                  }}
                >
                  Lưu
                </Button>
              </div>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProfileScreen
