import mongoose from "mongoose"
const userCreatedGroupSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recipe",
    },
  ],
  numRecipes: {
    type: Number,
    required: true,
    default: 0,
  },
})

const UserCreatedGroup = mongoose.model(
  "UserCreatedGroup",
  userCreatedGroupSchema
)

export default UserCreatedGroup
