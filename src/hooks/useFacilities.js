import { useQuery } from 'react-query'
import { setAuthenticationToken } from './auth'
import { axiosInstance } from './axios'

export const getAllFacilitiesData = async () => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.get(`System/GetAllSystems`)
  return data
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
export const addFacility = async (payload) => {
  const { data } = await axiosInstance.post(`System/CreateNewSystem`, {
    systemType: payload.systemType,
    systemName: payload.systemName,
    organizationId: payload.organizationId,
    contactEmail: payload.contactEmail,
    contactNumber: payload.contactNumber,
    siteManager: payload.siteManager,
    timezone: payload.timezone,
    currency: payload.currency,
    address: payload.address,
    street: payload.street,
    city: payload.city,
    postcode: +payload.postCode,
    latitude: +payload.latitude,
    longitude: +payload.longitude,
  })
  return data
}
export const EditFacility = async (payload) => {
  setAuthenticationToken(localStorage.getItem('token'))
  const { data } = await axiosInstance.patch(`System/${payload.editData.id}`, {
    systemType: payload.handler.systemType,
    systemName: payload.handler.systemName,
    organizationId: payload.handler.organizationId,
    contactEmail: payload.handler.contactEmail,
    contactNumber: payload.handler.contactNumber,
    siteManager: payload.handler.siteManager,
    timezone: payload.handler.timeZone,
    currency: payload.handler.currency,
    address: payload.handler.address,
    street: payload.handler.street,
    city: payload.handler.city,
    postcode: +payload.handler.postCode,
    latitude: +payload.handler.latitude,
    longitude: +payload.handler.longitude,
  })
  return data
}
