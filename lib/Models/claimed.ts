import mongoose, { InferSchemaType, model, models, Schema } from 'mongoose';

const ClaimedSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hubs: [
    {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          unique: true,
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
        state: {
          type: String,
          required: [true, 'Please enter state'],
        },
      }),
    },
  ],
});

export type Claimed = InferSchemaType<typeof ClaimedSchema>;

const Claimed = models.Claimed || model('Claimed', ClaimedSchema);

export default Claimed;
