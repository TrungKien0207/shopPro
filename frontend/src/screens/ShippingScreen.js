import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import { getUserDetails } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import SkeletonEffect from '../components/SkeletonEffect'
import Step from '../components/Step'
import data from '../data.json'

export const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, loading } = cart

  const userDetails = useSelector((state) => state.userDetails)
  const { loading: loadingUserDetail, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [thanhPho, setThanhPho] = useState(shippingAddress.thanhPho)
  const [huyen, setHuyen] = useState(shippingAddress.huyen)
  const [xa, setXa] = useState(shippingAddress.xa)
  const [diaChi, setDiachi] = useState(shippingAddress.diaChi)
  const [numberPhone, setNumberPhone] = useState(shippingAddress.numberPhone)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ thanhPho, huyen, xa, diaChi, numberPhone }))
    history.push('/payment')
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setThanhPho(user.address.thanhPho)
        setHuyen(user.address.huyen)
        setXa(user.address.xa)
        setDiachi(user.address.diaChi)
        setNumberPhone(user.numberPhone)
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <>
      {loadingUserDetail ? (
        <SkeletonEffect />
      ) : (
        <Row className='shadow p-2 card_color '>
          <Col md={7} className='d-flex align-items-center'>
            <Image src='/background/shipping.jpg' fluid />
          </Col>
          <Col md={5} className='mt-2 pr-4'>
            <div>
              <Step step1 step2 />

              <Form onSubmit={submitHandler} className='mt-2 border-0 mb-2'>
                <h3 className='pt-3 text-center'>Thông tin Vận chuyển</h3>
                <Form.Group controlId='address'>
                  <Form.Label as='p' className='mb-1 mt-2'>
                    <strong>Thành Phố / Tỉnh</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    as='select'
                    placeholder='Enter address'
                    value={thanhPho}
                    onChange={(e) => setThanhPho(e.target.value)}
                    className='border-1 border-gray rounded-pill'
                  >
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

                <Form.Group controlId='city'>
                  <Form.Label as='p' className='mb-1'>
                    <strong> Quận / Huyện</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    as='select'
                    placeholder='Enter city'
                    value={huyen}
                    onChange={(e) => setHuyen(e.target.value)}
                    className='border-1 border-gray rounded-pill'
                  >
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

                <Form.Group controlId='postalCode'>
                  <Form.Label as='p' className='mb-1'>
                    <strong>Phường / Xã</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    as='select'
                    required
                    placeholder='Enter postalCode'
                    value={xa}
                    onChange={(e) => setXa(e.target.value)}
                    className='border-1 border-gray rounded-pill'
                  >
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

                <Form.Group controlId='country'>
                  <Form.Label as='p' className='mb-1'>
                    <strong>Địa chỉ chi tiết</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={diaChi}
                    onChange={(e) => setDiachi(e.target.value)}
                    className='border-1 border-gray rounded-pill'
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                  <Form.Label as='p' className='mb-1'>
                    <strong>Số điện thoại</strong>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                    className='border-1 border-gray rounded-pill'
                  ></Form.Control>
                </Form.Group>

                <div>
                  <Button
                    type='submit'
                    className='btn-block btn_color rounded-pill'
                  >
                    Tiếp tục
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}
