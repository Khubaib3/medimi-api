import config from "../../../configs/config"
import UserModel from "../../../models/user"

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserController {
  
  saltRounds: number = 10

  removeProperty = config.removeProperty

  testController() {
    try {
      return Promise.resolve("User Yep!")
    } catch (error) {
      return error
    }
  }

  async register(payload) {
    try {
      const { email, password, userType } = payload

      const searchUser: any = await UserModel.findOne({ email: email })

      if (searchUser) return Promise.reject("Email already exists")

      const salt = bcrypt.genSaltSync(this.saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      const newUser: any = await UserModel.create({
        email: email.toString().toLowerCase().trim(),
        userType,
        password: hash,
        resetPassword: false
      })

      const token = jwt.sign({ user_id: newUser._id, email }, config.SECRET, {
        expiresIn: "2h",
      })

      newUser.token = token

      await UserModel.findByIdAndUpdate(newUser._id, {
        token: token,
      })

      return Promise.resolve(newUser)
      
    } catch (error) {
      return error
    }
  }

  async login(payload) {
    try {
      
      const { email, password } = payload

      if(!email || !password) return Promise.reject("Please enter all the required fields")

      const user: any = await UserModel.findOne({ email: email })

      if (!user) return Promise.reject("User doesn't exist")

      const doPasswordMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!doPasswordMatch) return Promise.resolve(null)

      const token = jwt.sign(
        { userId: user._id, email },
        config.SECRET,
        { expiresIn: "2h" }
      )

      const finalUser = await UserModel.findByIdAndUpdate(
        user._id,
        { token: token },
        { new: true }
      )

      let loggedInUser = this.removeProperty('password', finalUser)

      let lastUser = loggedInUser._doc

      delete lastUser["password"]
      delete lastUser["createdAt"]
      delete lastUser["updatedAt"]
      delete lastUser["__v"]


      return Promise.resolve(lastUser)

    } catch (error) {
      return error
    }
  }
}