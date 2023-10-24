import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
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

const  AddOrganizationSensor = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    typeSensorId:'',
    sensorId:'',
    organization:''
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
    {/* Type Sensor Id */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationTypeSensorId">Type Sensor Id *</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
        {/*  <CIcon icon={cilBuilding} alt="typeSensorid" />*/}
        </CInputGroupText>
        <CFormInput
          type="text"
          name="typeSensorId"
          value={formData.typeSensorId}
          onChange={handleInputChange}
          feedbackInvalid="Type Sensor Id is required"
          id="validationTypeSensorId"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Sensor Id*/}
    <CCol md={12}>
      {/* Form select*/}
      <CFormLabel htmlFor="validationSensorId">Sensor Id*</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select a valid sensor id"
        name='sensorId'
        value={formData.sensorId}
        id="validationSensorId"
        onChange={handleInputChange}
        required
      >
        <option ></option>
        <option>LKU</option>
        <optio>KTY</optio>
        <option>MHT</option>
      </CFormSelect>

    </CCol>
    {/* Organization */}
    <CCol md={12}>
      {/* Form select*/}
      <CFormLabel htmlFor="validationOrganization">Organization*</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        name='organization'
        value={formData.organization}
        feedbackInvalid="Please select a valid Organization"
        id="validationOrganization"
        onChange={handleInputChange}
        required
      >
        <option >Choose...</option>
        <option>Lahore City</option>
        <optio>Karachi City</optio>
        <option>Murre City</option>
      </CFormSelect>

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


export default AddOrganizationSensor
