import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { getAllDevicesData, useAllDevicesData } from 'src/hooks/useDevices'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'name', label: 'Device Name' },
  { key: 'manufacturer', label: 'Manufacturer' },
]
const Devices = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const { mutate: getDevices, data } = useMutation(getAllDevicesData)
  const { data, isSuccess, isError } = useAllDevicesData()

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
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
        {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />}
      </CCard>
    </>
  )
}

export default Devices
