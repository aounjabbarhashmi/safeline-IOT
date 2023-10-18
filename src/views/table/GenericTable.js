import React from 'react'
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const GenericTable = ({ columns = [], data = [] }) => {
  return (
    <CTable responsive="sm" hover>
      <CTableHead>
        <CTableRow>
          {columns.map((column) => (
            <CTableHeaderCell key={column.key}>{column.label}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item, index) => (
          <CTableRow key={index}>
            {columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default GenericTable
