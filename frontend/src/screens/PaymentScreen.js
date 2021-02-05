import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

export const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('./placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h3>Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              value='PayPal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
              src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fcanhme.com%2Fkien-thuc%2Fhuong-dan-dang-ky-va-xac-thuc-tai-khoan-paypal%2F&psig=AOvVaw3a2E8rn0ouL18ad88RGpJ7&ust=1612627466126000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjI6_GP0-4CFQAAAAAdAAAAABAD'
            ></Form.Check>

            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              value='Stripe'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='danger'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
