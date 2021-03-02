import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: '#57975b',
      main: '#2e7d32',
      dark: '#205723',
      contrastText: '#fff',
    },
    primary: {
      light: '#ea605d',
      main: '#e53935',
      dark: '#a02725',
      contrastText: '#fff',
    },
  },
})

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export default function IconLabelButtons({
  color,
  value,
  size,
  endIcon,
  startIcon,
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
        >
          {value}
        </Button>
      </ThemeProvider>
    </div>
  )
}
