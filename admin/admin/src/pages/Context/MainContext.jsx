import React, { createContext, useEffect, useState } from 'react'
export let loginContext = createContext()
export default function MainContext({children}) {

    let [adminId, setAdminId] = useState(localStorage.getItem('ADMINID')?? "")

    useEffect(()=>{
        localStorage.setItem("ADMINID", adminId)
    },[adminId])

    let obj = {
        adminId,
        setAdminId
    }

  return (
    <loginContext.Provider value={obj}>
      {children}
    </loginContext.Provider>
  )
}
