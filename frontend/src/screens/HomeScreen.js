import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Recipe from "../components/Recipe"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listRecipes } from "../actions/recipeActions"
import { RECIPE_LIST_DETAILS_RESET } from "../constants/recipeConstants"
import {
  USER_FAVORITES_ADD_RESET,
  USER_MY_FAVORITES_LIST_RESET,
} from "../constants/userConstants"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const dispatch = useDispatch()

  const recipeList = useSelector((state) => state.recipeList)
  const { loading, recipes, error } = recipeList
  useEffect(() => {
    dispatch({ type: RECIPE_LIST_DETAILS_RESET })
    dispatch({ type: USER_MY_FAVORITES_LIST_RESET })
    dispatch({ type: USER_FAVORITES_ADD_RESET })
    dispatch(listRecipes(keyword))
  }, [dispatch, keyword, match])
  return (
    <>
      <h1>Recipes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {recipes.map((recipe) => (
            <Col
              key={recipe._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="d-flex align-items-stretch"
            >
              <Recipe recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
