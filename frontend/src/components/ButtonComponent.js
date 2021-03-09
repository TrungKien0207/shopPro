import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import lime from '@material-ui/core/colors/lime'

const theme = createMuiTheme({
  success: {
    main: '#bac778',
  },

  palette: {
    primary: {
      light: '#ea605d',
      main: '#e53935',
      dark: '#a02725',
      contrastText: '#fff',
    },

    secondary: {
      light: '#57975b',
      main: '#2e7d32',
      dark: '#205723',
      contrastText: '#fff',
    },

    success: {
      main: '#bac778',
    },
  },
})

const useStyles = makeStyles((theme) => ({
  button: {
    // margin: theme.spacing(1),
  },
}))

export default function IconLabelButtons({
  color,
  value,
  size,
  endIcon,
  startIcon,
  onClick,
  disabled,
  type,
}) {
  const classes = useStyles()

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          size={size}
          color={color}
          endIcon={endIcon}
          startIcon={startIcon}
          className={classes.button}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {value}
        </Button>
      </ThemeProvider>
    </div>
  )
}
