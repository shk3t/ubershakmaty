import {publicConfig, withCredentialsConfig} from "../http"

export default class AuthService {
  static async register(credentials) {
    const response = await publicConfig.post("/game/register", credentials)
    return response.data
  }
  static async login(credentials) {
    const response = await publicConfig.post("/game/login", credentials)
    return response.data
  }
  static async logout() {
    await publicConfig.post("game/logout")
  }
  static async refreshTokens() {
    const response = await withCredentialsConfig.post("/game/tokens/refresh")
    return response.data
  }
}
