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
  cilEnvelopeClosed,
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
    timeZone:'',
    currency:'',
    siteManager:'',
    contact:'',
    contactEmail:'',
    address: '',
    city: '',
    street: '',
    postCode: '',
    latitude:'',
    longitude:''
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
          name="facilityName"
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
      {/* Form select*/}
      <CFormLabel htmlFor="validationFacilityName">Facility Type*</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select a valid facility type."
        id="validationFacilityType"
        onChange={handleInputChange}
        required
      >
        <option >Choose...</option>
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
          feedbackInvalid="Facility Name is required"
          id="validationOrganizations"
          required
        />
      </CInputGroup>
    </CCol>
        {/* Time zone*/}
       {/*} <CFormLabel htmlFor="validationTimeZone">Time Zone*</CFormLabel>*/}
        <CCol md={6}>
      <CFormSelect
      name='timeZone'
      value={formData.timeZone}
      onChange={handleInputChange}
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select a valid time zone."
        id="validationTimeZone"
        label="Time Zone*"
        required
      >
        <option ></option>
        <option>Arial bl</option>
        <option>Blue re</option>
        <option>Green re</option>
        <option>Red spr</option>
      </CFormSelect>
    </CCol>

        {/*Currency */}
       {/* <CFormLabel htmlFor="validationCurrency">Currency*</CFormLabel>*/}
        <CCol md={6}>
      <CFormSelect
      name='currency'
      value={formData.currency}
      onChange={handleInputChange}
        aria-describedby="validationCurrency"
        feedbackInvalid="Please select a valid currency."
        id="validationCurrency"
        label="Currency*"
        required
      >
        <option></option>
        <option>Arial bl</option>
        <option>Blue re</option>
        <option>Green re</option>
        <option>Red spr</option>
      </CFormSelect>
    </CCol>
        {/* Site manager */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomCity">Site Manager</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilLibraryBuilding} alt="sitemanager" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="siteManager"
          value={formData.siteManager}
          onChange={handleInputChange}
          aria-describedby="validationSiteManager"
          feedbackInvalid="Site Manager required."
          id="validationSiteManager"
          required
        ></CFormInput>
      </CInputGroup>
    </CCol>
    {/* Contact */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomStreet">Contact Number*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilPhone} alt="Contact" />
        </CInputGroupText>
        <CFormInput
          type="phone number"
          name="contact"
          placeholder='123456'
          value={formData.contact}
          onChange={handleInputChange}
          aria-describedby="validationContactNumber"
          feedbackInvalid="Phone Number is required."
          id="validationContactNumber"
          required
        />
      </CInputGroup>
    </CCol>
    
    {/*Contact Email*/}
    <CCol md={12}>
      <CFormLabel htmlFor="validationCustomAddress">Contact Email</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilEnvelopeClosed} alt="Contactemail" />
        </CInputGroupText>
        <CFormInput
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleInputChange}
          aria-describedby="validationContactEmail"
          feedbackInvalid="Contact Email is required."
          id="validationContactEmail"
          required
        />
      </CInputGroup>
    </CCol>

    {/* Address */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationCustomAddress">Address*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         <CIcon icon={cilBuilding} alt="Address" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          aria-describedby="validationCustom03Feedback"
          feedbackInvalid="Address is required."
          id="validationAddress"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Street*/}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomCity">Street*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilLibraryBuilding} alt="Street" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Street is required."
          id="validationStreet"
          required
        ></CFormInput>
      </CInputGroup>
    </CCol>
    {/* City */}
    <CCol md={6}>
      <CFormLabel htmlFor="validationCustomStreet">City*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         <CIcon icon={cil4k} alt="City" /> 
        </CInputGroupText>
        <CFormInput
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="City is required."
          id="validationCity"
          required
        />
      </CInputGroup>
    </CCol>
    {/* Postcode */}
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomPostcode">Postcode</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         {/* <CIcon icon={cilPaperclip} alt="Postcode" />*/}
        </CInputGroupText>
        <CFormInput
          type="number"
          name="postCode"
          value={formData.postCode}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="Postcode is required"
          id="validationPostCode"
          required
        />
      </CInputGroup>
    </CCol>
    {/* latitude */}
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomPostcode">Latitude*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         {/* <CIcon icon={cilPaperclip} alt="latitude" /> */}
        </CInputGroupText>
        <CFormInput
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="latitude is required"
          id="validationLatitude"
          required
        />
      </CInputGroup>
    </CCol>
    {/*Longitude*/}
    <CCol md={4}>
      <CFormLabel htmlFor="validationCustomPostcode">Longitude*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
         {/* <CIcon icon={cilPaperclip} alt="longitude" />*/}
        </CInputGroupText>
        <CFormInput
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
          aria-describedby="validationCustom05Feedback"
          feedbackInvalid="longitude is required"
          id="validationLongitude"
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
