import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Organization = React.lazy(() => import('./views/pages/admin/organization/Organization'))
const Department = React.lazy(() => import('./views/pages/admin/department/Department'))
const Devices = React.lazy(() => import('./views/pages/admin/devices/Devices'))
const Facilities = React.lazy(() => import('./views/pages/admin/facilities/Facilities'))
const UserManagement = React.lazy(() => import('./views/pages/management/UserManagement'))
const DevicesSensors = React.lazy(() =>
  import('./views/pages/sensors/devices-sensors/DevicesSensors'),
)
const OrganizationSensors = React.lazy(() =>
  import('./views/pages/sensors/organization-sensors/OrganizationSensor'),
)

const userRole = localStorage.getItem('roles') // Replace with the actual user role

const routes = [
  { path: '/', exact: true, name: 'Home' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/base/accordion',
    name: 'Accordion',
    element: Accordion,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/base/breadcrumbs',
    name: 'Breadcrumbs',
    element: Breadcrumbs,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/organizations',
    name: 'Organization',
    element: Organization,
    permissions: ['SuperAdmin'],
  },
  {
    path: '/facilities',
    name: 'Facilities',
    element: Facilities,
    permissions: ['SuperAdmin', 'OrganizationAdmin'],
  },
  {
    path: '/department',
    name: 'Department',
    element: Department,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin'],
  },
  {
    path: '/devices',
    name: 'Devices',
    element: Devices,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    element: UserManagement,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/organization-sensors',
    name: 'OrganizationSensors',
    element: OrganizationSensors,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
  {
    path: '/devices-sensors',
    name: 'DevicesSensors',
    element: DevicesSensors,
    permissions: ['SuperAdmin', 'OrganizationAdmin', 'FacilityAdmin', 'DepartmentAdmin'],
  },
]

// Filter the routes based on the user's role
const filteredRoutes = routes.filter((route) => {
  if (!route.permissions || route.permissions.includes(userRole)) {
    return true
  }
  return false
})

export default filteredRoutes
