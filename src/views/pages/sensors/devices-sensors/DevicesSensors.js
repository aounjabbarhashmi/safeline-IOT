import { CButton, CCard, CCol, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDevicesData } from 'src/hooks/useDevices'
import {
  getAllDevicesSensorsData,
  useAllDevicesSensorsData,
  deleteDeviceSensor,
} from 'src/hooks/useDevicesSensors'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'sensorName', label: 'Sensor Name' },
  { key: 'department.name', label: 'Department Name' },
  { key: 'device.name', label: 'Device Name' },
]
const DevicesSensors = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: deviceData, data, isSuccess, isError } = useMutation(getAllDevicesSensorsData)
  const { data: allDevices } = useAllDevicesData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const [deviceId, setDeviceId] = useState('')

  const deleteDeviceSensorById = useMutation(deleteDeviceSensor)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  function getAllDataOfDeviceSensors(myDeviceId) {
    deviceData(myDeviceId, {
      onSuccess: () => {},
      onError: () => {},
    })
  }

  /**
   * Deletes a Device sensor by its ID.
   * @param {number} deviceSensorId - The ID of the Device sensor to be deleted.
   */
  const deleteDeviceSensors = (deviceSensorId) => {
    showLoader()
    deleteDeviceSensorById.mutate(deviceSensorId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Device Sensor deleted Successfully',
        }))
        hideLoader()
        getAllDataOfDeviceSensors(deviceId)
      },
      onError: (error) => {
        setShowToast(() => ({
          show: true,
          title: 'Error',
          content: error.response.data,
        }))
        hideLoader()
      },
    })
    hideLoader()
  }
  function handleDeviceChange(e) {
    setDeviceId(e.target.value)
    getAllDataOfDeviceSensors(e.target.value)
  }

  return (
    <>
      <GenericModal
        title="Add Devices"
        content="This is the modal content."
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className="p-4">
        <CRow>
          <CCol md={6}>
            <h3 className="pb-2">Device Sensors</h3>
          </CCol>
          <CCol md={3} className="float-end">
            <CFormSelect
              size="sm"
              className=""
              aria-label="Department"
              onChange={handleDeviceChange}
              value={deviceId}
            >
              <option>Select Device</option>
              {allDevices?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Devices Sensor
            </CButton>
          </CCol>
        </CRow>
        {/* {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />} */}
        <GenericTable columns={columns} data={data?.result} OnDeleteItem={deleteDeviceSensors} />
      </CCard>
    </>
  )
}

export default DevicesSensors
