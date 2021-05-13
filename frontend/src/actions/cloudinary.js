import axios from 'axios'

export const uploadFileImages = (data) => {
   return axios.post('/api/uploadImages', data)
}

export const deleteFileImages = (data) => {
   return axios.post('/api/uploadImages', data)
}
