import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAudio,
  cilAudioSpectrum,
  cilBarChart,
  cilBuilding,
  cilCast,
  cilDevices,
  cilLibraryBuilding,
  cilPeople,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Admin',
    // to: '/base',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Organizations',
        to: '/organizations',
        icon: <CIcon icon={cilLibraryBuilding} customClassName="nav-icon ps-4" />,
      },
      {
        component: CNavItem,
        name: 'Facilities',
        to: '/Facilities',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon ps-4" />,
      },
      {
        component: CNavItem,
        name: 'Department',
        to: '/department',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon ps-4" />,
      },
      {
        component: CNavItem,
        name: 'Devices',
        to: '/devices',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon ps-4" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'User Management',
    to: '/user-management',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Sensor Setup',
    icon: <CIcon icon={cilAudio} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Organization Sensors',
        to: '/organization-sensors',
        icon: <CIcon icon={cilAudioSpectrum} customClassName="nav-icon ps-4" />,
      },
      {
        component: CNavItem,
        name: 'Devices Sensors',
        to: '/devices-sensors',
        icon: <CIcon icon={cilCast} customClassName="nav-icon ps-4" />,
      },
    ],
  },
]

export default _nav
