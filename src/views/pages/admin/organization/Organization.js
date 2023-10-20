import { CButton, CCard, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { GenericModal } from 'src/components/modal/GenericModal'
import useDataStore from 'src/store/state'
import Modals from 'src/views/notifications/modals/Modals'
import GenericTable from 'src/views/table/GenericTable'
import Facilities from '../facilities/Facilities'
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'organizationName', label: 'Organization Name' },
  { key: 'organizationContact', label: 'Organization Contact' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'address', label: 'Address' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'postcode', label: 'Postcode' },
]
const Organization = () => {
  const data = useDataStore((state) => state.data)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <GenericModal
        title="Add Organization"
        content={<Facilities />}
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
        <GenericTable columns={columns} data={data[0]} />
      </CCard>
    </>
  )
}

export default Organization
