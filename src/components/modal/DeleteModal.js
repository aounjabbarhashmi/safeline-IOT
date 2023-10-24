/* eslint-disable react/prop-types */
import { CButton, CCol, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
export const DeleteModal = ({ title, content, onClose, isOpen, OnDeleteClick, id }) => {
  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{content}</CModalBody>
      <h4 className="ms-3">Are you sure you want to delete? </h4>

      <CCol xs={11} className="mb-3 mt-3">
        <CButton
          color="danger"
          className="float-end ms-2"
          onClick={() => {
            OnDeleteClick(id)
            onClose()
          }}
        >
          Delete
        </CButton>
        <CButton
          color="primary"
          className="float-end"
          onClick={() => {
            onClose()
          }}
        >
          Cancel
        </CButton>
      </CCol>
    </CModal>
  )
}
