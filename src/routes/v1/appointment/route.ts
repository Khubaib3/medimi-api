import express, { Router, Request, Response } from 'express'
import { AppointmentController } from './controller'
import config from '../../../configs/config'

const appointmentController = new AppointmentController()
const { TRUE, TRUEMSG, FALSE } = config


const appointmentRoute: Router = express.Router()

appointmentRoute.get('/', async(req: Request, res: Response) => {
  try {

    const result: any = await appointmentController.testController()
    
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

appointmentRoute.post('/', async(req: Request, res: Response) => {
  try {

    const result: any = await appointmentController.createAppointment(req.body)
    
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

appointmentRoute.put('/:id/', async(req: Request, res: Response) => {
  try {

    const result: any = await appointmentController.updateAppointment(req.params.id, req.body)
    
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

appointmentRoute.delete('/:id/', async(req: Request, res: Response) => {
  try {

    const result: any = await appointmentController.deleteAppointment(req.params.id)
    
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

export default appointmentRoute