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
export const addDeviceSensor = async (payload) => {
  const { data } = await axiosInstance.post(`SensorSetup/AddSensor`, payload)
  return data
}
export const EditDeviceSensor = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(
    `/SensorSetup/UpdateSensor?Id=${payload.editData.id}`,
    payload.handler,
  )
  return data
}
