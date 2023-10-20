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
  cilSignalCellular0,
  cilTerminal,
} from '@coreui/icons'

const AddDeviceForm = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    deviceName: '',
    manufacturerName:'',
    facilities:'',
    department:''
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
    {/* Device Name */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationDevicetName">Device Name*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilBuilding} alt="Name" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="deviceName"
          value={formData.deviceName}
          onChange={handleInputChange}
          feedbackInvalid="Device Name is required"
          id="validationDeviceName"
          required
        />
      </CInputGroup>
    </CCol>

    {/* Manufacturer Name */}
    <CCol md={12}>
      <CFormLabel htmlFor="validationManufacturerName">Manufacturer Name*</CFormLabel>
      <CInputGroup>
        <CInputGroupText>
          <CIcon icon={cilSignalCellular0} alt="Name" />
        </CInputGroupText>
        <CFormInput
          type="text"
          name="manufacturerName"
          value={formData.manufacturerName}
          onChange={handleInputChange}
          feedbackInvalid="Manufacturer Name is required"
          id="validationManufacturerName"
          required
        />
      </CInputGroup>
    </CCol>


{/* Facilities */}
<CCol md={12}>
      {/* Form select*/}
      <CFormLabel htmlFor="validationFacilities">Facilities*</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select valid facilities."
        id="validationFacilities"
        name='facilities'
        value={formData.facilities}
        onChange={handleInputChange}
        required
      >
        <option >Choose...</option>
        <option>Lahore City</option>
        <optio>Karachi City</optio>
        <option>Murre City</option>
      </CFormSelect>
</CCol>
    

   {/*Department Selection */}
<CCol md={12}>
      {/* Form select*/}
      <CFormLabel htmlFor="validationFacilities">Department Selection**</CFormLabel>
      <CFormSelect
        aria-describedby="validationCustom04Feedback"
        feedbackInvalid="Please select valid department."
        id="validationDepartment"
        name='department'
        value={formData.department}
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

export default AddDeviceForm
