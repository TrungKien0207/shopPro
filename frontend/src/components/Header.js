// import { Menu } from '@material-ui/core'
// import { Link } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { deepOrange } from '@material-ui/core/colors'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import { black } from 'colors'
import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, useHistory } from 'react-router-dom'
import { listCategories } from '../actions/categoryAction'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(1),
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
  const anchorReff = React.useRef(null)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  // const [menu, setMenu] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <a href='https://www.antgroup.com'>1st menu item</a>
      </Menu.Item>
      <Menu.Item key='1'>
        <a href='https://www.aliyun.com'>2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='3'>3rd menu item</Menu.Item>
    </Menu>
  )

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const categoriesList = useSelector((state) => state.categoriesList)
  const { loading, success, category } = categoriesList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    firebase.auth().signOut()
    dispatch(logout())
    history.push('/')
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
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    dispatch(listCategories())

    prevOpen.current = open
  }, [open, userInfo, user])

  return (
    <>
      <Navbar
        expand='lg'
        collapseOnSelect
        className='p-0 pl-5 pr-5 m-0'
        style={{ backgroundColor: '#edfead' }}
      >
        <Container fluid>
          <LinkContainer to='/' className=''>
            <Navbar.Brand className='text-uppercase font-weight-bold flex-grow-1'>
              <h2>ProShop</h2>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Route render={({ history }) => <SearchBox history={history} />} />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto' inline>
              <LinkContainer to='/cart'>
                <Nav.Link className='text-uppercase'>
                  <IconButton aria-label='cart'>
                    <StyledBadge
                      badgeContent={cartItems.length}
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
                    className='ml-2  mt-1 mb-1 rounded-circle'
                  >
                    {userInfo ? (
                      <Image
                        className='rounded-circle border border-grey'
                        src={user.avatar}
                        alt={userDetails.user?.avatar}
                        style={{ width: '2.5rem', height: '2.5rem' }}
                        fluid
                      />
                    ) : (
                      <Avatar className={classes.orange}>
                        {userInfo.name.substring(0, 1)}
                      </Avatar>
                    )}
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

                              <MenuItem onClick={handleClose}>
                                <Link
                                  href='/myorders'
                                  className={classes.link}
                                  style={{
                                    color: 'black',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.05rem',
                                  }}
                                >
                                  <Image
                                    src='https://img.icons8.com/fluent/24/000000/receipt-dollar.png'
                                    className='pr-1'
                                  />
                                  <strong>MY ORDERS</strong>
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
                                <Link
                                  href='/'
                                  className={classes.link}
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
                                </Link>
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
                    className='ml-2 mt-1 mb-1 rounded-circle'
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
                    className='pt-1 navbar-right text-start'
                    style={{ fontSize: '0.865625rem', zIndex: '2' }}
                    alignRight
                    variant='light'
                    pullRight
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
                      <LinkContainer to='/admin/categorieslist'>
                        <NavDropdown.Item>
                          <Image
                            className='pr-1'
                            src='https://img.icons8.com/fluent/24/000000/category.png'
                          />
                          <strong>CATEGORIES</strong>
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
      <Navbar
        expand='lg'
        collapseOnSelect
        className='p-0 pl-5 pr-5'
        style={{ backgroundColor: '#edfead' }}
        variant='tabs'
      >
        {/* <Row>
          <Col md={12} className='pl-5'> */}
        {/* <div className='d-flex justify-content-around'>
            {category &&
              category.map((cat) => (
                <div className='container_link_color'>
                  <Dropdown overlay={menu}>
                    <Link
                      href='/product'
                      className='ant-dropdown-link text-decoration-none link_color'
                      onClick={(e) => e.preventDefault()}
                      style={{ fontSize: '1rem' }}
                    >
                      {cat.name}
                      <DownOutlined
                        className='pl-1'
                        style={{ fontSize: '0.5rem' }}
                      />
                    </Link>
                  </Dropdown>
                </div>
              ))}
          </div> */}
        <div class='collapse navbar-collapse pl-2 pr-2' id='main_nav'>
          <ul className='navbar-nav'>
            <li class='nav-item active' style={{ fontSize: '0.85rem' }}>
              <Link className='nav-link' to='/'>
                Trang chủ
              </Link>
            </li>

            <li class='nav-item active' style={{ fontSize: '0.85rem' }}>
              <Link className='nav-link' href='/'>
                Giới thiệu
              </Link>
            </li>
            <li
              className='nav-item dropdown has-megamenu'
              style={{ fontSize: '0.85rem' }}
            >
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                data-bs-toggle='dropdown'
              >
                Danh mục
              </Link>
              <div
                className='dropdown-menu megamenu border border-secondary shadow'
                style={{ borderRadius: '2rem' }}
                role='menu'
              >
                <div className='row g-6' style={{ width: '70rem' }}>
                  {category &&
                    category.map((cat) => (
                      <div className='col-lg-2 col-8 text-center pt-2 pb-2'>
                        <div className='col-megamenu container_link_color'>
                          <LinkContainer
                            to={`/product/${cat._id}/category`}
                            className='link_color'
                          >
                            <h6
                              className='title'
                              style={{ fontSize: '0.85rem' }}
                            >
                              {cat.name}
                            </h6>
                          </LinkContainer>
                          <ul className='list-unstyled'>
                            <li>
                              <a href='#'>Custom Menu</a>
                            </li>
                            <li>
                              <a href='#'>Custom Menu</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </li>

            <li class='nav-item active' style={{ fontSize: '0.85rem' }}>
              <Link className='nav-link' href='/'>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
        {/* </Col>
        </Row> */}
      </Navbar>
    </>
  )
}

export default Header
