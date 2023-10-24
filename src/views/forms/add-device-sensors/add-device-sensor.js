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

const AddDeviceSensor = ({ closeModal, saveHandler, data }) => {
  const { dispatch } = useLoader()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    sensorId: '',
    sensorName: '',
    deviceId: 52,
    active: true,
  })
  useEffect(() => {
    if (data) {
      setFormData({
        sensorId: data.sensorId,
        sensorName: data.sensorName,
        deviceId: 52,
        active: true,
      })
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
      {/* Sensor Id */}
      <CCol md={12}>
        <CFormLabel htmlFor="validationSensorId">Sensor Id *</CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="typeSensorid" />
          </CInputGroupText>
          <CFormInput
            type="text"
            name="sensorId"
            value={formData.sensorId}
            onChange={handleInputChange}
            feedbackInvalid=" Sensor Id is required"
            id="validationSensorId"
            required
          />
        </CInputGroup>
      </CCol>
      {/*Sensor name*/}
      <CCol md={12}>
        <CFormLabel htmlFor="validationSensorName">Sensor Name*</CFormLabel>
        <CInputGroup>
          <CInputGroupText>
            <CIcon icon={cilBuilding} alt="typeSensorid" />
          </CInputGroupText>
          <CFormInput
            type="text"
            name="sensorName"
            value={formData.sensorName}
            onChange={handleInputChange}
            feedbackInvalid=" Sensor Name is required"
            id="validationSensorName"
            required
          />
        </CInputGroup>
      </CCol>

      {/* Facality Selection*/}
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel htmlFor="validationFacilitySelection">Facility Selection*</CFormLabel>
        <CFormSelect
          aria-describedby="validationCustom04Feedback"
          name="facilitySelection"
          value={formData.facilitySelection}
          feedbackInvalid="Please select a valid Facality"
          id="validationFacility"
          // onChange={handleInputChange}
          required
        >
          <option> </option>
          <option>HE-HeapByte-Lahore</option>
          <optio>HE-web development</optio>
        </CFormSelect>
      </CCol>

      {/* Department Selection*/}
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel htmlFor="validationDepartmentSelection">Department Selection*</CFormLabel>
        <CFormSelect
          aria-describedby="validationCustom04Feedback"
          name="departmentSelection"
          value={formData.departmentSelection}
          feedbackInvalid="Please select a valid Department Selection"
          id="validationDepartmentSelection"
          // onChange={handleInputChange}
          required
        >
          <option> </option>
          <option>HE-admin</option>
          <optio>HE-Dev</optio>
        </CFormSelect>
      </CCol>

      {/*Device Selection */}
      <CCol md={12}>
        {/* Form select*/}
        <CFormLabel htmlFor="validationDeviceSelection">Device Selection*</CFormLabel>
        <CFormSelect
          aria-describedby="validationCustom04Feedback"
          name="deviceSelection"
          value={formData.deviceSelection}
          feedbackInvalid="Please select a valid Device Selection"
          id="validationDeviceSelection"
          // onChange={handleInputChange}
          required
        >
          <option> </option>
          <option>AD-AC</option>
          <optio>BF-JK</optio>
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
AddDeviceSensor.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveHandler: PropTypes.func.isRequired,
  data: PropTypes.shape({
    sensorId: PropTypes.string,
    sensorName: PropTypes.string,
    deviceId: PropTypes.number,
    active: PropTypes.bool,
  }),
}
export default AddDeviceSensor
