import {publicConfig} from "../http"
import axios from "axios";

const API_URL = 'http://localhost:8000';

export default class GameService {
  static async getRating(credentials) {
    const response = await publicConfig.get("/game/get_rating", credentials)
    return response.data
  }

  static async getGamesData(credentials) {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/game/get_last_games`,
      headers: {
        'content-type': 'application/json'
      },
      data: {
        user: credentials['user']
      }
    });
    return response.data
  }
}

