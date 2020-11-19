import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const recipeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: [
    {
      type: String,
      required: false,
    },
  ],
  instructions: [
    {
      steps: [{ type: String, lowercase: true, trim: true }],
    },
  ],
  yield: [
    {
      type: String,
      required: false,
    },
  ],
  description: {
    type: String,
    required: false,
  },
  preptime: {
    type: String,
    required: false,
  },
  cooktime: {
    type: String,
    required: false,
  },
  totaltime: {
    type: String,
    required: false,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: false,
    default: 0,
  },
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
