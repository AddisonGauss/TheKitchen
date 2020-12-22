import axios from "axios"
import {
  USER_FAVORITES_ADD_FAIL,
  USER_FAVORITES_ADD_REQUEST,
  USER_FAVORITES_ADD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_RESET_FAIL,
  USER_FORGOT_PASSWORD_RESET_REQUEST,
  USER_FORGOT_PASSWORD_RESET_SUCCESS,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MY_FAVORITES_LIST_FAIL,
  USER_MY_FAVORITES_LIST_REQUEST,
  USER_MY_FAVORITES_LIST_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  //dispatch({ type: USER_LIST_RESET })
  dispatch({ type: USER_LOGOUT })
  document.location.href = "/login"
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addToFavorites = (recipeId) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FAVORITES_ADD_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }
    await axios.post(`/api/users/myfavorites`, { recipeId }, config)

    dispatch({
      type: USER_FAVORITES_ADD_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: USER_FAVORITES_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMyFavorites = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_MY_FAVORITES_LIST_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/myfavorites`, config)

    dispatch({
      type: USER_MY_FAVORITES_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_MY_FAVORITES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST })

    const { data } = await axios.post(`/api/users/forgot`, { email })

    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const forgotPasswordReset = (token, password, confirmPassword) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_RESET_REQUEST })

    const { data } = await axios.post(`/api/users/reset/${token}`, {
      password: password,
      confirmPassword: confirmPassword,
    })

    dispatch({
      type: USER_FORGOT_PASSWORD_RESET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
