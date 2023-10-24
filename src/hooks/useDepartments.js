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

/**
 * This function is used to delete a Department by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'Department/DeleteDepartment?Id=' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteDepartment = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`Department/DeleteDepartment?Id=${id}`)
  return data
}
