import express, { Router, Request, Response } from 'express'
import { UserController } from './controller'
import config from '../../../configs/config'

const userController = new UserController()
const { TRUE, TRUEMSG, FALSE } = config


const userRoute: Router = express.Router()

userRoute.get('/', async(req: Request, res: Response) => {
  try {

    const result: any = await userController.testController()
    
    return res.json({
      success: TRUE,
      message: TRUEMSG,
      result: result
    })
  } catch (error) {
    res.json({
      success: FALSE,
      message: error
    })
  }
})

userRoute.post('/register', async(req: Request, res: Response) => {
  try {

    const result: any = await userController.register(req.body)
    
    return res.json({
      success: TRUE,
      message: TRUEMSG,
      result: result
    })
  } catch (error) {
    res.json({
      success: FALSE,
      message: error
    })
  }
})

userRoute.post('/login', async(req: Request, res: Response) => {
  try {

    const result: any = await userController.login(req.body)
    
    return res.json({
      success: TRUE,
      message: TRUEMSG,
      result: result
    })
  } catch (error) {
    res.json({
      success: FALSE,
      message: error
    })
  }
})

export default userRoute