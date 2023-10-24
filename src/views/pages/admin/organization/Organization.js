import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { GenericModal } from 'src/components/modal/GenericModal'

import useDataStore from 'src/store/state'
import Modals from 'src/views/notifications/modals/Modals'
import GenericTable from 'src/views/table/GenericTable'
import Facilities from '../facilities/Facilities'
import AddOrganizationForm from 'src/views/forms/add-organization-form/AddOrganizationForm'
import { useMutation } from 'react-query'
import { addOrganization, getOrganizationData, deleteOrganization } from 'src/hooks/useAuth'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
const columns = [
  { key: 'organizationName', label: 'Organization Name' },
  { key: 'organizationContact', label: 'Organization Contact' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'address', label: 'Address' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'postcode', label: 'Postcode' },
]
const Organization = () => {
  const addData = useDataStore((state) => state.addData)
  const { mutate: organizationAdd } = useMutation(addOrganization)
  const { mutate: organizationData } = useMutation(getOrganizationData)
  const data = useDataStore((state) => state.data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setShowToast } = useGlobalInfo()
  const openModal = () => {
    setIsModalOpen(true)
  }

  /**
   * Deletes an Organization by its ID.
   * @param {number} organizationId - The ID of the Organization to be deleted.
   */
  const deleteOrganizations = (organizationId) => {
    showLoader()
    deleteOrganizationById.mutate(organizationId, {
      onSuccess: () => {
        setShowToast(() => ({
          show: true,
          title: 'Success',
          content: 'Organization deleted Successfully',
        }))
        organizationData('', {
          onSuccess: (data) => {
            addData(data)
          },
          onError: (error) => {
            setShowToast(() => ({
              show: true,
              title: 'Error',
              content: error.response.data,
            }))
          },
        })
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

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const deleteOrganizationById = useMutation(deleteOrganization)
  function saveHandler(handler) {
    showLoader()
    setTimeout(() => {
      organizationAdd(handler, {
        onSuccess: () => {
          hideLoader()
          setShowToast(() => ({
            show: true,
            title: 'Success',
            content: 'Organization Created Successfully',
          }))
          organizationData('', {
            onSuccess: (data) => {
              addData(data)
            },
            onError: (error) => {
              setShowToast(() => ({
                show: true,
                title: 'Error',
                content: error.response.data,
              }))
            },
          })
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
        title="Add Organization"
        content={<AddOrganizationForm closeModal={closeModal} saveHandler={saveHandler} />}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <CCard className="p-4">
        <CRow>
          <CCol>
            <h3 className="pb-2">Organizations</h3>
          </CCol>
          <CCol>
            <CButton color="primary" className="float-end" onClick={openModal}>
              Add Organization
            </CButton>
          </CCol>
        </CRow>
        <GenericTable columns={columns} data={data[0]} OnDeleteItem={deleteOrganizations} />
      </CCard>
    </>
  )
}

export default Organization
