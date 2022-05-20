import express, { Router } from 'express'

// Routes
import userRoute from './user/route'
import doctorRoute from './doctor/route'
import patientRoute from './patient/route'
import appointmentRoute from './appointment/route'

const router:Router = express.Router()

router.use('/user', userRoute)
router.use('/doctor', doctorRoute)
router.use('/patient', patientRoute)
router.use('/appointment', appointmentRoute)

export default router