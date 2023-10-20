import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibMailchimp,
  cil3d,
  cil4k,
  cilActionUndo,
  cilAirplay,
  cilBuilding,
  cilEnvelopeClosed,
  cilLibraryBuilding,
  cilLocationPin,
  cilPaperPlane,
  cilPaperclip,
  cilPhone,
  cilTerminal,
} from '@coreui/icons'

const AddDepartmentForm = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    departmentName: '',
    departmentEmail: '',
    description:'',
    facility:''
  })
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget
    const phoneNumber = formData.organizationContact
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      console.log('Form is valid, submit data:', formData)
      event.preventDefault()
    }
  }

  return (
    <CForm
    className="row g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmit}
  >
    {/* Department Name */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationDepartmentName">Department Name*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilBuilding} alt="Name" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="departmentName"
          value={formData.departmentName}
          onChange={handleInputChange}
          feedbackInvalid="Department Name is required"
          id="validationDepartmentName"
          required
        />
      </CInputGroup>
    </CCol>
    
    {/*Department Email */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationDepartmentEmail">Department Email*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilEnvelopeClosed} alt="Departmentemail" />
        </CInputGroupText>
        <CFormInput
          type="email"
          name="departmentEmail"
          value={formData.departmentEmail}
          onChange={handleInputChange}
          aria-describedby="validationDepartmentEmail"
          feedbackInvalid="Department Email is required."
          id="validationDepartmentEmail"
          required
        />
      </CInputGroup>
    </CCol>
    {/*Description*/}
   <CCol md={12}>
      <CFormLabel htmlFor="description">Description*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cil4k} alt="description" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          feedbackInvalid="Description is required"
          id="validationDescription"
          required
        />
      </CInputGroup>
    </CCol>
    {/*Active*/}
    <cCol md={12}>
    <CFormLabel htmlFor="validationFacilityName">Active</CFormLabel>
    <CFormCheck id="flexCheckDefault" label=" "/>
    </cCol>
 {/* Facility */}
 <CCol md={12}>
      <CFormLabel htmlFor="facility">Facility*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
       {/*}   <CIcon icon={cil3d} alt="f" /> */}
        </CInputGroupText>
        <CFormInput
          type="text"
          name="facility"
          value={formData.facility}
          onChange={handleInputChange}
          feedbackInvalid="Facility is required"
          id="validationFacility"
          required
        />
      </CInputGroup>
    </CCol>
   

      {/* Submit Button */}
      <CCol xs={12}>
      <CButton color="primary" type="submit">
        Submit form
      </CButton>
    </CCol>
  </CForm>
  )
}

export default AddDepartmentForm
