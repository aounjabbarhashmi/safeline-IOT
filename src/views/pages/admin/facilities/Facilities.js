/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllFacilitiesData } from 'src/hooks/useFacilities'
import AddFacilityFrom from 'src/views/forms/add-facility-from/add-facility-from'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'systemName', label: 'System Name' },
  { key: 'systemType', label: 'System Type' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'siteManager', label: 'Site Manager' },
  { key: 'contactNumber', label: 'Contact Number' },
  { key: 'address', label: 'Address' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'postcode', label: 'Postcode' },
]
const Facilities = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { data, isSuccess, isError } = useAllFacilitiesData(dispatch)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
        title="Add Facility"
        content={<AddFacilityFrom />}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className="p-4">
        <CRow>
          <CCol>
            <h3 className="pb-2">Facilities</h3>
          </CCol>
          <CCol>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Facilities
            </CButton>
          </CCol>
        </CRow>
        <GenericTable columns={columns} data={data} />
      </CCard>
    </>
  )
}

export default Facilities
