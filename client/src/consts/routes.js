// Page Component imports
import MainPage from "../components/pages/MainPage"
import StatisticsPage from "../components/pages/StatisticsPage"
import ChessBoardPage from "../components/pages/ChessBoardPage"
import TablePage from "../components/pages/TablePage"
import AuthPage from "../components/pages/AuthPage"
import SettingsPage from "../components/pages/SettingsPage"

// Pathes
export const MAIN_PATH = "/main"
export const STATISTIC_PATH = "/statistic"
export const CHESS_BOARD_PATH = "/chess-board"
export const TABLE_PATH = "/table"
export const AUTH_PATH = "/auth"
export const SETTINGS_PATH = "/settings"

// Routes
const baseRoutes = [
  {path: MAIN_PATH, Component: MainPage},
  {path: TABLE_PATH, Component: TablePage},
]
export const publicRoutes = [
  ...baseRoutes,
  {path: AUTH_PATH, Component: AuthPage},
]
export const authRoutes = [
  ...baseRoutes,
  {path: CHESS_BOARD_PATH, Component: ChessBoardPage},
  {path: STATISTIC_PATH, Component: StatisticsPage},
  {path: SETTINGS_PATH, Component: SettingsPage},
]