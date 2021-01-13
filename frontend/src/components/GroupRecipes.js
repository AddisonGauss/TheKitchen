import React, { useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Recipe from "./Recipe"
import EditGroupNameModal from "../components/EditGroupNameModal"
import {
  listGroupDetails,
  deleteRecipeFromGroup,
} from "../actions/groupActions"
const GroupRecipes = ({ group }) => {
  const dispatch = useDispatch()

  const deleteRecipeFromGroupHandler = (groupId, recipeId) => {
    if (window.confirm("Are you sure?"))
      dispatch(deleteRecipeFromGroup(groupId, recipeId))
  }

  return (
    <>
      <h2 className="text-center mt-5">{group.name}</h2>
      <Row className="justify-content-center">
        <EditGroupNameModal groupId={group._id} />
      </Row>
      <Row>
        {group &&
          group.recipes &&
          group.recipes.map((recipe) => (
            <Col
              key={recipe._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="d-flex align-items-stretch"
            >
              <Recipe recipe={recipe} />

              <Row className="d-flex align-items-start">
                <Button
                  onClick={() =>
                    deleteRecipeFromGroupHandler(group._id, recipe._id)
                  }
                  variant="danger"
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </Row>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default GroupRecipes
