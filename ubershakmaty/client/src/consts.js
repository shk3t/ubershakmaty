import MainPageGame from "./components/pages/MainPageGame"
import StatisticPage from "./components/pages/Statistic"

// Pathes
export const MAIN_PATH = "/main"
export const STATISTIC_PATH = "/statistic"

// Routes
export const routes = [
  { path: MAIN_PATH, Component: MainPageGame},
  { path: STATISTIC_PATH, Component: StatisticPage}
]
