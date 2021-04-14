import { BookOutlined, DollarOutlined } from '@ant-design/icons'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../actions/categoryAction'

const { SubMenu } = Menu

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

const useStyles = makeStyles({
  root: {
    width: 300,
  },
})

function valuetext(value) {
  return `${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement='top'
      title={value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    >
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

const FilterNav = () => {
  const [openKeys, setOpenKeys] = React.useState(['sub1'])

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const classes = useStyles()
  const [value, setValue] = React.useState([0, 5000000])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const categoriesList = useSelector((state) => state.categoriesList)
  const { loading, success, category } = categoriesList

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  return (
    <div className='m-3 mb-0'>
      <p>money {value}</p>
      <div>
        <p className='mb-2 justify-content-center d-flex align-items-center'>
          <DollarOutlined className='pr-2' />
          Lọc theo giá
        </p>
        <Slider
          value={value}
          onChange={handleChange}
          ValueLabelComponent={ValueLabelComponent}
          aria-labelledby='range-slider'
          getAriaValueText={valuetext}
          min={0}
          step={50000}
          max={5000000}
        />
      </div>
      <div>
        <Menu
          mode='inline'
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 270 }}
          className='border-0'
        >
          <SubMenu
            key='sub1'
            icon={<BookOutlined />}
            title='Tìm kiếm theo danh mục'
          >
            {category &&
              category.map((cat, key) => (
                <Menu.Item key={key}>{cat.name}</Menu.Item>
              ))}
          </SubMenu>
        </Menu>
      </div>
      <div>
        <Menu
          mode='inline'
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ width: 270 }}
          className='border-0'
        >
          <SubMenu
            key='sub1'
            icon={<BookOutlined />}
            title='Tìm kiếm theo danh mục'
          >
            {category &&
              category.map((cat, key) => (
                <Menu.Item key={key}>{cat.name}</Menu.Item>
              ))}
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default FilterNav
