import axios from 'axios'
import {
  RECIPE_LIST_FAIL,
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_DETAILS_REQUEST,
  RECIPE_LIST_DETAILS_SUCCESS,
  RECIPE_LIST_DETAILS_FAIL,
  RECIPE_LIST_DETAILS_RESET,
  RECIPE_REVIEW_CREATE_REQUEST,
  RECIPE_REVIEW_CREATE_SUCCESS,
  RECIPE_REVIEW_CREATE_FAIL,
  RECIPE_REVIEW_EDIT_REQUEST,
  RECIPE_REVIEW_EDIT_SUCCESS,
  RECIPE_REVIEW_EDIT_FAIL,
  RECIPE_REVIEW_DELETE_REQUEST,
  RECIPE_REVIEW_DELETE_SUCCESS,
  RECIPE_REVIEW_DELETE_FAIL,
} from '../constants/recipeConstants'

export const listRecipes = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_REQUEST })

    const { data } = await axios.get(`/api/recipes?keyword=${keyword}`)

    dispatch({
      type: RECIPE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listRecipeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECIPE_LIST_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/recipes/${id}`)

    dispatch({
      type: RECIPE_LIST_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: RECIPE_LIST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createRecipeReview = (recipeId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: RECIPE_REVIEW_CREATE_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    await axios.post(`/api/recipes/${recipeId}/reviews`, review, config)

    dispatch({
      type: RECIPE_REVIEW_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RECIPE_REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editRecipeReview = (recipeId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: RECIPE_REVIEW_EDIT_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }
    console.log(review)
    await axios.put(
      `/api/recipes/${recipeId}/reviews/${review._id}`,
      review,
      config
    )

    dispatch({
      type: RECIPE_REVIEW_EDIT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RECIPE_REVIEW_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRecipeReview = (recipeId, reviewId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: RECIPE_REVIEW_DELETE_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    await axios.delete(`/api/recipes/${recipeId}/reviews/${reviewId}`, config)

    dispatch({
      type: RECIPE_REVIEW_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: RECIPE_REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
