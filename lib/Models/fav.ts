import mongoose, { InferSchemaType, model, models, Schema } from 'mongoose';

const FavSchema = new Schema({
  customer: {
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

export type Fav = InferSchemaType<typeof FavSchema>;

const Fav = models.Fav || model('Fav', FavSchema);

export default Fav;
