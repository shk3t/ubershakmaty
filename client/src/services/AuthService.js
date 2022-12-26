import {publicConfig, withCredentialsConfig} from "../http"
import {loadScript} from "../utils"

export default class AuthService {
  static async register(credentials) {
    const response = await publicConfig.post("/auth/register", credentials)
    return response.data
  }
  static async login(credentials) {
    const response = await publicConfig.post("/auth/login", credentials)
    return response.data
  }
  static async socialLogin(credentials) {
    const response = await publicConfig.post("/auth/login/social", credentials)
    return response.data
  }
  static async logout() {
    await publicConfig.post("/auth/logout")
  }
  static async refreshTokens() {
    const response = await withCredentialsConfig.post("/auth/tokens/refresh")
    return response.data
  }
}

AuthService.SocialAccounts = class {
  static initGoogle({client_id, callback}) {
    const src = "https://accounts.google.com/gsi/client"
    loadScript(src).then(() => {
      /* global google */
      google.accounts.id.initialize({client_id, callback})
      google.accounts.id.renderButton(
        document.getElementsByClassName("googleSignIn")[0],
        {theme: "outline", size: "large"}
      )
    })
  }
}