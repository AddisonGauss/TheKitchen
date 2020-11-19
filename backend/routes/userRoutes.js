import express from 'express'
const router = express.Router()
import {
  addRecipeToFavorites,
  authUser,
  getFavoriteRecipes,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
router.post('/login', authUser)
router
  .route('/myfavorites')
  .post(protect, addRecipeToFavorites)
  .get(protect, getFavoriteRecipes)

export default router
