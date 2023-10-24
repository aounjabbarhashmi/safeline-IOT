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
  const { data } = await axiosInstance.post(`System/CreateNewSystem`, payload)
  return data
}
export const EditOrganizationSensor = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`System/${payload.editData.id}`, payload.handler)
  return data
}
