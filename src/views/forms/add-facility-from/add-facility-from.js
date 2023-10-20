import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
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
  cilLibraryBuilding,
  cilLocationPin,
  cilPaperPlane,
  cilPaperclip,
  cilPhone,
  cilTerminal,
} from '@coreui/icons'

const AddFacilityFrom = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    facilityName: '',
    facilityType: '',
    organizations: '',
    Address: '',
    city: '',
    street: '',
    postcode: '',
    latitude:''
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
    {/* Facility Name */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationFacilityName">Facility Name*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cil3d} alt="Name" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="facilityname"
          value={formData.facilityName}
          onChange={handleInputChange}
          feedbackInvalid="Facility Name is required"
          id="validationFacilityName"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Facility Type */}
    <CCol md={12}>
     {/* </CInputGroup> */}
      {/* Form select*/}
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select a valid state."
        id="validationCustom04"
        label="Facility Type"
        required
      >
        <option abled>Choose...</option>
        <option>Lahore City</option>
        <optio>Karachi City</optio>
        <option>Murre City</option>
      </CFormSelect>

    </CCol>
    {/* Organization */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationOrganization">Organizations* </CFormLabel>
      <CInputGroup className="has-validation">
        <CInputGroupText>
         {/*} <CIcon icon={cilPaperPlane} alt="Organization" />*/}
        </CInputGroupText>
        <CFormInput
          type="text"
          name="organizations"
          value={formData.organizations}
          onChange={handleInputChange}
          aria-describedby="inputGroupPrependFeedback"
          feedbackInvalid="Organizations  is required"
          id="validationOrganizations"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Address */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationCustomAddress">Address</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         {/* <CIcon icon={cilLocationPin} alt="Address" />*/}
        </CInputGroupText>
        <CFormInput
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleInputChange}
          aria-describedby="validationCustom03Feedback"
          feedbackInvalid="Address is required."
          id="validationCustom03"
          required
        />
      </CInputGroup>
    </CCol>
    {/* City */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomCity">City</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilLibraryBuilding} alt="City" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="City is required."
          id="validationCustom04"
          required
        ></CFormInput>
      </CInputGroup>
    </CCol>
    {/* Street */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomStreet">Street</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cil4k} alt="Street" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="Street is required."
          id="validationCustom05"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Postcode */}
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomPostcode">Postcode</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilPaperclip} alt="Postcode" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="postcode"
          value={formData.postcode}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="Postcode is required"
          id="validationCustom05"
          required
        />
      </CInputGroup>
    </CCol>
    {/* latitude */}
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomPostcode">latitude</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilPaperclip} alt="latitude" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="latitude is required"
          id="validationCustom05"
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

export default AddFacilityFrom
