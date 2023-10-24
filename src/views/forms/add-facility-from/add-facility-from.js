import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
  cil3d,
  cil4k,
  cilBuilding,
  cilEnvelopeClosed,
  cilLibraryBuilding,
  cilPhone,
} from '@coreui/icons'
import { useLoader } from 'src/global-context/LoaderContext'
import useDataStore from 'src/store/state'

const AddFacilityFrom = ({ closeModal, saveHandler, data }) => {
  const dataOrganization = useDataStore((state) => state.data)
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    systemName: '',
    systemType: '',
    organizationId: 'Selected Organization',
    timezone: '',
    currency: '',
    siteManager: '',
    contactNumber: '',
    contactEmail: '',
    address: '',
    city: '',
    street: '',
    postCode: 0,
    latitude: 0,
    longitude: 0,
  })
  useEffect(() => {
    if (data) {
      setFormData(() => ({
        systemName: data.systemName,
        systemType: data.systemType,
        organizationId: localStorage.getItem('OrganizationId'),
        timezone: data.timezone,
        currency: data.currency,
        siteManager: data.siteManager,
        contactNumber: data.contactNumber,
        contactEmail: data.contactEmail,
        address: data.address,
        city: data.city,
        street: data.street,
        postCode: +data.postcode,
        latitude: +data.latitude,
        longitude: +data.longitude,
      }))
    }
  }, [data])
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
      showLoader()
      saveHandler(formData)
      event.preventDefault()
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
      {/* Facility Name */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationFacilityName">Facility Name*</CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cil3d} alt="Name" />
          </CInputGroupText>
          <CFormInput
            type="text"
            name="systemName"
            value={formData.systemName}
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
        <CFormSelect
          name="organizationId"
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid Organization."
          id="validationOrganization"
          value={formData.organizationId}
          onChange={handleInputChange}
          label="Organization*"
          required
          // eslint-disable-next-line react/prop-types
          disabled={data ? true : false}
        >
          <option>Select Organization</option>
          {dataOrganization[0]?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.organizationName}
              </option>
            )
          })}
        </CFormSelect>
      </CCol>
      <CCol md={12}>
        {/* Form select*/}
        <CFormSelect
          name="systemType"
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid facility type."
          id="validationFacilityType"
          value={formData.systemType}
          onChange={handleInputChange}
          label="Facility Type*"
          required
        >
          <option>Select Facility Type</option>
          <option value={'Mixed Dashboard'}>Mixed Dashboard</option>
          <option value={'Energy Dashboard'}>Energy Dashboard</option>
          <option value={'Condition Dashboard'}>Condition Dashboard</option>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormSelect
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          aria-describedby="validationCustom04Feedback"
          feedbackInvalid="Please select a valid time zone."
          id="validationTimeZone"
          label="Time Zone*"
          required
        >
          <option>Select Timezone</option>
          <option value={'Asia/Colombo'}>Asia/Colombo</option>
          <option value={'Asia/Dhaka'}>Asia/Dhaka</option>
          <option value={'Asia/Dubai'}>Asia/Dubai</option>
        </CFormSelect>
      </CCol>

      {/*Currency */}
      {/* <CFormLabel htmlFor="validationCurrency">Currency*</CFormLabel>*/}
      <CCol md={6}>
        <CFormSelect
          name="currency"
          value={formData.currency}
          onChange={handleInputChange}
          aria-describedby="validationCurrency"
          feedbackInvalid="Please select a valid currency."
          id="validationCurrency"
          label="Currency*"
          required
        >
          <option>Select Currency</option>
          <option value={'USD'}>USD</option>
          <option value={'EUR'}>EUR</option>
          <option value={'ZAR'}>ZAR</option>
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
            type="tel"
            name="contactNumber"
            placeholder="+92xxxx"
            value={formData.contactNumber}
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
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="Postcode" />*/}</CInputGroupText>
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
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="latitude" /> */}</CInputGroupText>
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
          <CInputGroupText>{/* <CIcon icon={cilPaperclip} alt="longitude" />*/}</CInputGroupText>
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
AddFacilityFrom.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    systemName: PropTypes.string,
    systemType: PropTypes.string,
    organizationId: PropTypes.string,
    timezone: PropTypes.string,
    currency: PropTypes.string,
    siteManager: PropTypes.string,
    contactNumber: PropTypes.string,
    contactEmail: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    postcode: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
  }),
}

export default AddFacilityFrom
