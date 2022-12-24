import {publicConfig, withCredentialsConfig} from "../http"

export default class AuthService {
  static async register(credentials) {
    const response = await publicConfig.post("/auth/register", credentials)
    return response.data
  }
  static async login(credentials) {
    const response = await publicConfig.post("/auth/login", credentials)
    return response.data
  }
  static async logout() {
    await publicConfig.post("/auth/logout")
  }
  static async refreshTokens() {
    const response = await withCredentialsConfig.post("/auth/tokens/refresh")
    return response.data
  }
  static async socialLogin(provider) {
    await publicConfig.post(`/accounts/${provider}/login`)
  }
}