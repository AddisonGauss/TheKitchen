import axios from 'axios'
import {
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_LIST_CREATE_FAIL,
  GROUP_LIST_CREATE_REQUEST,
  GROUP_LIST_CREATE_SUCCESS,
  GROUP_LIST_DETAILS_FAIL,
  GROUP_LIST_DETAILS_REQUEST,
  GROUP_LIST_DETAILS_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_RECIPE_DELETE_REQUEST,
  GROUP_RECIPE_DELETE_SUCCESS,
  GROUP_UPDATE_FAIL,
  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_SUCCESS,
} from '../constants/groupConstants'

export const listGroups = () => async (dispatch) => {
  try {
    dispatch({ type: GROUP_LIST_REQUEST })

    const { data } = await axios.get('/api/groups')

    dispatch({
      type: GROUP_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listGroupDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GROUP_LIST_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/groups/${id}`)

    dispatch({
      type: GROUP_LIST_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_LIST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createGroup = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: GROUP_LIST_CREATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/groups`, { name }, config)

    dispatch({
      type: GROUP_LIST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_LIST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateGroup = (groupId, recipeId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: GROUP_UPDATE_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/groups/${groupId}`,
      { recipeId },
      config
    )

    dispatch({
      type: GROUP_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteGroup = (groupId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GROUP_DELETE_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    const { data } = await axios.delete(`/api/groups/${groupId}`, config)

    dispatch({
      type: GROUP_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteRecipeFromGroup = (groupId, recipeId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: GROUP_RECIPE_DELETE_REQUEST })

    const config = {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }

    const { data } = await axios.delete(
      `/api/groups/${groupId}/recipes/${recipeId}`,
      config
    )

    dispatch({
      type: GROUP_RECIPE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GROUP_RECIPE_DELETE_REQUEST,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
