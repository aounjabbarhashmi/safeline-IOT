import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'
// export const getAllDepartmentsData = async () => {
//   setAuthenticationToken(localStorage.getItem('token'))
//   const { data } = await axiosInstance.get(`Department/GetAllDepartments`)
//   return data
// }

export const getAllDepartmentsData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`Department/GetAllDepartments`)
  return data
}

export function useAllDepartmentsData() {
  return useQuery(['repos'], getAllDepartmentsData)
}
export const addDepartment = async (payload) => {
  const { data } = await axiosInstance.post(`Department/CreateDepartment`, payload)
  return data
}
export const EditDepartment = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  debugger
  const { data } = await axiosInstance.patch(
    `Department/UpdateDepartment?Id=${payload.editData.id}`,
    payload.handler,
  )
  return data
}
