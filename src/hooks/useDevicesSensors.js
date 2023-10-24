import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllDevicesSensorsData = async (id) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`SensorSetup/GetSensors?deviceId=${id}&searchParam=`)
  return data
}

// export function useAllDevicesSensorsData(id) {
//   return useQuery(['repos', id], getAllDevicesSensorsData)
// }
