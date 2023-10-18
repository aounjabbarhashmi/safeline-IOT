import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { useMutation } from 'react-query'
import { getDepartmentsData, getFacilitiesData, getOrganizationData } from 'src/hooks/useAuth'
import { useLoader } from 'src/global-context/LoaderContext'
import { useNavigate } from 'react-router-dom'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
import useStore from 'src/store/state'
import useDataStore from 'src/store/state'

const AppHeader = () => {
  const addData = useDataStore((state) => state.addData)
  const { setDepartmentId } = useGlobalInfo()
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const dispatched = useDispatch()
  const [organizationData, setOrganizationData] = useState([])
  const [facilityData, setFacilityData] = useState([])
  const [departmentsData, setDepartmentsData] = useState([])
  const [selectedOrganizationId, setSelectedOrganizationId] = useState('Select Organization')
  const [selectedFacilityId, setSelectedFacilityId] = useState('Select Facility')
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('Select Department')
  const handleOrganizationChange = (event) => {
    setDepartmentId('')
    setSelectedFacilityId('Select Facility')
    setSelectedDepartmentId('Select Department')
    const selectedId = event.target.value
    setSelectedOrganizationId(selectedId)
    facilitiesDataFetch(selectedId)
  }
  const handleFacilityChange = (event) => {
    const selectedId = event.target.value
    setSelectedFacilityId(selectedId)
    departmentsDataFetch(selectedId)
  }
  const handleDepartmentChange = (event) => {
    const selectedId = event.target.value
    setSelectedDepartmentId(selectedId)
    setDepartmentId(selectedId)
  }

  const sidebarShow = useSelector((state) => state.sidebarShow)
  const { mutate: getOrganization } = useMutation(getOrganizationData)
  function organizationDataFetch() {
    getOrganization('', {
      onSuccess: (data) => {
        hideLoader()
        setOrganizationData(data)
        addData(data)
      },
      onError: (error) => {
        if (error.code === 'ERR_BAD_REQUEST') {
          localStorage.removeItem('token')
          navigate('/login')
        }
        hideLoader()
      },
    })
  }
  const { mutate: getFacilities } = useMutation(getFacilitiesData)
  function facilitiesDataFetch(selectedId) {
    showLoader()
    getFacilities(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setFacilityData(data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  const { mutate: getDepartments } = useMutation(getDepartmentsData)
  function departmentsDataFetch(selectedId) {
    showLoader()
    getDepartments(selectedId, {
      onSuccess: (data) => {
        hideLoader()
        setDepartmentsData(data)
      },
      onError: (error) => {
        hideLoader()
      },
    })
  }
  useEffect(() => {
    showLoader()
    organizationDataFetch()
  }, [])
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatched({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto gap-4">
          <CNavItem>
            <CFormSelect
              size="sm"
              className=""
              aria-label="Organization"
              onChange={handleOrganizationChange}
              value={selectedOrganizationId}
            >
              <option>Select Organization</option>
              {organizationData?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.organizationName}
                  </option>
                )
              })}
            </CFormSelect>
          </CNavItem>
          <CNavItem>
            <CFormSelect
              size="sm"
              className=""
              aria-label="Facility"
              onChange={handleFacilityChange}
              value={selectedFacilityId}
            >
              <option>Select Facility</option>
              {facilityData?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.systemName}
                  </option>
                )
              })}
            </CFormSelect>
          </CNavItem>
          <CNavItem>
            <CFormSelect
              size="sm"
              className=""
              aria-label="Department"
              onChange={handleDepartmentChange}
              value={selectedDepartmentId}
            >
              <option>Select Department</option>
              {departmentsData?.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </CFormSelect>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
