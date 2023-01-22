import React, {useMemo, useState} from "react"
import {useSelector} from "react-redux"
import {Routes, Route, Navigate} from "react-router-dom"
import {authRoutes, gameRoute, MAIN_PATH, publicRoutes} from "../consts/routes"

export default function AppRouter() {
  const authUser = useSelector((state) => state.authReducer.authUser)
  const gameId = useSelector((state) => state.gameReducer.gameId)
  const [routes, setRoutes] = useState([])

  useMemo(() => {
    const routes = authUser ? authRoutes : publicRoutes
    if (gameId) routes.push(gameRoute)
    setRoutes(routes)
  }, [authUser, gameId])

  return (
    <Routes>
      {routes.map(({path, Component}) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={MAIN_PATH} />} />
    </Routes>
  )
}