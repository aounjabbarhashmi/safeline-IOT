/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {

  cil4k,
  cilBuilding,
  cilLibraryBuilding,
  cilLocationPin,
  cilPaperPlane,
  cilPaperclip,
  cilPhone,
} from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const AddOrganizationForm = ({ closeModal, saveHandler }) => {
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationContact: '',
    contactEmail: '',
    Address: '',
    city: '',
    street: '',
    postcode: '',
  })
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }
  const handleEmailChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
    const inputEmail = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValid = emailRegex.test(inputEmail);

    setValidated(isValid);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    setValidated(true)

    // Handle form submission here
    if (form.checkValidity() === true) {
      showLoader()
      saveHandler(formData)
      closeModal()
    }
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Organization Name */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomorganizationName">Organization Name</CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            {/* <MdLocationPin /> */}
            <CIcon icon={cilBuilding} alt="Name" />
          </CInputGroupText>
          <CFormInput
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            feedbackInvalid="Organization Name is required"
            id="validationCustom01"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Organization Contact */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomorganizationContact">Organization Contact</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>
            <CIcon icon={cilPhone} alt="Contact" />
          </CInputGroupText>
          <CFormInput
            type="number"
            name="organizationContact"
            value={formData.organizationContact}
            onChange={handleInputChange}
            feedbackInvalid="Please enter a valid phone number"
            id="validationCustom02"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Organization Email */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomorganizationEmail">Organization Email</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText>
            <CIcon icon={cilPaperPlane} alt="Email" />
          </CInputGroupText>
          <CFormInput
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleEmailChange}
            aria-describedby="inputGroupPrependFeedback"
            feedbackInvalid="Organization Email is required"
            id="validationCustomorganizationEmail"
            required
          />
        </CInputGroup>
      </CCol>
      {/* Address */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationCustomAddress">Address</CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilLocationPin} alt="Address" />
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
      <CCol md={12}>
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
      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" className='float-end' type="submit">
          Add Organization
        </CButton>
      </CCol>
    </CForm>
  )
}

export default AddOrganizationForm
