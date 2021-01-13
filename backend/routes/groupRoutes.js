import express from "express"
const router = express.Router()
import {
  getGroupById,
  getGroups,
  createGroup,
  addRecipeToGroup,
  updateGroupName,
  deleteGroup,
  deleteRecipeFromGroup,
} from "../controllers/groupController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(protect, getGroups).post(protect, createGroup)
router
  .route("/:id")
  .get(protect, getGroupById)
  .put(protect, addRecipeToGroup)
  .delete(protect, deleteGroup)
router.route("/:id/recipes/:recipeId").delete(protect, deleteRecipeFromGroup)
router.route("/:id/updateName").put(protect, updateGroupName)

export default router
