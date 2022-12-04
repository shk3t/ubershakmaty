import MainPageGame from "./components/pages/MainPageGame"
import StatisticPage from "./components/pages/Statistic"

// Host
export const BASE_URL = "http://127.0.0.1:8000";

// Pathes
export const MAIN_PATH = "/main"
export const STATISTIC_PATH = "/statistic"

// Routes
export const routes = [
  { path: MAIN_PATH, Component: MainPageGame},
  { path: STATISTIC_PATH, Component: StatisticPage}
]
