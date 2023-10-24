import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDevicesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`Device/GetAllDevices`)
  return data
}
export function useAllDevicesData() {
  return useQuery(['repos'], getAllDevicesData)
}

/**
 * This function is used to delete a Device by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'Device/DeleteDevice?Id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteDevice = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`Device/DeleteDevice?Id=${id}`)
  return data
}
