import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { consultOrder, listOrders } from '../../actions/orderActions'
import { listProducts } from '../../actions/productActions'
import { listSupplierAdm } from '../../actions/supplierActions'
import Header from './components/Header'
import SideBar from './components/SideBar'
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   CartesianGrid,
} from 'recharts'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
   },
}))

function format(n, currency) {
   return n?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + currency
}

const AdminScreen = ({ history }) => {
   const classes = useStyles()
   const dispatch = useDispatch()

   const [consult, setConsult] = useState('')

   const productList = useSelector((state) => state.productList)
   const { products } = productList

   const orderConsult = useSelector((state) => state.orderConsult)
   const { order } = orderConsult

   const supplierListAdm = useSelector((state) => state.supplierListAdm)
   const { supplier } = supplierListAdm

   const orderList = useSelector((state) => state.orderList)
   const { orders } = orderList

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   let outOfStock = 0
   let productOut = []
   products.map((product) => {
      if (product.countInStock == 0) {
         productOut.push(product)
         outOfStock += 1
      }
   })

   const handleChange = (event) => {
      setConsult(event.target.value)
      dispatch(consultOrder({ values: event.target.value }))
   }

   console.log('consult', order?.orderFilters)

   const data = order?.orderFilters.map((cn) => ({
      name: cn._id,
      'Số đơn hàng': cn.count,
      'Tổng doanh thu': cn.total,
   }))

   // const data = [
   //    { name: 'Page A', uv: 400 },
   //    { name: 'Page B', uv: 200 },
   //    { name: 'Page C', uv: 100 },
   //    { name: 'Page D', uv: 500 },
   // ]

   useEffect(() => {
      if (!userInfo.isAdmin) {
         history.push('/login')
      }

      if (userInfo) {
         dispatch(listOrders())
         dispatch(listProducts())
         dispatch(listSupplierAdm())
      }
   }, [dispatch, history, userInfo])
   return (
      <>
         <Header />
         <Row style={{ backgroundColor: '#b68973' }}>
            <Col md={2} className='p-0'>
               <SideBar />
            </Col>
            <Col
               md={10}
               className='pl-0 pt-4'
               style={{ backgroundColor: '#fff' }}
            >
               <h3 className='text-center'>Thống kê</h3>
               <div className='d-flex justify-content-end mr-4'>
                  <FormControl
                     className={classes.formControl}
                     style={{ zIndex: '4' }}
                  >
                     <InputLabel id='demo-simple-select-label'>
                        Xem theo:
                     </InputLabel>
                     <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={consult}
                        onChange={handleChange}
                        align='center'
                        type='submit'
                     >
                        <MenuItem value={'day7Ago'}>7 ngày trước</MenuItem>
                        <MenuItem value={'currentWeek'}>Tuần này</MenuItem>
                        <MenuItem value={'monthAgo'}>Tháng trước</MenuItem>
                        <MenuItem value={'currentMonth'}>Tháng này</MenuItem>
                        <MenuItem value={'year'}>Cả năm</MenuItem>
                     </Select>
                  </FormControl>
               </div>
               <BarChart width={1100} height={500} data={data}>
                  <XAxis dataKey='name' stroke='#334443' />
                  <YAxis />
                  <Tooltip
                     wrapperStyle={{ width: 200, backgroundColor: '#ccc' }}
                  />
                  
                  <CartesianGrid
                     stroke='#334443'
                     // strokeDasharray='5 5'
                     type='monotone'
                  />
                  <Bar dataKey={'Tổng doanh thu'} fill='#4e9525' barSize={40} />
                  <Bar dataKey={'Số đơn hàng'} fill='#4e9525' barSize={1} />
               </BarChart>
            </Col>
         </Row>
      </>
   )
}

export default AdminScreen
