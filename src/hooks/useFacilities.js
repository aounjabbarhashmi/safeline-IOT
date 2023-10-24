import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllFacilitiesData = async (dispatch) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`System/GetAllSystems`)
  return data
}

export function useAllFacilitiesData(dispatch) {
  return useQuery(['repos', dispatch], getAllFacilitiesData)
}

/**
 * This function is used to delete a facility by its 'id'.
 * Set the authentication token from local storage.Send a DELETE
 * request to the 'System' endpoint with the specified 'id'.
 * @param {*} id
 * @returns Return the response data
 */
export const deleteFacility = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.delete(`System/${id}`)
  return data
}
