import mongoose, { Schema } from "mongoose"

const appointmentSchema = new Schema(
  {
    // START == Relationship
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'patients',
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
      required: true
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
      required: false
    },
    medicalFacility: {
      type: Schema.Types.ObjectId,
      ref: 'medicalFacilities',
      required: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: false
    },
    // END == Relationship
    // START == Medimi Options
    medimiId: {
      type: String,
      required: true
    },
    // END == Medimi Options
    patientName: {
      type: String,
      required: false
    },
    doctorName: {
      type: String,
      required: false
    },
    doctorTitle: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }, // / Office / Home / Video
    motive: {
      type: String,
      required: false
    },
    start: {
      type: Number,
      required: false
    },
    end: {
      type: Number,
      required: false
    },
    preInfo: {
      type: String,
      required: false
    },
    // START == POST appointment info
    height: {
      type: Number,
      required: false
    },
    weight: {
      type: Number,
      required: false
    },
    diagnostic: {
      type: String,
      required: false
    },
    diagnosticDetail: {
      type: String,
      required: false
    },
    observation: {
      type: String,
      required: false
    },
    payment: {
      type: Object,
      required: false
    },
    // END == POST appointment info
    // START == Presciprtions
    medPrescription: {
      type: Array,
      required: false,
      default: []
    },
    medCertificate: {
      type: Array,
      required: false,
      default: []
    },
    bioAnalysis: {
      type: Array,
      required: false,
      default: []
    },
    radioAnalysis: {
      type: Array,
      required: false,
      default: []
    },
    // END == Presciprtions
    status: {
      type: String,
      required: true
    } // Scheduled / Cancelled / Completed
  },
  { timestamps: true }
)
  
const AppointmentModel = mongoose.model("appointments", appointmentSchema)


export default AppointmentModel