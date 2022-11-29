import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import {MAIN_PATH, routes} from "../consts"

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
