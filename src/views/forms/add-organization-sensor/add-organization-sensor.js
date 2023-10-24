import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
import { useLoader } from 'src/global-context/LoaderContext'

const AddOrganizationSensor = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    sensors: [],
    organizationId: 33,
  })
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        organizationId: data.organizationId,
      })
    }
  }, [data])
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'typeSensorId') {
      setFormData((prevData) => ({
        ...prevData,
        sensors: [value],
      }))
    } else if (name === 'sensorId') {
      setFormData((prevData) => ({
        ...prevData,
        sensors: [...prevData.sensors, value],
      }))
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      })
    }
  }
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
      console.log(formData)
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
      {/* Type Sensor Id */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationTypeSensorId">Type Sensor Id *</CFormLabel>
        <CInputGroup>
          <CInputGroupText>{/*  <CIcon icon={cilBuilding} alt="typeSensorid" />*/}</CInputGroupText>
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
          name="sensorId"
          value={formData.sensorId}
          id="validationSensorId"
          onChange={handleInputChange}
          required
        >
          <option></option>
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
          name="organization"
          value={formData.organization}
          feedbackInvalid="Please select a valid Organization"
          id="validationOrganization"
          // onChange={handleInputChange}
          required
        >
          <option>Choose...</option>
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
AddOrganizationSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    typeSensorId: PropTypes.string,
    sensorId: PropTypes.string,
    organization: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        organizationName: PropTypes.string,
      }),
    ]),
  }),
}
AddOrganizationSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    organizationId: PropTypes.string,
  }),
}
export default AddOrganizationSensor
