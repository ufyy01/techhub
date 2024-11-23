import mongoose, { InferSchemaType, model, models, Schema } from 'mongoose';

const FavSchema = new Schema({
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

export type Fav = InferSchemaType<typeof FavSchema>;

const Fav = models.Fav || model('Fav', FavSchema);

export default Fav;
