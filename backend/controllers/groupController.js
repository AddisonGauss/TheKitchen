import asyncHandler from "express-async-handler"
import Recipe from "../models/recipeModel.js"
import userCreatedGroup from "../models/userCreatedGroupModel.js"

// @desc    Fetch all groups created by the user
// @route   GET /api/groups
// @access  Private
const getGroups = asyncHandler(async (req, res) => {
  const groups = await userCreatedGroup.find({ user: req.user })
  res.json(groups)
})

// @desc    Fetch single group
// @route   GET /api/groups/:id
// @access  Private
const getGroupById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const group = await userCreatedGroup.findById(id).populate("recipes")

  if (group) {
    if (group.user.toString() !== req.user.id.toString()) {
      throw new Error("You did not create this group")
    } else {
      res.json(group)
    }
  } else {
    res.status(404)
    throw new Error("Group not found")
  }
})

// @desc    Create a group
// @route   POST /api/groups
// @access  Private
const createGroup = asyncHandler(async (req, res) => {
  const { name } = req.body

  const group = new userCreatedGroup({
    name: name,
    user: req.user,
    image: "/images/sample.jpg",
  })

  const createdGroup = await group.save()
  res.status(201).json(createdGroup)
})

// @desc    Update Group
// @route   PUT /api/groups/:id
// @access  Private
const addRecipeToGroup = asyncHandler(async (req, res) => {
  const { recipeId } = req.body
  const group = await userCreatedGroup.findById(req.params.id)
  const recipe = await Recipe.findById(recipeId)
  if (group && recipe) {
    if (
      group.recipes.find((recipe) => recipe.toString() === recipeId.toString())
    ) {
      res.status(404)
      throw new Error("Recipe already in group")
    } else {
      group.recipes.push(recipe)
      group.numRecipes = group.recipes.length
      const updatedGroup = await group.save()
      res.status(201).json(updatedGroup)
    }
  } else {
    res.status(404)
    throw new Error("Group/recipe not found")
  }
})

// @desc    Update Group Name
// @route   PUT /api/groups/:id/updateName
// @access  Private
const updateGroupName = asyncHandler(async (req, res) => {
  const group = await userCreatedGroup.findById(req.params.id)
  const newGroupName = req.body.newGroupName

  if (group) {
    group.name = newGroupName
    const updatedGroup = await group.save()
    res.status(201).json(updatedGroup)
  } else {
    res.status(404)
    throw new Error("Group not found")
  }
})

// @desc    Delete Group
// @route   DELETE /api/groups/:id
// @access  Private
const deleteGroup = asyncHandler(async (req, res) => {
  const group = await userCreatedGroup.findById(req.params.id)
  if (group) {
    await group.remove()
    res.json({ message: "Group removed" })
  } else {
    res.status(404)
    throw new Error("Group not found")
  }
})

// @desc    Delete recipe from group
// @route   DELETE /api/groups/:id/recipe/:recipeId
// @access  Private
const deleteRecipeFromGroup = asyncHandler(async (req, res) => {
  const group = await userCreatedGroup.findById(req.params.id)
  if (group) {
    const newGroupRecipes = group.recipes.filter(
      (recipe) => recipe._id.toString() !== req.params.recipeId.toString()
    )
    group.recipes = newGroupRecipes
    await group.save()
    res.json({ message: "Recipe removed" })
  } else {
    res.status(404)
    throw new Error("Group not found")
  }
})

export {
  getGroups,
  getGroupById,
  createGroup,
  addRecipeToGroup,
  updateGroupName,
  deleteGroup,
  deleteRecipeFromGroup,
}
