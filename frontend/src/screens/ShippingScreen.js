import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Step from '../components/Step'
import FormContainer from '../components/FormContainer'

export const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, loading } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('./payment')
  }

  return (
    <>
      {/* <Container className='pl-5 pr-5 mb-2 '>
        <Step step1 step2 className='p-5' />
      </Container> */}
      <FormContainer>
        <Step step1 step2 />

        <Form
          onSubmit={submitHandler}
          className='rounded bg-light shadow p-4 mt-2 border-0'
        >
          <h3 className='pt-3 text-center'>Shipping</h3>
          <Form.Group controlId='address'>
            <Form.Label as='p' className='mb-1'>
              Address
            </Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='border border-gray rounded-pill'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label as='p' className='mb-1'>
              City
            </Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='border border-gray rounded-pill'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label as='p' className='mb-1'>
              PostalCode
            </Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter postalCode'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className='border border-gray rounded-pill'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label as='p' className='mb-1'>
              Country
            </Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
