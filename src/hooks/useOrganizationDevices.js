import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllOrgDevicesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`OrganizationSensor/GetAssignedSensors`)
  return data
}

export function useAllOrgDevicesData() {
  return useQuery(['repos'], getAllOrgDevicesData)
}
