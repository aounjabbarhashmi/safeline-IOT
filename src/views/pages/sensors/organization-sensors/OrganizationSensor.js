import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllOrgDevicesData } from 'src/hooks/useOrganizationDevices'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'sensorId', label: 'Sensor ID' },
  { key: 'organization.organizationName', label: 'Assigned Organization' },
]

const OrganizationSensor = () => {
  const { data, isSuccess, isError } = useAllOrgDevicesData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
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
            <h3 className="pb-2">Organization Sensors</h3>
          </CCol>
          <CCol>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Organization Sensor
            </CButton>
          </CCol>
        </CRow>
        {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />}
      </CCard>
    </>
  )
}

export default OrganizationSensor
