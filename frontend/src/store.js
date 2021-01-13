import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  recipeListReducer,
  recipeListDetailsReducer,
  recipeReviewCreateReducer,
  recipeReviewEditReducer,
  recipeReviewDeleteReducer,
} from "./reducers/recipeReducers"
import {
  userMyFavoritesListReducer,
  userLoginReducer,
  userRecipeFavoritesAddReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userForgotPasswordResetReducer,
} from "./reducers/userReducers"
import {
  groupListCreateReducer,
  groupListDetailsReducer,
  groupListReducer,
  groupUpdateReducer,
  groupUpdateNameReducer,
  groupDeleteReducer,
  groupDeleteRecipeReducer,
} from "./reducers/groupReducers"
const reducer = combineReducers({
  recipeList: recipeListReducer,
  recipeListDetails: recipeListDetailsReducer,
  recipeReviewCreate: recipeReviewCreateReducer,
  recipeReviewEdit: recipeReviewEditReducer,
  recipeReviewDelete: recipeReviewDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userRecipeFavoritesAdd: userRecipeFavoritesAddReducer,
  userMyFavoritesList: userMyFavoritesListReducer,
  userForgotPassword: userForgotPasswordReducer,
  userForgotPasswordReset: userForgotPasswordResetReducer,
  groupList: groupListReducer,
  groupListDetails: groupListDetailsReducer,
  groupListCreate: groupListCreateReducer,
  groupUpdate: groupUpdateReducer,
  groupUpdateName: groupUpdateNameReducer,
  groupDelete: groupDeleteReducer,
  groupDeleteRecipe: groupDeleteRecipeReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
