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

/**
 * This function is used to delete an organization sensor by its 'id'.
 * Set the authentication token from local storage.Send a PATCH
 * request to the 'OrganizationSensor/UnassignSensor?id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteOrganizationSensor = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`OrganizationSensor/UnassignSensor?id=${id}`)
  return data
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
