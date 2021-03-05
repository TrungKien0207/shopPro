import Link from '@material-ui/core/Link'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const useStyles = makeStyles((theme) => ({
  stepIcon: {
    color: '#3F51B5',
    size: 'large',
  },
}))

export default function HorizontalLinearStepper({
  step1,
  step2,
  step3,
  step4,
}) {
  const classes = useStyles()

  return (
    <div>
      <Stepper
        alternativeLabel
        className='pt-4 pb-4 rounded'
        style={{ backgroundColor: 'rgb(208,208,208,0.4)' }}
      >
        <Step>
          {step1 ? (
            <LinkContainer to='/login'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong>Sign In</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong>Sign In</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step2 ? (
            <LinkContainer to='/shipping'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong>Shipping</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong>Shipping</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step3 ? (
            <LinkContainer to='/payment'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong>Payment</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong>Payment</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
        <Step>
          {step4 ? (
            <LinkContainer to='/placeoreder'>
              <StepLabel
                StepIconProps={{
                  classes: { root: classes.stepIcon },
                }}
              >
                <Link component='button'>
                  <strong>Place Order</strong>
                </Link>
              </StepLabel>
            </LinkContainer>
          ) : (
            <StepLabel>
              <Link disabled component='button'>
                <strong>Place Order</strong>
              </Link>
            </StepLabel>
          )}
        </Step>
      </Stepper>
    </div>
  )
}
