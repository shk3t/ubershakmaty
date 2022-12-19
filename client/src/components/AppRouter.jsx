import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import routes, {MAIN_PATH} from "../consts/routes"

export default function AppRouter() {
  return (
    <Routes>
      {routes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={MAIN_PATH} />} />
    </Routes>
  )
}