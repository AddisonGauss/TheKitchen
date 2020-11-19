import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import recipes from './data/recipes.js'
import thanksgivingrecipes from './data/thanksgivingrecipes.js'
import User from './models/userModel.js'
import Recipe from './models/recipeModel.js'
import connectDB from './config/db.js'
import UserCreatedGroup from './models/userCreatedGroupModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Recipe.deleteMany()
    await UserCreatedGroup.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleRecipes = thanksgivingrecipes.map((recipe) => {
      return { ...recipe, image: recipe.images[0], user: adminUser }
    })

    const allRecipes = await Recipe.insertMany(sampleRecipes)
    console.log(allRecipes)
    const group = {
      user: adminUser,
      name: 'Thanksgiving',
      image: '/images/Turkey.jpg',
      recipes: allRecipes,
      numOfRecipes: sampleRecipes.length,
    }
    await UserCreatedGroup.insertMany(group)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Recipe.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
