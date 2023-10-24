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
export const addOrganizationSensor = async (payload) => {
  const { data } = await axiosInstance.post(`OrganizationSensor/AssignSensor`, payload)
  return data
}
export const EditOrganizationSensor = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`OrganizationSensor/UpdateSensor`, payload.handler)
  return data
}
