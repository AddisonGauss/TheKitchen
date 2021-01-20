import asyncHandler from "express-async-handler"
import Recipe from "../models/recipeModel.js"
import Review from "../models/recipeModel.js"

// @desc    Fetch all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}
  const recipes = await Recipe.find({ ...keyword })
  res.json(recipes)
})

// @desc    Fetch single recipe
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const recipe = await Recipe.findById(id)

  if (recipe) {
    res.json(recipe)
  } else {
    res.status(404)
    throw new Error("Recipe not found")
  }
})

// @desc    Create new review
// @route   POST /api/recipes/:id/reviews
// @access  Private
const createRecipeReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const recipe = await Recipe.findById(req.params.id)
  if (recipe) {
    const alreadyReviewed = recipe.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("You have already reviewed this product")
    }

    const review = {
      name: req.user.name,
      comment: comment,
      rating: Number(rating),
      user: req.user._id,
    }

    recipe.reviews.push(review)
    recipe.numReviews = recipe.reviews.length
    recipe.rating =
      recipe.reviews.reduce((acc, item) => {
        return item.rating + acc
      }, 0) / recipe.reviews.length

    await recipe.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Recipe not found")
  }
})

// @desc    Update a review
// @route   PUT /api/recipes/:id/reviews/:reviewId
// @access  Private
const updateRecipeReview = asyncHandler(async (req, res) => {
  const review = req.body

  const recipe = await Recipe.findById(req.params.id)
  if (recipe) {
    const updateReview = await recipe.reviews.id(req.params.reviewId)
    await updateReview.set(req.body)
    recipe.rating =
      recipe.reviews.reduce((acc, item) => {
        return item.rating + acc
      }, 0) / recipe.numReviews
    await recipe.save()
    res.status(201).json({ message: "Review updated" })
  } else {
    res.status(404)
    throw new Error("Recipe not found")
  }
})

// @desc    Delete a review
// @route   DELETE /api/recipes/:id/reviews/:reviewId
// @access  Private
const deleteRecipeReview = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  if (recipe) {
    await recipe.reviews.id(req.params.reviewId).remove()
    await recipe.save()
    res.json({ message: "Review Deleted" })
  } else {
    res.status(404)
    throw new Error("Recipe not found")
  }
})

export {
  getRecipes,
  getRecipeById,
  createRecipeReview,
  updateRecipeReview,
  deleteRecipeReview,
}
