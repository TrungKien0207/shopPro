import axios from 'axios'
import {
   NOTIFICATION_API_ORDER,
   NOTIFICATION_API_ORDER_FAIL,
   NOTIFICATION_API_ORDER_SUCCESS,
   NOTIFICATION_ORDER,
   NOTIFICATION_ORDER_FAIL,
   NOTIFICATION_ORDER_SUCCESS,
} from '../constants/userConstants'
export const getNotifications = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: NOTIFICATION_API_ORDER,
      })

      const {
         userLogin: { userInfo },
      } = getState()

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
         },
      }

      const { data } = await axios.get('/api/notifications', config)

      dispatch({
         type: NOTIFICATION_API_ORDER_SUCCESS,
         payload: data,
      })
   } catch (error) {
      dispatch({
         type: NOTIFICATION_API_ORDER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      })
   }
}

export const notificationsCount = (data) => {
   return {
      type: NOTIFICATION_ORDER,
      payload: data,
   }
}

export const notificationsCountSuccess = (data) => {
   return {
      type: NOTIFICATION_ORDER_SUCCESS,
      payload: { data },
   }
}

export const notificationsCountFail = (error) => {
   return {
      type: NOTIFICATION_ORDER_FAIL,
      payload: { error },
   }
}
