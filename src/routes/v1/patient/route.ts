import express, { Router, Request, Response } from 'express'
import { PatientController } from './controller'
import config from '../../../configs/config'

// uploads stuff
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

// START == Upload settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/bucket/patient-docs')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname)
  }
})

const upload = multer({ storage: storage })

// END == Upload settings

const patientController = new PatientController()
const { TRUE, TRUEMSG, FALSE } = config


const patientRoute: Router = express.Router()

patientRoute.get('/', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.testController()
    
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

patientRoute.post('/', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.createPatient(req.body)
    
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

patientRoute.post('/independent/', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.createIndPatient(req.body)
    
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

patientRoute.put('/:id', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.updatePatient(req.params.id, req.body)
    
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

patientRoute.put('/:id/profile-image', upload.single('avatar'), async (req: Request, res: Response) => {
  try {

    const result: any = await patientController.updateProfileImage(req.params.id, req.file.filename)

    return res.json({
      success: TRUE,
      message: TRUEMSG,
      result: result
    })

    
  } catch (error) {
    res.json({
      success: FALSE,
      messsage: error
    })
  }
})

patientRoute.post('/search/', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.searchPatient(req.body)
    
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

patientRoute.post('/login/', async(req: Request, res: Response) => {
  try {

    const result: any = await patientController.loginPatient(req.body)
    
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


export default patientRoute