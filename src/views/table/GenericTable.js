/* eslint-disable react/prop-types */
// GenericTable.js
import React from 'react'
import {
  CDropdownMenu,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CDropdown, CDropdownItem, CDropdownToggle } from '@coreui/react'
// import { CIcon } from '@coreui/icons-react' // Import the icon component
import './GenericTable.css' // Import your custom CSS file
import CIcon from '@coreui/icons-react'
import { cilPencil, cilSettings, cilTrash } from '@coreui/icons'

const GenericTable = ({ columns = [], data = [] }) => {
  const renderCell = (item, key) => {
    const keys = key.split('.')
    return keys.reduce((acc, currentKey) => acc?.[currentKey], item)
  }

  return (
    <div className="table-responsive-x">
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
                      <CDropdownItem>
                        <CIcon icon={cilPencil} className="me-2" />
                        Edit
                      </CDropdownItem>
                      <CDropdownItem>
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
