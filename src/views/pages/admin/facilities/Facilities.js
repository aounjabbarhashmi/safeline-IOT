/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useMutation } from 'react-query'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useAllFacilitiesData, addFacility } from 'src/hooks/useFacilities'
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
  const { mutate: facilityAdd } = useMutation(addFacility)
  const { data, isSuccess, isError } = useAllFacilitiesData(dispatch)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setShowToast } = useGlobalInfo()
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
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      facilityAdd(handler, {
        onSuccess: () => {
          hideLoader()
          setShowToast(() => ({
            show: true,
            title: 'Success',
            content: 'Facility Created Successfully',
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
            content: error.response?.data,
            color: '#FF0000',
          }))
        },
      })
    }, 0)
  }
  return (
    <>
      <GenericModal
        title="Add Facility"
        content={<AddFacilityFrom closeModal={closeModal} saveHandler={saveHandler} />}
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
        {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />}
      </CCard>
    </>
  )
}

export default Facilities
