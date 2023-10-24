/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDepartmentsData, addDepartment } from 'src/hooks/useDepartments'
import AddDepartmentForm from 'src/views/forms/add-department-form/add-department-form'
import GenericTable from 'src/views/table/GenericTable'
import { useMutation } from 'react-query'
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
  const { mutate: departmentAdd } = useMutation(addDepartment)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { data, isSuccess, isError } = useAllDepartmentsData()
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
  }, [showLoader, hideLoader, isSuccess, isError])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      departmentAdd(handler, {
        onSuccess: () => {
          hideLoader()
          setShowToast(() => ({
            show: true,
            title: 'Success',
            content: 'Department Created Successfully',
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
    }, 0)
  }
  return (
    <>
      <GenericModal
        title="Add Department"
        content={<AddDepartmentForm closeModal={closeModal} saveHandler={saveHandler} />}
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
