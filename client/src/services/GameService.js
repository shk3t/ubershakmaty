import {authConfig, publicConfig} from "../http"

export default class GameService {
  static async getRating(credentials) {
    const response = await publicConfig.get("/game/get_rating", credentials)
    return response.data
  }

  static async getGamesData(user) {
    const response = await publicConfig.post("/game/get_last_games", {user})
    return response.data
  }

  static async initGame(timeMode, user) {
    const response = await authConfig.post("/game/init_game", {
      user,
      timer: timeMode,
    })
    return response.data
  }

  static async makeMove(gameId, moveUci) {
    const response = await authConfig.post("/game/make_move", {
      game_id: gameId, move_uci: moveUci
    })
    return response.data
  }
}