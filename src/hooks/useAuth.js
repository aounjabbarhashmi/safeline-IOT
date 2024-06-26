import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'
// import { useQuery } from 'react-query'
export const loginPost = async (payload) => {
  const { data } = await axiosInstance.post(`Authentication`, {
    email: payload.email,
    password: payload.password,
  })
  return data
}
export const addOrganization = async (payload) => {
  const { data } = await axiosInstance.post(`Organization`, payload)
  return data
}
export const getOrganizationData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`Organization?searchParam=`)
  return data
}

export const getFacilitiesData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(
    `System/GetAllSystemsOfOrganization?organizationId=${id}`,
  )
  return data
}
export const EditOrganization = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`Organization/${payload.editData.id}`, payload.handler)
  return data
}

export const getDepartmentsData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`Department/GetDepartments?systemId=${id}&searchParam=`)
  return data
}

/**
 * This function is used to delete an organization by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'Organization' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteOrganization = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`Organization/${id}`)
  return data
}
