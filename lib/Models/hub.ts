import { InferSchemaType, Schema, model, models } from 'mongoose';
import { isEmail } from 'validator';

const HubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
      minlenght: 11,
      maxlenght: 14,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Please enter address'],
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    state: {
      type: String,
      required: [true, 'Please enter state'],
    },
    schedule: [
      {
        type: String,
      },
    ],
    notice: {
      type: String,
    },
    hubClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

HubSchema.index({ location: '2dsphere' });

export type Hub = InferSchemaType<typeof HubSchema>;

const Hub = models.Hub || model('Hub', HubSchema);

export default Hub;
