import config from "../../../configs/config"
import AppointmentModel from "../../../models/appointment"

export class AppointmentController {

  testController() {
    try {
      return Promise.resolve("Appointment Yep!")
    } catch (error) {
      return error
    }
  }

  async createAppointment(payload) {
    try {

      let medimiId = `SN-AP${Math.floor(Math.random() * 1000)}`

      let appData = payload

      appData.medimiId = medimiId
      appData.status = "Scheduled"

      const newApp: any = await AppointmentModel.create(appData)

      if(!newApp) return Promise.reject("Failed to create new appointment")

      return Promise.resolve(newApp)
      
    } catch (error) {
      return error
    }
  }

  async updateAppointment(id, payload) {
    try {

      const newApp: any = await AppointmentModel.findByIdAndUpdate(id, payload)

      if(!newApp) return Promise.reject("Failed to update appointment")

      const finalApp: any = await AppointmentModel.findOne({ _id: id }).select(['-__v', '-createdAt', '-updatedAt'])

      return Promise.resolve(finalApp)
      
    } catch (error) {
      return error
    }
  }

  async deleteAppointment(id) {
    try {

      const del: any = await AppointmentModel.findByIdAndDelete(id)

      if(!del) return Promise.reject("Failed to delete appointment")

      return "Appointment removed successfully"
      
    } catch (error) {
      return error
    }
  }

}