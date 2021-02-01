import {
  USER_FAVORITES_ADD_FAIL,
  USER_FAVORITES_ADD_REQUEST,
  USER_FAVORITES_ADD_RESET,
  USER_FAVORITES_ADD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET,
  USER_FORGOT_PASSWORD_RESET_FAIL,
  USER_FORGOT_PASSWORD_RESET_REQUEST,
  USER_FORGOT_PASSWORD_RESET_RESET,
  USER_FORGOT_PASSWORD_RESET_SUCCESS,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MY_FAVORITES_LIST_FAIL,
  USER_MY_FAVORITES_LIST_REQUEST,
  USER_MY_FAVORITES_LIST_RESET,
  USER_MY_FAVORITES_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return {}
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRecipeFavoritesAddReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FAVORITES_ADD_REQUEST:
      return { loading: true }
    case USER_FAVORITES_ADD_SUCCESS:
      return { loading: false, success: true }
    case USER_FAVORITES_ADD_FAIL:
      return { loading: false, error: action.payload }
    case USER_FAVORITES_ADD_RESET:
      return {}
    default:
      return state
  }
}

export const userMyFavoritesListReducer = (
  state = { favorites: [] },
  action
) => {
  switch (action.type) {
    case USER_MY_FAVORITES_LIST_REQUEST:
      return { loading: true, favorites: [] }
    case USER_MY_FAVORITES_LIST_SUCCESS:
      return { loading: false, favorites: action.payload, success: true }
    case USER_MY_FAVORITES_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_MY_FAVORITES_LIST_RESET:
      return { favorites: [] }
    default:
      return state
  }
}

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true }
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true }
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload }
    case USER_FORGOT_PASSWORD_RESET:
      return {}
    default:
      return state
  }
}

export const userForgotPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_RESET_REQUEST:
      return { loading: true }
    case USER_FORGOT_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true }
    case USER_FORGOT_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload }
    case USER_FORGOT_PASSWORD_RESET_RESET:
      return {}
    default:
      return state
  }
}
