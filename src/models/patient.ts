import mongoose, { Schema } from "mongoose"


const patientSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: false
    },
    relatives: [Schema.Types.ObjectId],
    medicalBox: {
      type: Array,
      required: false
    },
    // START == Medimi Options
    medimiId: {
      type: String,
      required: true,
      unique: true
    }, // SN-P### / SN-P###
    type: {
      type: String,
      required: false
    }, // Independent / Related
    relation: {
      type: String,
      required: false
    }, // If type is "Related" we can show relation
    status: {
      type: String,
      required: true
    }, // Active /  Disable
    // END == Medimi Options
    // START == Personal Profile
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    dob: {
      type: Number,
      required: false
    },
    sex: {
      type: String,
      required: false
    },
    // END == Personal Profile
    // START == Medical Profile
    weight: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    bloodGroup: {
      type: String,
      required: false
    },
    preConditions: {
      type: Array,
      required: false
    },
    diseases: {
      type: Array,
      required: false
    },
    // END == Medical Profile
    paymentMethods: {
      type: Array,
      required: false
    }
  },
  { timestamps: true }
)


const PatientModel = mongoose.model("patients", patientSchema)


export default PatientModel