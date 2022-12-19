// Page Component imports
import MainPageGame from "../components/pages/MainPageGame"
import StatisticPage from "../components/pages/Statistic"
import ChessBoardPage from "../components/pages/ChessBoardPage"
import TablePage from "../components/pages/TablePage"

// Pathes
export const MAIN_PATH = "/main"
export const STATISTIC_PATH = "/statistic"
export const CHESS_BOARD_PATH = "/chess-board"
export const TABLE_PATH = "/table"

// Routes
const routes = [
  {path: MAIN_PATH, Component: MainPageGame},
  {path: STATISTIC_PATH, Component: StatisticPage},
  {path: CHESS_BOARD_PATH, Component: ChessBoardPage},
  {path: TABLE_PATH, Component: TablePage}
]
export default routes