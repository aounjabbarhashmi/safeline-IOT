/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDepartmentsData, deleteDepartment } from 'src/hooks/useDepartments'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
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
  const { setShowToast } = useGlobalInfo()
  const { data, isSuccess, isError, refetch: refetchDepartments } = useAllDepartmentsData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteDepartmentById = useMutation(deleteDepartment)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  /**
   * Deletes a department by its ID.
   * @param {number} departmentId - The ID of the department to be deleted.
   */
  const deleteDepartments = (departmentId) => {
    showLoader()
    deleteDepartmentById.mutate(departmentId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Department deleted Successfully',
        }))
        refetchDepartments()
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
        {data ? (
          <GenericTable columns={columns} data={data} OnDeleteItem={deleteDepartments} />
        ) : (
          <GlobalLoader />
        )}
      </CCard>
    </>
  )
}

export default Department
