/* eslint-disable react/prop-types */
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
export const GenericModal = ({ title, content, onClose, isOpen }) => {
  return (
    <CModal
      visible={isOpen}
      onClose={onClose}
      size="md" // Set the size (lg for large, sm for small, etc.)
    >
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{content}</CModalBody>
      <CModalFooter>
        <CButton
          color="primary"
          onClick={() => {
            onClose()
          }}
        >
          Add Organization
        </CButton>
        <CButton
          color="secondary"
          onClick={() => {
            onClose()
          }}
        >
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
