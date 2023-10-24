/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllFacilitiesData, deleteFacility } from 'src/hooks/useFacilities'
import AddFacilityFrom from 'src/views/forms/add-facility-from/add-facility-from'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import GenericTable from 'src/views/table/GenericTable'
import { useMutation } from 'react-query'
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
  const { setShowToast } = useGlobalInfo()
  const { data, isSuccess, isError, refetch: refetchFacilities } = useAllFacilitiesData(dispatch)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteFacilityById = useMutation(deleteFacility)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /**
   * Deletes a Fecility by its ID.
   * @param {number} facilityId - The ID of the Facility to be deleted.
   */
  const deleteFacilities = (facilityId) => {
    showLoader()
    deleteFacilityById.mutate(facilityId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Facility deleted Successfully',
        }))
        refetchFacilities()
        hideLoader()
      },
      onError: (error) => {
        setShowToast(() => ({
          show: true,
          title: 'Error',
          content: error.response.data.error,
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
        {data ? (
          <GenericTable columns={columns} data={data} OnDeleteItem={deleteFacilities} />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Facilities
