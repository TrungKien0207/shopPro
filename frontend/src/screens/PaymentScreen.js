import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import Step from '../components/Step'

export const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('./placeorder')
  }

  return (
    <FormContainer>
      <Step step1 step2 step3 />
      <Form
        onSubmit={submitHandler}
        className='rounded bg-light shadow p-4 mt-2 text-center'
      >
        <h3 className='pt-3 '>Payment Method</h3>
        <Form.Group>
          <Form.Label as='legend'>
            <h5>Select Method</h5>
          </Form.Label>
          <Col md={6}>
            <div>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value='PayPal'
                  control={<Radio />}
                  label='PayPal or Credit Card'
                />
                <FormControlLabel
                  value='Stripe'
                  control={<Radio />}
                  label='Stripe'
                />
              </RadioGroup>
            </div>
          </Col>
        </Form.Group>

        <Button type='submit' variant='danger' className='btn-block'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
