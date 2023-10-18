import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

// eslint-disable-next-line react/prop-types
export const GlobalProvider = ({ children }) => {
  const [departmentId, setDepartmentId] = useState('')
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <GlobalContext.Provider
      value={{
        departmentId,
        setDepartmentId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalInfo = () => {
  return useContext(GlobalContext)
}
