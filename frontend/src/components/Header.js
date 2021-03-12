import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { deepOrange } from '@material-ui/core/colors'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { black } from 'colors'
import React from 'react'
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Dropdown,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    zIndex: '7 !important',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  link: {
    color: black,
    '&:hover': {
      color: '#002984',
      textDecoration: 'none',
    },
    '&:active': {
      color: '#002984',
      textDecoration: 'none',
    },
    '&:visited': {
      color: '#002984',
      textDecoration: 'none',
    },
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge)

function Header(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Navbar
        bg='light'
        variant='light'
        expand='lg'
        collapseOnSelect
        className='p-0 pl-5 pr-4'
      >
        <Container fluid>
          <LinkContainer to='/' className=''>
            <Navbar.Brand className='text-uppercase font-weight-bold flex-grow-1'>
              <h2>ProShop</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto' inline>
              <LinkContainer to='/cart'>
                <Nav.Link className='text-uppercase'>
                  <IconButton aria-label='cart'>
                    <StyledBadge
                      badgeContent={cartItems.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}
                      color='secondary'
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup='true'
                    onClick={handleToggle}
                    className='ml-2 mr-2 mt-1 mb-1 rounded-circle'
                  >
                    <Avatar className={classes.orange}>
                      {userInfo.name.substring(0, 1)}
                    </Avatar>
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{ zIndex: '2' }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id='menu-list-grow'
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleClose}>
                                <Link
                                  href='/profile'
                                  className={classes.link}
                                  style={{
                                    color: 'black',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.05rem',
                                  }}
                                >
                                  <Image
                                    src='https://img.icons8.com/fluent/24/000000/user-male-circle.png'
                                    className='pr-1'
                                  />
                                  <strong>PROFILE</strong>
                                </Link>
                              </MenuItem>

                              <MenuItem
                                onClick={logoutHandler}
                                style={{
                                  color: 'black',
                                  fontSize: '0.8rem',
                                  letterSpacing: '0.05rem',
                                }}
                              >
                                <Image
                                  className='pr-1'
                                  src='https://img.icons8.com/fluent/24/000000/exit.png'
                                />
                                <strong>LOG OUT</strong>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup='true'
                    onClick={handleToggle}
                    className='ml-2 mr-2 mt-1 mb-1 rounded-circle'
                  >
                    <Image src='https://img.icons8.com/fluent/30/000000/circled-menu.png' />
                  </Button>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    style={{ zIndex: '2' }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id='menu-list-grow'
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem
                                onClick={handleClose}
                                style={{
                                  color: 'black',
                                  fontSize: '0.8rem',
                                  letterSpacing: '0.05rem',
                                }}
                              >
                                <Link href='/login' className={classes.link}>
                                  <Image
                                    className='pr-1'
                                    src='https://img.icons8.com/fluent/24/000000/key.png'
                                  />
                                  <strong>SIGN IN</strong>
                                </Link>
                              </MenuItem>
                              <MenuItem
                                onClick={handleClose}
                                style={{
                                  color: 'black',
                                  fontSize: '0.8rem',
                                  letterSpacing: '0.05rem',
                                }}
                              >
                                <Link href='/register' className={classes.link}>
                                  <Image
                                    className='pr-1'
                                    src='https://img.icons8.com/fluent/24/000000/new-contact.png'
                                  />
                                  <strong>SIGN UP</strong>
                                </Link>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <>
                  <NavDropdown
                    title={
                      <Image src='https://img.icons8.com/fluent/38/000000/favorites-shield.png' />
                    }
                    id='nav-dropdown'
                    className='pt-1 navbar-right'
                    style={{ fontSize: '0.865625rem', zIndex: '2' }}
                    alignRight
                    variant='light'
                  >
                    <div>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>
                          <Image
                            className='pr-1'
                            src='https://img.icons8.com/fluent/24/000000/user-menu-male.png'
                          />
                          <strong>USER</strong>
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>
                          <Image
                            className='pr-1'
                            src='https://img.icons8.com/fluent/24/000000/box-settings-1.png'
                          />
                          <strong>PRODUCTS</strong>
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>
                          <Image
                            className='pr-1'
                            src='https://img.icons8.com/fluent/24/000000/purchase-order.png'
                          />
                          <strong>ORDERS</strong>
                        </NavDropdown.Item>
                      </LinkContainer>
                    </div>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
