import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Step from '../components/Step'
import data from '../data.json'

export const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, loading } = cart

  const [thanhPho, setThanhPho] = useState(shippingAddress.thanhPho)
  const [huyen, setHuyen] = useState(shippingAddress.huyen)
  const [xa, setXa] = useState(shippingAddress.xa)
  const [diaChi, setDiachi] = useState(shippingAddress.diaChi)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ thanhPho, huyen, xa, diaChi }))
    history.push('/payment')
  }

  return (
    <>
      <FormContainer>
        <Step step1 step2 />

        <Form
          onSubmit={submitHandler}
          className='rounded bg-light shadow p-4 mt-2 border-0 card_color'
        >
          <h3 className='pt-3 text-center'>Shipping</h3>
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
              {data.map((tp) => (
                <option style={{ color: 'black' }} key={tp.Id} value={tp.Name}>
                  {tp.Name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

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
              Phường / Xã
            </Form.Label>
            <Form.Control
              type='text'
              as='select'
              required
              placeholder='Enter postalCode'
              value={xa}
              onChange={(e) => setXa(e.target.value)}
              className='border border-gray rounded-pill'
            >
              {data.map(
                (a) =>
                  a.Name === thanhPho &&
                  a.Districts.map(
                    (b) =>
                      b.Name === huyen &&
                      b.Wards.map((c) => (
                        <option style={{ color: 'black' }}>{c.Name}</option>
                      ))
                  )
              )}
            </Form.Control>
          </Form.Group>

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

          <div>
            <Button type='submit' className='btn-block btn_color rounded-pill'>
              Continue
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}
