/* eslint-disable react-hooks/exhaustive-deps */
import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalLoader from 'src/components/global-loader/GlobalLoader'
import { GenericModal } from 'src/components/modal/GenericModal'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useAllDepartmentsData, addDepartment, EditDepartment } from 'src/hooks/useDepartments'
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
  const { mutate: departmentEdit } = useMutation(EditDepartment)
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { data, isSuccess, isError } = useAllDepartmentsData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editData, setEditData] = useState()
  const [isAddMode, setIsAddMode] = useState(false)
  const { setShowToast } = useGlobalInfo()
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
  }, [showLoader, hideLoader, isSuccess, isError])
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      if (isAddMode) {
        departmentAdd(handler, {
          onSuccess: () => {
            hideLoader()
            setShowToast(() => ({
              show: true,
              title: 'Success',
              content: 'Department Created Successfully',
            }))
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
      } else {
        departmentEdit(
          { handler, editData },
          {
            onSuccess: () => {
              hideLoader()
              setShowToast(() => ({
                show: true,
                title: 'Success',
                content: 'Department Edited Successfully',
              }))
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
        title={isAddMode ? 'Add Department' : 'Edit Department'}
        content={
          isAddMode ? (
            <AddDepartmentForm closeModal={closeModal} saveHandler={saveHandler} />
          ) : (
            <AddDepartmentForm closeModal={closeModal} saveHandler={saveHandler} data={editData} />
          )
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CCard className="p-4">
        <CRow>
          <CCol>
            <h3 className="pb-2">Departments</h3>
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
              Add Departments
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

export default Department
