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

export const addFacility = async (payload) => {
  const { data } = await axiosInstance.post(`System/CreateNewSystem`, payload)
  return data
}
