/* eslint-disable react/prop-types */
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'
export const GenericModal = ({ title, content, onClose, isOpen }) => {
  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{content}</CModalBody>
      {/* <CModalFooter>
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
      </CModalFooter> */}
    </CModal>
  )
}
