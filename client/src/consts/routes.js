// Page Component imports
import MainPage from "../components/pages/MainPage"
import StatisticsPage from "../components/pages/StatisticsPage"
import ChessBoardPage from "../components/pages/ChessBoardPage"
import TablePage from "../components/pages/TablePage"
import LoginPage from "../components/pages/LoginPage"
import RegisterPage from "../components/pages/RegisterPage"
import SettingsPage from "../components/pages/SettingsPage"

// Pathes
export const MAIN_PATH = "/main"
export const STATISTIC_PATH = "/statistic"
export const CHESS_BOARD_PATH = "/chess-board"
export const TABLE_PATH = "/table"
export const LOGIN_PATH = "/login"
export const REGISTER_PATH = "/register"
export const SETTINGS_PATH = "/settings"

// Routes
const routes = [
  {path: MAIN_PATH, Component: MainPage},
  {path: STATISTIC_PATH, Component: StatisticsPage},
  {path: CHESS_BOARD_PATH, Component: ChessBoardPage},
  {path: TABLE_PATH, Component: TablePage},
  {path: LOGIN_PATH, Component: LoginPage},
  {path: REGISTER_PATH, Component: RegisterPage},
  {path: SETTINGS_PATH, Component: SettingsPage},
]
export default routes