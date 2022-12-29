import {publicConfig} from "../http"

export default class GameService {
  static async getRating(credentials) {
    const response = await publicConfig.get("/game/get_rating", credentials)
    return response.data
  }
}