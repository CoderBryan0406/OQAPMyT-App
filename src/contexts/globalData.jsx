import React, { createContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

export const GlobalDataContext = createContext()

export const GlobalDataProvider = ({ children }) => {
   const [formData, setFormData] = useState({
     buyingTravelInsurance: "",
     travelLocally: "",
     isReturning: "",
     planType: "",
     travelPurpose: "",
     from: "",
     to: "",
     destinations: "",
     numberOfDays: "",
     coverageFrom: "",
     coverageTo: "",
   });

  const contextValue = useMemo(
    () => ({
      formData,
      setFormData,
    }),
    [formData, setFormData]
  )

  return <GlobalDataContext.Provider value={contextValue}>{children}</GlobalDataContext.Provider>
}

GlobalDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
