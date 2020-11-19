import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_LIST_DETAILS_REQUEST,
  RECIPE_LIST_DETAILS_SUCCESS,
  RECIPE_LIST_DETAILS_FAIL,
  RECIPE_LIST_DETAILS_RESET,
  RECIPE_REVIEW_CREATE_REQUEST,
  RECIPE_REVIEW_CREATE_SUCCESS,
  RECIPE_REVIEW_CREATE_FAIL,
  RECIPE_REVIEW_CREATE_RESET,
  RECIPE_REVIEW_EDIT_REQUEST,
  RECIPE_REVIEW_EDIT_SUCCESS,
  RECIPE_REVIEW_EDIT_FAIL,
  RECIPE_REVIEW_EDIT_RESET,
  RECIPE_REVIEW_DELETE_REQUEST,
  RECIPE_REVIEW_DELETE_SUCCESS,
  RECIPE_REVIEW_DELETE_FAIL,
  RECIPE_REVIEW_DELETE_RESET,
} from '../constants/recipeConstants'

export const recipeListReducer = (state = { recipes: [] }, action) => {
  switch (action.type) {
    case RECIPE_LIST_REQUEST:
      return { loading: true, recipes: [] }
    case RECIPE_LIST_SUCCESS:
      return { loading: false, success: true, recipes: action.payload }
    case RECIPE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const recipeListDetailsReducer = (
  state = { recipe: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case RECIPE_LIST_DETAILS_REQUEST:
      return { loading: true, ...state }
    case RECIPE_LIST_DETAILS_SUCCESS:
      return { loading: false, success: true, recipe: action.payload }
    case RECIPE_LIST_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case RECIPE_LIST_DETAILS_RESET:
      return { recipe: { reviews: [] } }
    default:
      return state
  }
}

export const recipeReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_REVIEW_CREATE_REQUEST:
      return { loading: true }
    case RECIPE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case RECIPE_REVIEW_CREATE_RESET:
      return { review: {} }
    default:
      return state
  }
}

export const recipeReviewEditReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_REVIEW_EDIT_REQUEST:
      return { loading: true }
    case RECIPE_REVIEW_EDIT_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_REVIEW_EDIT_FAIL:
      return { loading: false, error: action.payload }
    case RECIPE_REVIEW_EDIT_RESET:
      return { review: {} }
    default:
      return state
  }
}

export const recipeReviewDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE_REVIEW_DELETE_REQUEST:
      return { loading: true }
    case RECIPE_REVIEW_DELETE_SUCCESS:
      return { loading: false, success: true }
    case RECIPE_REVIEW_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case RECIPE_REVIEW_DELETE_RESET:
      return { review: {} }
    default:
      return state
  }
}
