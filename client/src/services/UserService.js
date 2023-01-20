import {authConfig} from "../http"

export default class UserService {
  static async getAuthUser() {
    const response = await authConfig.get("/user/current")
    return response.data
  }
  static async updateAuthUser(data) {
    const {picture, ...otherData} = data

    if (picture) {
      const formData = new FormData()
      formData.append("picture", picture)
      await authConfig.put(`/user/current/picture`, formData)
    }

    const response = await authConfig.put(`/user/current`, otherData)
    return response.data
  }
  static async deleteProfilePicture() {
    await authConfig.delete(`/user/current/picture`)
  }
}