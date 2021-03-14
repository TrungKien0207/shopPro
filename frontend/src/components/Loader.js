import { useState } from 'react'
import { css } from '@emotion/core'
import RotateLoader from 'react-spinners/RotateLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

function Loader() {
  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState('orange')

  return (
    <div className='sweet-loading text-center'>
      <RotateLoader color={color} loading={loading} css={override} size={15} />
    </div>
  )
}

export default Loader
