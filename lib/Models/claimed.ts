import mongoose, { InferSchemaType, model, models, Schema } from 'mongoose';

const ClaimedSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
      required: true,
    },
  ],
});

export type Claimed = InferSchemaType<typeof ClaimedSchema>;

const Claimed = models.Claimed || model('Claimed', ClaimedSchema);

export default Claimed;
