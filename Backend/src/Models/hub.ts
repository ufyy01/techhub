import { InferSchemaType, model, Schema } from "mongoose";
import { isEmail } from "validator";
import Joi from 'joi';

// export interface HubInterface extends Document {
//   name: string;
//   email: string | null;
//   password: string;
//   instagram: string | null;
//   twitter: string | null;
//   tiktok: string | null;
//   website: string | null;
//   phone: string | null;
//   images: [string] | null;
//   description: string,
//   address: string;
//   state: string;
//   schedule: [{
//     day: string,
//     openingTime: string,
//     closingTime: string
//   }] | null;
//   notice: string | null
// }

const hubSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [3, "Minimum name length is 3"],
  },
  username: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [3, "Minimum name length is 3"],
    unique: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [ isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [4, "Password must have a minimum length of 4 letters"]
  },
  instagram: {
    type: String
  },
  twitter: {
    type: String
  },
  tiktok: {
    type: String
  },
  website: {
    type: String
  },
  phone: {
    type: String,
    minlenght: 11,
    maxlenght: 14
  },
  images: [{
    type: String
  }],
  description: {
    type: String
  },
  address: {
    type: String,
    required: [true, "Please enter address"]
  },
  state: {
    type: String,
    required: [true, "Please enter state"]
  },
  schedule: [
    {
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      openingTime: {
        type: String,
      },
      closingTime: {
        type: String,
      }
    }
  ],
  notice: {
    type: String
  }
}, {timestamps: true});

type Hub = InferSchemaType<typeof hubSchema>;

export default model<Hub>("Hub", hubSchema)

export function validateHub(hub: Hub) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email(),
    password: Joi.string().min(4).required(),
    instagram: Joi.string(),
    twitter: Joi.string(),
    tiktok: Joi.string(),
    website: Joi.string(),
    phone: Joi.string().min(11).max(14),
    images: Joi.array(),
    description: Joi.string(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    schedule: Joi.array(),
    notice: Joi.string(),
  })

  return schema.validate(hub)
}