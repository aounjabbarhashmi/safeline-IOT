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

export const getDepartmentsData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`Department/GetDepartments?systemId=${id}&searchParam=`)
  return data
}
