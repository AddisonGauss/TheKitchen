import express from 'express'
const router = express.Router()
import {
  getRecipeById,
  getRecipes,
  createRecipeReview,
  updateRecipeReview,
  deleteRecipeReview,
} from '../controllers/recipeController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getRecipes)
router.route('/:id').get(getRecipeById)
router.route('/:id/reviews').post(protect, createRecipeReview)
router
  .route('/:id/reviews/:reviewId')
  .put(protect, updateRecipeReview)
  .delete(protect, deleteRecipeReview)

export default router
