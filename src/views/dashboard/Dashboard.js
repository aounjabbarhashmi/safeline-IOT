import React from 'react'
import { useGlobalInfo } from 'src/global-context/GlobalContext'
const Dashboard = () => {
  const { departmentId } = useGlobalInfo()
  return (
    <>
      <iframe
        title="Child App"
        src={`http://iot-dashboard-fe.s3-website-us-east-1.amazonaws.com/?systemId=${departmentId}&themeColor=light`}
        width="100%"
        height="550px"
      />
    </>
  )
}

export default Dashboard
