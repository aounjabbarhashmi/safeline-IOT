
import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormSelect,
  CFormInput,
  CFormLabel,
  CFormTextarea,
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

const  AddSensorConfigration = () => {
    const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    min:'',
    max:'',
    unit:'',
    description:'',
    tname:'',
    tmin:'',
    tmax:'',
    tunit:'',
    tdescription:'',
    coName:'',
    coMin:'',
    coMax:'',
    coUnit:'',
    coDescription:'',
    hName:'',
    hMin:'',
    hMax:'',
    hUnit:'',
    hDescription:''
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
    {/*Temperature 1*/}
    <CFormCheck id="flexCheckDefault" label="Temperature 1"/>
    {/*Name*/}
    <CCol xs="auto">
    <CFormLabel htmlFor="validationName">Name*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Sensor Name"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    feedbackInvalid="Name is required"
    id="validationName"
    required />
  </CCol>
  {/* Min*/}
  <CCol xs="auto">
  <CFormLabel htmlFor="validationMin">Min*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Minimum Value"   
    name="min"
    value={formData.min}
    onChange={handleInputChange}
    feedbackInvalid="Minimum value is required"
    id="validationMin"
    required/>
  </CCol>
  {/* Max*/}
  <CCol xs="auto">
    <CFormLabel htmlFor="validationMax">Max*</CFormLabel>
    <CFormInput type="name" placeholder="Enter Maximum Value"  
     name="max"
     value={formData.max}
     onChange={handleInputChange}
     feedbackInvalid="Maximum Value is required"
     id="validationMax"
     required
   />
  </CCol>
 {/*Unit*/}
 <CCol xs="auto">
 <CFormLabel htmlFor="validationUnit">Unit*</CFormLabel>
    <CFormSelect aria-label="Default select example" id='unit' name='unit'
    value={formData.unit}
    onChange={handleInputChange}
    feedbackInvalid="Unit is required" 
    required  >
  <option>Open this select menu</option>
  <option value="1">--Name--</option>
  <option value="2">C*</option>
  <option value="3">F-</option>
</CFormSelect>

  </CCol>
{/* Hide on dashboard*/}
<CCol xs="auto">
<CFormLabel htmlFor="validationTypeSensorId"></CFormLabel>
<CFormCheck reverse id="reverseCheckbox1" value="option1" label="Hide on dashboard"/>
</CCol>
{/*Description*/}
<CForm>
  <CFormTextarea
    id="describe"
    label="Description"
    rows={3}
    name="describe"
    value={formData.description}
    onChange={handleInputChange}
    placeholder='describe Your way'
  ></CFormTextarea>
</CForm>
{/* Temperature 2*/}
 <CFormCheck id="flexCheckDefault" label="Temperature 2"/>
    {/*Name*/}
    <CCol xs="auto">
    <CFormLabel htmlFor="validationName">Name*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Sensor Name"
    name="tname"
    value={formData.tname}
    onChange={handleInputChange}
    feedbackInvalid="Name is required"
    id="validationName"
    required />
  </CCol>
  {/* Min*/}
  <CCol xs="auto">
  <CFormLabel htmlFor="validationMin">Min*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Minimum Value"   
    name="tmin"
    value={formData.tmin}
    onChange={handleInputChange}
    feedbackInvalid="Minimum value is required"
    id="validationMin"
    required/>
  </CCol>
  {/* Max*/}
  <CCol xs="auto">
    <CFormLabel htmlFor="validationMax">Max*</CFormLabel>
    <CFormInput type="name" placeholder="Enter Maximum Value"  
     name="tmax"
     value={formData.tmax}
     onChange={handleInputChange}
     feedbackInvalid="Maximum Value is required"
     id="validationMax"
     required
   />
  </CCol>
 {/*Unit*/}
 <CCol xs="auto">
 <CFormLabel htmlFor="validationUnit">Unit*</CFormLabel>
    <CFormSelect aria-label="Default select example" id='unit' name='tunit'
    value={formData.tunit}
    onChange={handleInputChange}
    feedbackInvalid="Unit is required" 
    required  >
  <option>Open this select menu</option>
  <option value="1">--Name--</option>
  <option value="2">C*</option>
  <option value="3">F-</option>
</CFormSelect>

  </CCol>
{/* Hide on dashboard*/}
<CCol xs="auto">
<CFormLabel htmlFor="validationTypeSensorId"></CFormLabel>
<CFormCheck reverse id="reverseCheckbox1" value="option1" label="Hide on dashboard"/>
</CCol>
{/*Description*/}
<CForm>
  <CFormTextarea
    id="describe"
    label="Description"
    rows={3}
    name="tdescription"
    value={formData.tdescription}
    onChange={handleInputChange}
    placeholder='describe Your way'
  ></CFormTextarea>
</CForm>
{/*CO^2*/}
 <CFormCheck id="flexCheckDefault" 
 label={
    <span>
      CO<sub>2</sub>
    </span>
  } />
    {/*Name*/}
    <CCol xs="auto">
    <CFormLabel htmlFor="validationName">Name*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Sensor Name"
    name="coName"
    value={formData.coName}
    onChange={handleInputChange}
    feedbackInvalid="Name is required"
    id="validationName"
    required />
  </CCol>
  {/* Min*/}
  <CCol xs="auto">
  <CFormLabel htmlFor="validationMin">Min*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Minimum Value"   
    name="coMin"
    value={formData.coMin}
    onChange={handleInputChange}
    feedbackInvalid="Minimum value is required"
    id="validationMin"
    required/>
  </CCol>
  {/* Max*/}
  <CCol xs="auto">
    <CFormLabel htmlFor="validationMax">Max*</CFormLabel>
    <CFormInput type="name" placeholder="Enter Maximum Value"  
     name="coMax"
     value={formData.coMax}
     onChange={handleInputChange}
     feedbackInvalid="Maximum Value is required"
     id="validationMax"
     required
   />
  </CCol>
 {/*Unit*/}
 <CCol xs="auto">
 <CFormLabel htmlFor="validationUnit">Unit*</CFormLabel>
    <CFormSelect aria-label="Default select example" id='unit' name='coUnit'
    value={formData.coUnit}
    onChange={handleInputChange}
    feedbackInvalid="Unit is required" 
    required  >
  <option>Open this select menu</option>
  <option value="1">--Name--</option>
  <option value="2">C*</option>
  <option value="3">F-</option>
</CFormSelect>

  </CCol>
{/* Hide on dashboard*/}
<CCol xs="auto">
<CFormLabel htmlFor="validationTypeSensorId"></CFormLabel>
<CFormCheck reverse id="reverseCheckbox1" value="option1" label="Hide on dashboard"/>
</CCol>
{/*Description*/}
<CForm>
  <CFormTextarea
    id="describe"
    label="Description"
    rows={3}
    name="coDescription"
    value={formData.coDescription}
    onChange={handleInputChange}
    placeholder='describe Your way'
  ></CFormTextarea>
</CForm>
{/*Humadity*/}
 <CFormCheck id="flexCheckDefault" label="Humadity"/>
    {/*Name*/}
    <CCol xs="auto">
    <CFormLabel htmlFor="validationName">Name*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Sensor Name"
    name="hName"
    value={formData.hName}
    onChange={handleInputChange}
    feedbackInvalid="Name is required"
    id="validationName"
    required />
  </CCol>
  {/* Min*/}
  <CCol xs="auto">
  <CFormLabel htmlFor="validationMin">Min*</CFormLabel>
    <CFormInput type="name"  placeholder="Enter Minimum Value"   
    name="hMin"
    value={formData.hMin}
    onChange={handleInputChange}
    feedbackInvalid="Minimum value is required"
    id="validationMin"
    required/>
  </CCol>
  {/* Max*/}
  <CCol xs="auto">
    <CFormLabel htmlFor="validationMax">Max*</CFormLabel>
    <CFormInput type="name" placeholder="Enter Maximum Value"  
     name="hMax"
     value={formData.hMax}
     onChange={handleInputChange}
     feedbackInvalid="Maximum Value is required"
     id="validationMax"
     required
   />
  </CCol>
 {/*Unit*/}
 <CCol xs="auto">
 <CFormLabel htmlFor="validationUnit">Unit*</CFormLabel>
    <CFormSelect aria-label="Default select example" id='unit' name='hUnit'
    value={formData.hUnit}
    onChange={handleInputChange}
    feedbackInvalid="Unit is required" 
    required  >
  <option>Open this select menu</option>
  <option value="1">--Name--</option>
  <option value="2">C*</option>
  <option value="3">F-</option>
</CFormSelect>

  </CCol>
{/* Hide on dashboard*/}
<CCol xs="auto">
<CFormLabel htmlFor="validationTypeSensorId"></CFormLabel>
<CFormCheck reverse id="reverseCheckbox1" value="option1" label="Hide on dashboard"/>
</CCol>
{/*Description*/}
<CForm>
  <CFormTextarea
    id="describe"
    label="Description"
    rows={3}
    name="hDescription"
    value={formData.hDescription}
    onChange={handleInputChange}
    placeholder='describe Your way'
  ></CFormTextarea>
</CForm>
{/*Button*/}
<CCol xs="auto">
      <CButton  type="submit" variant="outline" timeout={2000}>
        Cancel form
      </CButton>
    </CCol>

 {/* Submit Button */}
<CCol xs="auto">
      <CButton color="primary" type="submit">
        Submit form
      </CButton>
    </CCol>
  </CForm>
  )
}

 

export default AddSensorConfigration