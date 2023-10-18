import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useLoader } from 'src/global-context/LoaderContext'
import { getOrganizationData } from 'src/hooks/useAuth'
import useDataStore from 'src/store/state'
import useStore from 'src/store/state'
import GenericTable from 'src/views/table/GenericTable'
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'organizationName', label: 'Organization Name' },
  { key: 'organizationContact', label: 'Organization Contact' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'address', label: 'Address' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'postcode', label: 'Postcode' },
  // Add more columns as needed
]
const Organization = () => {
  // const [ setOrganizationData] = useState([])
  // const organizationData = useStore((state) => state.organizationData)
  const data = useDataStore((state) => state.data)
  const { dispatch } = useLoader()
  const navigate = useNavigate()
  const showLoader = () => dispatch({ type: 'SHOW_LOADER' })
  const hideLoader = () => dispatch({ type: 'HIDE_LOADER' })
  const { mutate: getOrganization } = useMutation(getOrganizationData)
  function organizationDataFetch() {
    // showLoader()
    getOrganization('', {
      onSuccess: (data) => {
        hideLoader()
        // setOrganizationData(data)
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
  return (
    <div>
      <h1>Generic Table Example</h1>
      <GenericTable columns={columns} data={data[0]} />
    </div>
  )
}

export default Organization
