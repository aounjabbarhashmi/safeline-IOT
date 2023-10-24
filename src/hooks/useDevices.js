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
export const addDevice = async (payload) => {
  const { data } = await axiosInstance.post(`Device/CreateDevice`, payload)
  return data
}
export const EditDevice = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `Device/UpdateDevice?Id=${payload.editData.id}`,
    payload.handler,
  )
  return data
}
