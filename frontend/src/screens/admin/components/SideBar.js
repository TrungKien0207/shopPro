import React, { useEffect, useState } from 'react'
import { Menu, Button } from 'antd'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { Link } from '@material-ui/core'
import { useLocation } from 'react-router-dom'

const { SubMenu } = Menu

const SideBar = () => {
  const location = useLocation()

  const [state, setState] = useState(false)
  const [selectedKey, setSelectedKey] = useState('/')

  useEffect(() => {
    let path = location.pathname
    if (path === '/') {
      path = '/home'
    }
    setSelectedKey(path)
  }, [location])

  const toggleCollapsed = () => {
    setState(!state)
  }

  console.log(selectedKey)

  return (
    <>
      <div>
        <Button
          type='primary'
          onClick={toggleCollapsed}
          // style={{ marginBottom: 16 }}
        >
          {React.createElement(state ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          // defaultSelectedKeys={selectedKey}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          mode='inline'
          theme='dark'
          inlineCollapsed={state}
          selectedKeys={selectedKey}
          style={{ height: '100vh', backgroundColor: '#b68973' }}
        >
          <Menu.Item key='/admin' icon={<PieChartOutlined />}>
            <Link href='/admin' className='text-decoration-none '>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key='/admin/userlist' icon={<DesktopOutlined />}>
            <Link href='/admin/userlist' className='text-decoration-none'>
              Người dùng
            </Link>
          </Menu.Item>
          <Menu.Item key='/admin/categorieslist' icon={<ContainerOutlined />}>
            <Link href='/admin/categorieslist' className='text-decoration-none'>
              Danh mục
            </Link>
          </Menu.Item>
          <Menu.Item key='/admin/supplierlist' icon={<ContainerOutlined />}>
            <Link href='/admin/supplierlist' className='text-decoration-none'>
              Nhà cung cấp
            </Link>
          </Menu.Item>
          <Menu.Item key='/admin/orderlist' icon={<ContainerOutlined />}>
            <Link href='/admin/orderlist' className='text-decoration-none'>
              Đơn hàng
            </Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<MailOutlined />} title='Sản phẩm'>
            <Menu.Item
              key='/admin/productlist'
              className='m-0 pb-2'
              style={{ backgroundColor: '#587B7F' }}
            >
              <Link href='/admin/productlist' className='text-decoration-none'>
                Danh sách
              </Link>
            </Menu.Item>
            <Menu.Item
              key='/admin/product/create'
              className='m-0  pb-4'
              style={{ backgroundColor: '#587B7F' }}
            >
              <Link
                href='/admin/product/create'
                className='text-decoration-none'
              >
                Thêm
              </Link>
            </Menu.Item>
          </SubMenu>
          {/* <SubMenu
            key='sub2'
            icon={<AppstoreOutlined />}
            title='Navigation Two'
          >
            <Menu.Item key='9'>Option 9</Menu.Item>
            <Menu.Item key='10'>Option 10</Menu.Item>
            <SubMenu key='sub3' title='Submenu'>
              <Menu.Item key='11'>Option 11</Menu.Item>
              <Menu.Item key='12'>Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
        </Menu>
      </div>
    </>
  )
}

export default SideBar
