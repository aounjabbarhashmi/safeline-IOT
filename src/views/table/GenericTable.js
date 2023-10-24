/* eslint-disable react/prop-types */
// GenericTable.js
import React, { useState } from 'react'
import {
  CDropdownMenu,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CDropdown, CDropdownItem, CDropdownToggle } from '@coreui/react'
import './GenericTable.css'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings, cilTrash } from '@coreui/icons'
import { DeleteModal } from 'src/components/modal/DeleteModal'

const GenericTable = ({ columns = [], data = [], deleteOrg, openEditModal }) => {
  const renderCell = (item, key) => {
    const keys = key.split('.')
    return keys.reduce((acc, currentKey) => acc?.[currentKey], item)
  }
  const [deleteOrganizationId, setDeleteOrganizationId] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }
  return (
    <div className="table-responsive-x">
      <DeleteModal
        title="Delete"
        content={''}
        deleteOrg={deleteOrg}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={deleteOrganizationId}
      />
      <CTable hover className="custom-table">
        <CTableHead>
          <CTableRow>
            {columns.map((column) => (
              <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
            ))}
            <CTableHeaderCell key="actions">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <CTableRow key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key.includes('.') ? renderCell(item, column.key) : item[column.key]}
                  </td>
                ))}
                <td key="actions">
                  <CDropdown>
                    <CDropdownToggle color="secondary">
                      <CIcon icon={cilSettings} />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => openEditModal(item)}>
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => {
                          setDeleteOrganizationId(item.id)
                          openDeleteModal()
                        }}
                      >
                        <CIcon icon={cilTrash} className="me-2" />
                        Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </td>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default GenericTable
