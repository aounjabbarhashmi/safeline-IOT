import { CButton, CCard, CCol, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDevicesData } from 'src/hooks/useDevices'
import { getAllDevicesSensorsData, useAllDevicesSensorsData } from 'src/hooks/useDevicesSensors'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'sensorName', label: 'Sensor Name' },
  { key: 'department.name', label: 'Department Name' },
  { key: 'device.name', label: 'Device Name' },
]
const DevicesSensors = () => {
  const { mutate: deviceData, data, isSuccess, isError } = useMutation(getAllDevicesSensorsData)
  const { data: allDevices } = useAllDevicesData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  function handleDeviceChange(e) {
    setDeviceId(e.target.value)
    deviceData(e.target.value, {
      onSuccess: () => {},
      onError: () => {},
    })
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
        <GenericTable columns={columns} data={data?.result} />
      </CCard>
    </>
  )
}

export default DevicesSensors
