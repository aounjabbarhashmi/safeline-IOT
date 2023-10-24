import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import {
  useAllOrgDevicesData,
  EditOrganizationSensor,
  addOrganizationSensor,
} from 'src/hooks/useOrganizationDevices'
import AddOrganizationSensor from 'src/views/forms/add-organization-sensor/add-organization-sensor'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'organization.organizationName', label: 'Assigned Organization' },
]

const OrganizationSensor = () => {
  const { data, isSuccess, isError } = useAllOrgDevicesData()
  const { mutate: OrganizationSensorAdd } = useMutation(addOrganizationSensor)
  const { mutate: OrganizationSensorEdit } = useMutation(EditOrganizationSensor)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
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
  useEffect(() => {
    showLoader()
    if (isSuccess && !isError) {
      hideLoader()
    } else {
      hideLoader()
    }
  }, [isSuccess, isError, showLoader, hideLoader])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        OrganizationSensorAdd(handler, {
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
              content: error?.response?.data?.title || '',
              color: '#FF0000',
            }))
          },
        })
      } else {
        OrganizationSensorEdit(
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
        title={isAddMode ? 'Add Organization sensor' : 'Edit Organization sensor'}
        content={
          isAddMode ? (
            <AddOrganizationSensor closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddOrganizationSensor
              closeModal={closeModal}
              saveHandler={saveHandler}
              data={editData}
            />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className="p-4">
        <CRow>
          <CCol>
            <h3 className="pb-2">Organization Sensors</h3>
          </CCol>
          <CCol>
            <CButton
              color="primary"
              className="float-end"
              onClick={() => {
                setIsAddMode(true)
                setEditData(null)
                setIsModalOpen(true)
              }}
            >
              Add Organization Sensor
            </CButton>
          </CCol>
        </CRow>
        {data ? (
          <GenericTable columns={columns} data={data} openEditModal={openEditModal} />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default OrganizationSensor
