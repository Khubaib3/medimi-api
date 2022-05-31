import express, { Router, Request, Response } from 'express'
import { DoctorController } from './controller'
import config from '../../../configs/config'

const doctorController = new DoctorController()
const { TRUE, TRUEMSG, FALSE } = config


const doctorRoute: Router = express.Router()

doctorRoute.get('/', async(req: Request, res: Response) => {
  try {

    const result: any = await doctorController.testControllerD()
    
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

doctorRoute.post('/independent/', async(req: Request, res: Response) => {
  try {

    const result: any = await doctorController.createIndDoctor(req.body)
    
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

doctorRoute.post('/login/', async(req: Request, res: Response) => {
  try {

    const result: any = await doctorController.loginDoctor(req.body)
    
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

doctorRoute.get('/:id/', async(req: Request, res: Response) => {
  try {

    const result: any = await doctorController.getDoctor(req.params.id)
    
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

doctorRoute.put('/:id/', async(req: Request, res: Response) => {
  try {

    const result: any = await doctorController.updateDoctor(req.params.id, req.body)
    
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

export default doctorRoute