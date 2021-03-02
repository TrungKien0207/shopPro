import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default function HorizontalLinearStepper({
  step1,
  step2,
  step3,
  step4,
}) {
  return (
    <div>
      <Stepper alternativeLabel>
        <Step>
          {step1 ? (
            <LinkContainer to='/login'>
              <StepLabel>
                <Nav.Link>Sign In</Nav.Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Nav.Link disabled>Sign In</Nav.Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step2 ? (
            <LinkContainer to='/login'>
              <StepLabel>
                <Nav.Link>Shipping</Nav.Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Nav.Link disabled>Shipping</Nav.Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step3 ? (
            <LinkContainer to='/login'>
              <StepLabel>
                <Nav.Link>Payment</Nav.Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Nav.Link disabled>Payment</Nav.Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step4 ? (
            <LinkContainer to='/login'>
              <StepLabel>
                <Nav.Link>Place Order</Nav.Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Nav.Link disabled>Place Order</Nav.Link>
            </StepLabel>
          )}
        </Step>
      </Stepper>
    </div>
  )
}
