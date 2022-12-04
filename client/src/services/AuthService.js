import {publicConfig, withCredentialsConfig} from "../http"

export default class AuthService {
  static async register(credentials) {
    const response = await publicConfig.post("/api/register", credentials)
    return response.data
  }
  static async login(credentials) {
    const response = await publicConfig.post("/api/login", credentials)
    return response.data
  }
  static async logout() {
    await publicConfig.post("api/logout")
  }
  static async refreshTokens() {
    const response = await withCredentialsConfig.post("/api/tokens/refresh")
    return response.data
  }
}
