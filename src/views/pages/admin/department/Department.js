/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDepartmentsData } from 'src/hooks/useDepartments'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'name', label: 'Department Name' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'description', label: 'Description' },
  // { key: 'active', label: 'Active' },
  // { key: 'id', label: 'ID' },
  // Add more columns as needed
]
const Department = () => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { data, isSuccess, isError } = useAllDepartmentsData()
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
  }, [showLoader, hideLoader, isSuccess, isError])
  return (
    <>
      <GenericModal
        title="Add Department"
        content="This is the modal content."
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className="p-4">
        <CRow>
          <CCol>
            <h3 className="pb-2">Departments</h3>
          </CCol>
          <CCol>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Departments
            </CButton>
          </CCol>
        </CRow>
        {data ? <GenericTable columns={columns} data={data} /> : <GlobalLoader />}
      </CCard>
    </>
  )
}

export default Department
