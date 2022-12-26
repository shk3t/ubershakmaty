import React, {useMemo, useState} from "react"
import {useSelector} from "react-redux"
import {Routes, Route, Navigate} from "react-router-dom"
import {authRoutes, MAIN_PATH, publicRoutes} from "../consts/routes"

export default function AppRouter() {
  const authUser = useSelector((state) => state.authReducer.authUser)
  const [routes, setRoutes] = useState([])

  useMemo(() => {
    setRoutes(authUser ? authRoutes : publicRoutes)
  }, [authUser])

  return (
    <Routes>
      {routes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={MAIN_PATH} />} />
    </Routes>
  )
}