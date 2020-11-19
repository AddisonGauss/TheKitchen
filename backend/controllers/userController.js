import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login/
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid login credentials')
  }
})

// @desc    Add recipe to user favorites
// @route   POST /api/users/myfavorites
// @access  Private
const addRecipeToFavorites = asyncHandler(async (req, res) => {
  const { recipeId } = req.body

  const recipe = await Recipe.findById(recipeId)

  if (req.user.favorites.includes(recipe._id)) {
    throw new Error('Recipe already in favorites')
  }
  if (recipe && req.user) {
    await req.user.favorites.push(recipe)
    await req.user.save()
    res.json({ message: 'Recipe added to favorites' })
  } else {
    res.status(404)
    throw new Error('Recipe/user not found')
  }
})

// @desc    Fetch user's favorite recipes
// @route   GET /api/users/myfavorites
// @access  Private
const getFavoriteRecipes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites')

  if (user) {
    res.json(user.favorites)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, addRecipeToFavorites, getFavoriteRecipes }
