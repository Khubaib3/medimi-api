import config from "../../../configs/config"
import DoctorModel from "../../../models/doctor"
import UserModel from "../../../models/user"

import { UserController } from '../user/controller'

export class DoctorController {

  removeProperty = config.removeProperty

  userController = new UserController()

  testControllerD() {
    try {
      return Promise.resolve("Doctor Yep!")
    } catch (error) {
      return error
    }
  }

  async createIndDoctor(payload) {
    try {

      const user: any = await this.userController.register(payload)

      if(!user) return Promise.reject("Failed to create new user")

      let medimiId = `SN-M${Math.floor(Math.random() * 1000)}`

      const newDoctor: any = await DoctorModel.create({
        user: user._id,
        medimiId: medimiId,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        dob: payload.dob,
        sex: payload.sex,
        title: payload.title,
        licenseType: 'AD1',
        type: 'Independent',
        status: 'Active'
      })

      if(!newDoctor) return Promise.reject("Failed to create new Doctor")

      return Promise.resolve(newDoctor)

    } catch (error) {
      return error
    }
  }

  async loginDoctor(payload) {
    try {

      const { username, password } = payload

      if(!password) return Promise.reject("Please enter all the required fields")

      let searchDoctor: any = await DoctorModel.findOne({ $or: [ { 'email': username }, { 'medimiId': username } ] })

      if(!searchDoctor) return Promise.reject("User doesn't exist")

      let loginPayload = { email: searchDoctor.email, password: password }

      let user: any = await this.userController.login(loginPayload)

      if(!user) return Promise.reject("Login failed")

      let tmpDoc = this.removeProperty('firstName', searchDoctor)

      let finalDoc = tmpDoc._doc

      finalDoc.user = user

      return Promise.resolve(finalDoc)
      
    } catch (error) {
      return error
    }
  }

  async updateDoctor(id, payload) {
    try {

      const doctor: any = await DoctorModel.findByIdAndUpdate(id, payload)

      if(!doctor) return Promise.reject("Could not update doctor")

      const finalDoc: any = await DoctorModel.findOne({ _id: id }).select(['-__v', '-createdAt', '-updatedAt'])

      return Promise.resolve(finalDoc)
      
    } catch (error) {
      return error
    }
  }

  async deleteDoctor() {

  }

  async getDoctors() {

  }

  async getDoctor(id) {
    try {

      const doctor: any = await DoctorModel.findOne({ _id: id }).select(['-__v', '-createdAt', '-updatedAt'])

      if(!doctor) return Promise.reject("Could not find doctor")

      return Promise.resolve(doctor)
      
    } catch (error) {
      return Promise.reject(error)
    }
  }

}