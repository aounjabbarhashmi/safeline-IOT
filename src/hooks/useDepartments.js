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
