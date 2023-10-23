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
