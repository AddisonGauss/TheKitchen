import {
  GROUP_LIST_CREATE_FAIL,
  GROUP_LIST_CREATE_REQUEST,
  GROUP_LIST_CREATE_RESET,
  GROUP_LIST_CREATE_SUCCESS,
  GROUP_LIST_DETAILS_FAIL,
  GROUP_LIST_DETAILS_REQUEST,
  GROUP_LIST_DETAILS_RESET,
  GROUP_LIST_DETAILS_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_SUCCESS,
  GROUP_UPDATE_FAIL,
  GROUP_UPDATE_RESET,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_RESET,
  GROUP_RECIPE_DELETE_RESET,
  GROUP_RECIPE_DELETE_FAIL,
  GROUP_RECIPE_DELETE_SUCCESS,
  GROUP_RECIPE_DELETE_REQUEST,
  GROUP_NAME_UPDATE_REQUEST,
  GROUP_NAME_UPDATE_SUCCESS,
  GROUP_NAME_UPDATE_FAIL,
  GROUP_NAME_UPDATE_RESET,
} from "../constants/groupConstants"

export const groupListReducer = (state = { groups: [] }, action) => {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return { loading: true, groups: [] }
    case GROUP_LIST_SUCCESS:
      return { loading: false, success: true, groups: action.payload }
    case GROUP_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const groupListDetailsReducer = (
  state = { group: { recipes: [] } },
  action
) => {
  switch (action.type) {
    case GROUP_LIST_DETAILS_REQUEST:
      return { loading: true, ...state }
    case GROUP_LIST_DETAILS_SUCCESS:
      return { loading: false, success: true, group: action.payload }
    case GROUP_LIST_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_LIST_DETAILS_RESET:
      return { group: { recipes: [] } }
    default:
      return state
  }
}

export const groupListCreateReducer = (state = { group: {} }, action) => {
  switch (action.type) {
    case GROUP_LIST_CREATE_REQUEST:
      return { loading: true }
    case GROUP_LIST_CREATE_SUCCESS:
      return { loading: false, success: true, group: action.payload }
    case GROUP_LIST_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_LIST_CREATE_RESET:
      return { group: { recipes: [] } }
    default:
      return state
  }
}

export const groupUpdateReducer = (state = { group: {} }, action) => {
  switch (action.type) {
    case GROUP_UPDATE_REQUEST:
      return { loading: true }
    case GROUP_UPDATE_SUCCESS:
      return { loading: false, success: true, group: action.payload }
    case GROUP_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_UPDATE_RESET:
      return { group: { recipes: [] } }
    default:
      return state
  }
}

export const groupUpdateNameReducer = (state = { group: {} }, action) => {
  switch (action.type) {
    case GROUP_NAME_UPDATE_REQUEST:
      return { loading: true }
    case GROUP_NAME_UPDATE_SUCCESS:
      return { loading: false, success: true, group: action.payload }
    case GROUP_NAME_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_NAME_UPDATE_RESET:
      return { group: { recipes: [] } }
    default:
      return state
  }
}

export const groupDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_DELETE_REQUEST:
      return { loading: true }
    case GROUP_DELETE_SUCCESS:
      return { loading: false, success: true }
    case GROUP_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const groupDeleteRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_RECIPE_DELETE_REQUEST:
      return { loading: true }
    case GROUP_RECIPE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case GROUP_RECIPE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case GROUP_RECIPE_DELETE_RESET:
      return {}
    default:
      return state
  }
}
