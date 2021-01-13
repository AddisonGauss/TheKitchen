import React from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Recipe from "./Recipe"
import EditGroupNameModal from "../components/EditGroupNameModal"
import { deleteRecipeFromGroup, deleteGroup } from "../actions/groupActions"
const GroupRecipes = ({ group }) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const deleteRecipeFromGroupHandler = (groupId, recipeId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this recipe from ${group.name}?`
      )
    )
      dispatch(deleteRecipeFromGroup(groupId, recipeId))
  }

  const deleteGroupHandler = (groupId) => {
    if (window.confirm(`Are you sure you want to delete ${group.name}?`)) {
      dispatch(deleteGroup(groupId))
      history.replace("/profile")
    }
  }

  return (
    <>
      <h2 className="text-center mt-2">{group.name}</h2>
      <Row className="justify-content-center mb-5">
        <EditGroupNameModal groupId={group._id} />
        <Button
          className="btn-danger m-2"
          onClick={() => deleteGroupHandler(group._id)}
        >
          Delete Folder
        </Button>
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
