import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

CheckoutSteps.propTypes = {}

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className='mb-2 w-step'>
      <Nav.Item className='bg-dark bg-step'>
        {step1 ? (
          <LinkContainer to='/login' className='bg-info'>
            <Nav.Link className='link-green'>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step2 ? (
          <LinkContainer to='/shipping' className='bg-info'>
            <Nav.Link className='link-green'>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step3 ? (
          <LinkContainer to='/payment' className='bg-info'>
            <Nav.Link className='link-green'>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='link-green'>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className='bg-dark bg-step-2'>
        {step4 ? (
          <LinkContainer to='/placeorder' className='bg-info'>
            <Nav.Link className='link-green'>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className='link-green'>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
