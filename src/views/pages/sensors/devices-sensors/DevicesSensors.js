import { CButton, CCard, CCol, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDevicesData } from 'src/hooks/useDevices'
import { addDeviceSensor, EditDeviceSensor } from 'src/hooks/useDevicesSensors'
import { getAllDevicesSensorsData, useAllDevicesSensorsData } from 'src/hooks/useDevicesSensors'
import AddDeviceSensor from 'src/views/forms/add-device-sensors/add-device-sensor'
import GenericTable from 'src/views/table/GenericTable'

const columns = [
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'sensorName', label: 'Sensor Name' },
  { key: 'department.name', label: 'Department Name' },
  { key: 'device.name', label: 'Device Name' },
]
const DevicesSensors = () => {
  const { mutate: deviceData, data, isSuccess, isError } = useMutation(getAllDevicesSensorsData)
  const { mutate: DeviceSensorAdd } = useMutation(addDeviceSensor)
  const { mutate: DeviceSensorEdit } = useMutation(EditDeviceSensor)
  const { data: allDevices } = useAllDevicesData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast } = useGlobalInfo()
  const [deviceId, setDeviceId] = useState('')
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const openEditModal = (data) => {
    console.log(data)
    setIsAddMode(false)
    setEditData(data)
    setIsModalOpen(true)
  }
  function handleDeviceChange(e) {
    setDeviceId(e.target.value)
    deviceData(e.target.value, {
      onSuccess: () => {},
      onError: () => {},
    })
  }
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        DeviceSensorAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Device Created Successfully',
            }))
            // organizationData('', {
            //   onSuccess: (data) => {
            //     addData(data)
            //   },
            //   onError: (error) => {
            //     setShowToast(() => ({
            //       show: true,
            //       title: 'Error',
            //       content: error.response.data,
            //     }))
            //   },
            // })
          },
          onError: (error) => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Error',
              content: error.response.data,
              color: '#FF0000',
            }))
          },
        })
      } else {
        DeviceSensorEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Device Edited Successfully',
              }))
              // organizationData('', {
              //   onSuccess: (data) => {
              //     addData(data)
              //   },
              //   onError: (error) => {
              //     setShowToast(() => ({
              //       show: true,
              //       title: 'Error',
              //       content: error.response.data,
              //     }))
              //   },
              // })
            },
            onError: (error) => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content: error.response.data,
                color: '#FF0000',
              }))
            },
          },
        )
      }
    }, 0)
  }

  return (
    <>
      <GenericModal
        title={isAddMode ? 'Add Device sensor' : 'Edit Device sensor'}
        content={
          isAddMode ? (
            <AddDeviceSensor closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDeviceSensor closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
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
            <CButton
              color="primary"
              className="float-end"
              onClick={() => {
                setIsAddMode(true)
                setEditData(null)
                setIsModalOpen(true)
              }}
            >
              Add Devices Sensor
            </CButton>
          </CCol>
        </CRow>
        {/* {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />} */}
        <GenericTable columns={columns} data={data?.result} openEditModal={openEditModal} />
      </CCard>
    </>
  )
}

export default DevicesSensors
