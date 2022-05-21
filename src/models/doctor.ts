import mongoose, { Schema } from "mongoose"

const doctorSchema = new Schema(
  {
    // START == Relations
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    // END == Relations
    // START == Medimi Options
    email: {
      type: String,
      required: true,
      unique: true
    },
    medimiId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }, // Active /  Disabled
    appointmentTypes: {
      type: Array,
      required: false,
      default: ['Home']
    },
    appointmentDuration: {
      type: Number,
      required: true,
      default: 30
    },
    schedule: {
      type: Array,
      required: false
    },
    slotColor: {
      type: String,
      required: false
    },
    // END == Medimi Options
    // START == Payment Options
    feeStructure: {
      type: Object,
      required: false
    },
    transport: {
      type: Object,
      required: false
    },
    paymentMethod: {
      type: Object,
      required: false
    },
    // END == Payment Options
    // START == Personal Profile
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: false
    },
    dob: {
      type: Number,
      required: false
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: false
    },
    indications: {
      type: String,
      required: false
    },
    // END == Personal Profile
    // START == Medical Profile
    title: {
      type: String,
      required: false
    },
    licenseType: {
      type: String,
      required: false
    },
    licenseNumber: {
      type: String,
      required: false
    },
    presentation: {
      type: String,
      required: false
    },
    // END == Medical Profile
    // START == Images URLs
    imageURL: {
      type: String,
      required: false
    },
    identityDocURL: {
      type: String,
      required: false
    },
    cvURL: {
      type: String,
      required: false
    },
    // END == Images URLs
    // START == Arrays
    diploma: {
      type: Array,
      required: false
    },
    experience: {
      type: Array,
      required: false
    },
    expertise: {
      type: Array,
      required: false
    },
    // END == Arrays
  },
  { timestamps: true }
)

const DoctorModel = mongoose.model("doctors", doctorSchema)

export default DoctorModel