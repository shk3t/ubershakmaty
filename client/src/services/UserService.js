import {authConfig} from "../http"

export default class UserService {
  static async getAuthUser() {
    const response = await authConfig.get("/user/current")
    return response.data
  }
  static async updateAuthUser(data) {
    const response = await authConfig.put(`/user/current`, data)
    return response.data
  }
  static async uploadProfilePicture(image) {
    const formData = new FormData()
    formData.append("picture", image)
    const response = await authConfig.put(`/user/current/picture`, formData)
    return response.data
  }
  static async deleteProfilePicture(productId) {
    await authConfig.delete(`/user/current/picture`)
  }
}