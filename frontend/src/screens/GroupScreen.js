import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col, Accordion, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import Recipe from '../components/Recipe'
import {
  listGroupDetails,
  deleteRecipeFromGroup,
} from '../actions/groupActions'

const GroupScreen = ({ match }) => {
  const id = match.params.id
  const dispatch = useDispatch()

  const groupListDetails = useSelector((state) => state.groupListDetails)
  const { loading, group, error } = groupListDetails

  const groupDeleteRecipe = useSelector((state) => state.groupDeleteRecipe)
  const {
    success: successDeleteRecipe,
    error: errorDeleteRecipe,
  } = groupDeleteRecipe

  useEffect(() => {
    dispatch(listGroupDetails(id))
  }, [dispatch, match, successDeleteRecipe])

  const deleteRecipeFromGroupHandler = (groupId, recipeId) => {
    if (window.confirm('Are you sure?'))
      dispatch(deleteRecipeFromGroup(groupId, recipeId))
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h2>{group.name}</h2>
          <Row>
            {group.recipes.map((recipe) => (
              <Col
                key={recipe._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className='d-flex align-items-stretch'
              >
                <Recipe recipe={recipe} />
                <Row className='d-flex align-items-start'>
                  <Button
                    onClick={() =>
                      deleteRecipeFromGroupHandler(group._id, recipe._id)
                    }
                    variant='danger'
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Row>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default GroupScreen
