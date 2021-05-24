// import { Menu } from '@material-ui/core'
// import { Link } from '@material-ui/core'
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
import NotificationsIcon from '@material-ui/icons/Notifications'
import { Menu } from 'antd'
import 'antd/dist/antd.css'
import { black } from 'colors'
import firebase from 'firebase'
import React, { useEffect, useState, useCallback } from 'react'
import { Container, Image, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { listCategories } from '../../../actions/categoryAction'
import { BellOutlined } from '@ant-design/icons'
import {
   getNotifications,
   notificationsCount,
} from '../../../actions/notificationsAction'
import { logout } from '../../../actions/userActions'
import OpenSocket from 'socket.io-client'
import NotificationsDropDown from './NotificationsDropDown'

const StyledMenu = withStyles({
   paper: {
      border: '1px solid #d3d4d5',
   },
})((props) => (
   <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
         vertical: 'top',
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

   const [loadingNotifications, setLoadingNotifications] = useState(false)
   const [notifications, setNotifications] = useState([])
   const [hasFirstFetch, setHasFirstFetch] = useState(false)
   const [visibleNoti, setVisibleNoti] = useState(false)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const userDetails = useSelector((state) => state.userDetails)
   const { user } = userDetails

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const dispatch = useDispatch()

   const notificationsAdm = useSelector((state) => state.notificationsAdm)
   const { notificationCount, userData } = notificationsAdm

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

   const openNotification = useCallback(
      (type, data) => {
         let action = 'đã thanh toán thành công đơn hàng.'
         // let description = `"${data.content}..."`
         let url

         switch (type) {
            case 'create order':
               action = `đã thanh toán thành công đơn hàng #${data.content?.paymentIntent.id}.`
               // description = `"${data.content}..."`
               url = `/order/${data.orderId}`
               break

            default:
               break
         }

         if (data) {
            notifications.open({
               message: (
                  <span>
                     <strong>{data.user.name}</strong> đã {action}
                  </span>
               ),
               // description,
               placement: 'bottomLeft',
               icon: <Avatar alt='avatar user' src={data.user.avatar} />,
               duration: 10,
               key: Math.random(),
               closeIcon: null,
               style: {
                  borderRadius: 5,
                  boxShadow: '0 0 20px #ccc',
                  cursor: 'pointer',
               },
               onClick() {
                  props.history.push(url)
               },
            })
         }
      },
      [props]
   )

   useEffect(() => {
      if (prevOpen.current === true && open === false) {
         anchorRef.current.focus()
      }

      dispatch(listCategories())
      dispatch(getNotifications())

      prevOpen.current = open

      const socket = OpenSocket('http://localhost:5000')
      console.log(socket)
      socket.on('create order', (orderUser) => {
         console.log('orderUser', orderUser)

         openNotification('create order', orderUser)
         dispatch(
            notificationsCount({
               count: notificationCount + 1,
            })
         )
      })

      console.log('notificationCount', notificationCount)

      return () => {
         socket.emit('logout')
      }
   }, [open, userInfo, user, notificationCount])

   const openNotificationsDropdown = () => {
      // Nếu có notifications mới hoặc chưa fetch lần nào thì sẽ fetch notifications
      if (!visibleNoti) {
         if (userData.notifications.newNotifications || !hasFirstFetch) {
            setLoadingNotifications(true)
            setNotifications([])
            getNotifications()
               .then((res) => {
                  setHasFirstFetch(true)
                  setNotifications(res.data.notifications.reverse())
                  dispatch(notificationsCount({ count: 0 }))
               })
               .catch((err) => {
                  console.log(err)
               })
               .finally(() => {
                  setLoadingNotifications(false)
               })
         }
      }
      setVisibleNoti((pre) => !pre)
   }

   const markAsReadHandler = (index, url) => {
      props.history.push(url)

      if (notifications[index].hasRead) return

      let notifyId
      setNotifications((notifications) => {
         const newNotifications = [...notifications]
         newNotifications[index].hasRead = true
         notifyId = newNotifications[index]._id
         return newNotifications
      })

      const token = localStorage.getItem('token')
   }

   return (
      <>
         <Navbar
            expand='lg'
            collapseOnSelect
            className='p-0 pl-5 pr-5 m-0 shadow'
            style={{ backgroundColor: '#edfead', height: '4rem' }}
         >
            <Container fluid>
               <LinkContainer to='/'>
                  <Navbar.Brand className='text-uppercase font-weight-bold flex-grow-1 '>
                     <Image
                        src='/logo/logo_white.png'
                        style={{ width: '5rem', height: '4rem', zIndex: '0' }}
                     />
                  </Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />

               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto' inline>
                     <LinkContainer to='#'>
                        <Nav.Link className='text-uppercase'>
                           <IconButton aria-label='cart'>
                              <Badge
                                 badgeContent={1}
                                 color='secondary'
                                 // variant='dot'
                              >
                                 <NotificationsIcon
                                    style={{ fontSize: '1.7rem' }}
                                 />
                              </Badge>
                           </IconButton>
                        </Nav.Link>
                     </LinkContainer>
                     {/* <div className='user-group desktop-screen'>
                        <div className='notify-btn'>
                           <Button
                              type='link'
                              size='large'
                              onClick={openNotificationsDropdown}
                           >
                              <Badge count={notificationsCount}>
                                 <BellOutlined
                                    className='notify-button'
                                    style={{ color: '#888', fontSize: '24px' }}
                                 />
                              </Badge>
                           </Button>
                           {visibleNoti && (
                              <NotificationsDropDown
                                 desktopSize
                                 loading={loadingNotifications}
                                 notifications={notifications}
                                 setVisibleNoti={setVisibleNoti}
                                 markAsReadHandler={markAsReadHandler}
                                 className='notifications-dropdown'
                                 header={
                                    <span className='px-4 font-semibold'>
                                       Thông báo đơn hàng
                                    </span>
                                 }
                                 footer={
                                    <Link to='/thong-bao'>
                                       Tất cả thông báo
                                    </Link>
                                 }
                              />
                           )}
                        </div>
                     </div> */}

                     {userInfo ? (
                        <>
                           <Button
                              ref={anchorRef}
                              aria-controls={
                                 open ? 'menu-list-grow' : undefined
                              }
                              aria-haspopup='true'
                              onClick={handleToggle}
                              className='ml-2  mt-1 mb-1 rounded-circle'
                           >
                              {userInfo ? (
                                 <Image
                                    className='rounded-circle border border-grey'
                                    src={userDetails.user.avatar?.url}
                                    alt={
                                       userDetails.user && userDetails.user.name
                                    }
                                    style={{
                                       width: '2.5rem',
                                       height: '2.5rem',
                                    }}
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
                              style={{ zIndex: '5' }}
                           >
                              {({ TransitionProps, placement }) => (
                                 <Grow {...TransitionProps}>
                                    <Paper>
                                       <ClickAwayListener
                                          onClickAway={handleClose}
                                       >
                                          <MenuList
                                             autoFocusItem={open}
                                             id='menu-list-grow'
                                             onKeyDown={handleListKeyDown}
                                          >
                                             <MenuItem onClick={handleClose}>
                                                <Link
                                                   to='/profile'
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
                                                   <strong className='text-capitalize'>
                                                      Hồ sơ
                                                   </strong>
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
                                                   to='/'
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
                                                   <strong className='text-capitalize'>
                                                      Đăng Xuất
                                                   </strong>
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
                              aria-controls={
                                 open ? 'menu-list-grow' : undefined
                              }
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
                                       <ClickAwayListener
                                          onClickAway={handleClose}
                                       >
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
                                                <Link
                                                   to='/login'
                                                   className={classes.link}
                                                >
                                                   <Image
                                                      className='pr-1'
                                                      src='https://img.icons8.com/fluent/24/000000/key.png'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đăng Nhập
                                                   </strong>
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
                                                <Link
                                                   to='/register'
                                                   className={classes.link}
                                                >
                                                   <Image
                                                      className='pr-1'
                                                      src='https://img.icons8.com/fluent/24/000000/new-contact.png'
                                                   />
                                                   <strong className='text-capitalize'>
                                                      Đăng Kí
                                                   </strong>
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
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   )
}

export default Header
