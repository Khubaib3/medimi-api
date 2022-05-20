import config from "../../../configs/config"
import PatientModel from "../../../models/patient"

import { UserController } from '../user/controller'

export class PatientController {

  removeProperty = config.removeProperty

  userController = new UserController()

  testController() {
    try {
      return Promise.resolve("Patient Yep!")
    } catch (error) {
      return error
    }
  }

  async createIndPatient(payload) {
    try {

      const user: any = await this.userController.register(payload)

      if(!user) return Promise.reject("Failed to create new user")

      let medimiId = `SN-P${Math.floor(Math.random() * 1000)}`

      let patientData = payload

      patientData.user = user._id
      patientData.medimiId = medimiId
      patientData.status = "Active"

      const newPatient: any = await PatientModel.create(patientData)

      if(!newPatient) return Promise.reject("Failed to create new independent patient")

      return Promise.resolve(newPatient)
      
    } catch (error) {
      return error
    }
  }

  // Creating patient for the system without user account
  async createPatient(payload) {
    try {

      const { email, phoneNumber, firstName } = payload

      if(!email || !phoneNumber || !firstName) return Promise.reject("Please enter all the required fields")

      let medimiId = `SN-P${Math.floor(Math.random() * 1000)}`

      let patientPayload = payload

      patientPayload.medimiId = medimiId
      patientPayload.status = 'Active'
      patientPayload.type = 'Independent'


      const patient: any = await PatientModel.create(patientPayload)

      if(!patient) return Promise.reject("Failed to create new patient")

      return Promise.resolve(patient)
      
    } catch (error) {
      return error
    }
  }

  async searchPatient(payload) {
    try {
      
      let searchPatient: any

      if(payload.type === 'medimiId') searchPatient = await PatientModel.findOne({ medimiId: payload.text }).select(['-__v', '-createdAt', '-updatedAt'])
      if(payload.type === 'email') searchPatient = await PatientModel.findOne({ email: payload.text }).select(['-__v', '-createdAt', '-updatedAt'])
      if(payload.type === 'phoneNumber') searchPatient = await PatientModel.findOne({ phoneNumber: payload.text }).select(['-__v', '-createdAt', '-updatedAt'])


      return Promise.resolve(searchPatient)

    } catch (error) {
      return error
    }
  }

  async updatePatient(id, payload) {
    try {
      
      const patient = await PatientModel.findByIdAndUpdate(id, payload)

      if(!patient) return Promise.reject(patient)

      const finalPatient: any = await PatientModel.findOne({ _id: id }).select(['-__v', '-createdAt', '-updatedAt'])

      return Promise.resolve(finalPatient)

    } catch (error) {
      return error
    }
  }

  async updateProfileImage(id, payload) {
    try {

      const patient = await PatientModel.findByIdAndUpdate(id, { imageURL: payload })

      if(!patient) return Promise.reject("Failed to update patient profile")

      const finalPatient: any = await PatientModel.findOne({ _id: id }).select(['-__v', '-createdAt', '-updatedAt'])

      return Promise.resolve(finalPatient)

    } catch (error) {
      return error
    }
  }

  async loginPatient(payload) {
    try {

      const { username, password } = payload

      if(!password) return Promise.reject("Please enter all the required fields")

      let searchPatient: any = await PatientModel.findOne({ $or: [ { 'email': username }, { 'medimiId': username } ] })

      if(!searchPatient) return Promise.reject("User doesn't exist")

      let loginPayload = { email: searchPatient.email, password: password }

      let user: any = await this.userController.login(loginPayload)

      if(!user) return Promise.reject("Incorrect username or password")

      let tmpDoc = this.removeProperty('firstName', searchPatient)

      let finalDoc = tmpDoc._doc

      finalDoc.user = user

      return Promise.resolve(finalDoc)
      
    } catch (error) {
      return error
    }
  }


}