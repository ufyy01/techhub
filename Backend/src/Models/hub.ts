import { InferSchemaType, model, Schema } from "mongoose";
// import { isEmail } from "validator";
import Joi from 'joi';
import bycrypt from 'bcrypt';

const hubSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [3, "Minimum name length is 3"],
    unique: true
  },
  username: {
    type: String,
    required: [true, "Please enter a name"],
    minlength: [3, "Minimum name length is 3"],
    unique: true
  },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   validate: [ isEmail, "Please enter a valid email"]
  // },
  password: {
    type: String,
    minlength: [4, "Password must have a minimum length of 4 letters"],
    select: false
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
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
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
  },
  hubClaimed: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

hubSchema.index({location: "2dsphere"})

hubSchema.pre("save", async function(next) {
  try {
    const password = this.get('password')
    if (typeof password !== 'string') {
      throw new Error("Password must be a string")
    }

    const salt = await bycrypt.genSalt();
    const hash = await bycrypt.hash(password, salt)
    this.set('password', hash)
    next()
  } catch (error) {
    next(error as Error)
  }
})

type Hub = InferSchemaType<typeof hubSchema>;


export default model<Hub>("Hub", hubSchema)

export function validateHub(hub: Hub) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    // email: Joi.string().email(),
    password: Joi.string().min(4),
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