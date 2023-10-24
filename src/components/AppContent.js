import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useLoader } from 'src/global-context/LoaderContext'
import GlobalLoader from './global-loader/GlobalLoader'
import { useGlobalInfo } from 'src/global-context/GlobalContext'

const AppContent = () => {
  const { isLoading } = useLoader()
  // const { loading, setLoading } = useGlobalInfo()

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <CContainer lg>
          <Suspense fallback={<CSpinner color="primary" />}>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                )
              })}
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </Suspense>
        </CContainer>
      )}
    </>
  )
}

export default React.memo(AppContent)
