import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { getAllDevicesData, useAllDevicesData, deleteDevice } from 'src/hooks/useDevices'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'name', label: 'Device Name' },
  { key: 'manufacturer', label: 'Manufacturer' },
]
const Devices = () => {
  const { dispatch } = useLoader()

  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { setShowToast } = useGlobalInfo()
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const { mutate: getDevices, data } = useMutation(getAllDevicesData)
  const { data, isSuccess, isError, refetch: refetchDevices } = useAllDevicesData()
  const deleteDeviceById = useMutation(deleteDevice)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /**
   * Deletes a device by its ID.
   * @param {number} deviceId - The ID of the device to be deleted.
   */
  const deleteDevices = (deviceId) => {
    showLoader()
    deleteDeviceById.mutate(deviceId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Device deleted Successfully',
        }))
        refetchDevices()
        hideLoader()
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
  useEffect(() => {
    showLoader()
    if (isSuccess && !isError) {
      hideLoader()
    } else {
      hideLoader()
    }
  }, [isSuccess, isError, showLoader, hideLoader])
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
          <CCol>
            <h3 className="pb-2">Devices</h3>
          </CCol>
          <CCol>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Devices
            </CButton>
          </CCol>
        </CRow>
        {data ? (
          <GenericTable columns={columns} data={data} OnDeleteItem={deleteDevices} />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Devices
