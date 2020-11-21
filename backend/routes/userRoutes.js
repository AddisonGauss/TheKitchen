import express from 'express'
const router = express.Router()
import {
  addRecipeToFavorites,
  authUser,
  getFavoriteRecipes,
  forgotPasswordReset,
  checkUserTokenResetPassword,
  resetUserPassword,
  registerUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)

router.post('/login', authUser)

router
  .route('/myfavorites')
  .post(protect, addRecipeToFavorites)
  .get(protect, getFavoriteRecipes)
router
  .route('/reset/:token')
  .get(checkUserTokenResetPassword)
  .post(resetUserPassword)
router.route('/forgot').post(forgotPasswordReset)

export default router
