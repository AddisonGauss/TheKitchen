import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ListGroupItem,
} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteRecipeReview, listRecipeDetails } from '../actions/recipeActions'
import { addToFavorites } from '../actions/userActions'
import Rating from '../components/Rating'
import ReviewModal from '../components/ReviewModal'
import EditReviewModal from '../components/EditReviewModal'
import { RECIPE_REVIEW_CREATE_RESET } from '../constants/recipeConstants'
import { RECIPE_REVIEW_EDIT_RESET } from '../constants/recipeConstants'

const RecipeScreen = ({ match, history }) => {
  const id = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userRecipeFavoritesAdd = useSelector(
    (state) => state.userRecipeFavoritesAdd
  )
  const {
    success: successAddFavorites,
    error: errorAddFavorites,
  } = userRecipeFavoritesAdd

  const recipeListDetails = useSelector((state) => state.recipeListDetails)
  const { loading, recipe, error } = recipeListDetails

  const recipeReviewCreate = useSelector((state) => state.recipeReviewCreate)
  const { success } = recipeReviewCreate

  const recipeReviewEdit = useSelector((state) => state.recipeReviewEdit)
  const { success: successEdit } = recipeReviewEdit

  const recipeReviewDelete = useSelector((state) => state.recipeReviewDelete)
  const { success: successDelete } = recipeReviewDelete

  useEffect(() => {
    dispatch(listRecipeDetails(id))
  }, [dispatch, match, success, successEdit, successDelete])

  const addToFavoritesHandler = () => {
    if (userInfo) {
      dispatch(addToFavorites(match.params.id))
    } else {
      history.push('/login')
    }
  }

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteRecipeReview(id, reviewId))
  }
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {errorAddFavorites && (
        <Message variant='danger'>{errorAddFavorites}</Message>
      )}
      {successAddFavorites && (
        <Message variant='success'>Recipe added to favorites</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Image fluid rounded src={recipe.image}></Image>
            </Col>
            <Col md={7}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{recipe.name}</h3>

                  <a href={`${recipe.url}`}>Link to original recipe here</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-flex'>
                    <Rating
                      value={recipe.rating}
                      text={`${recipe.numReviews} reviews`}
                    />
                    <p className='ml-auto'>
                      Serves: {recipe.yield && recipe.yield}
                    </p>
                  </div>
                  {recipe.totaltime && (
                    <p>Time: {recipe.totaltime.substring(2, 5)}</p>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>{recipe.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={1}>
              <Button
                variant='outline-primary btn-sm'
                onClick={addToFavoritesHandler}
              >
                <div>
                  <i className='fas fa-heart fa-2x'></i>
                </div>
                Add to favorites
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup>
                <h3>Ingredients</h3>
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Col md={12}>
              <h3>Directions</h3>
              <ListGroup variant='flush'>
                {recipe.instructions &&
                  recipe.instructions[0] &&
                  recipe.instructions[0].steps.map((step, index) => (
                    <ListGroup.Item key={index}>
                      {index + 1}. {step}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Col md={12}>
              <Col>
                <Row>
                  <h2 className='ml-3'>Reviews({recipe.numReviews})</h2>
                  <Col>
                    {userInfo ? (
                      <ReviewModal recipeId={recipe._id} />
                    ) : (
                      <Message variant='primary'>
                        Please{' '}
                        <Link to={`/login?redirect=/recipe/${recipe._id}`}>
                          sign in
                        </Link>{' '}
                        to write a review
                      </Message>
                    )}
                  </Col>
                </Row>
              </Col>
            </Col>

            {recipe.reviews.length === 0 ? (
              <Col md={12}>
                <Message variant='primary'>Currently no reviews</Message>
              </Col>
            ) : (
              <>
                {recipe.reviews.map((review) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    key={review._id}
                    className='d-flex align-items-stretch'
                  >
                    <Card className='mt-4' style={{ width: '18rem' }}>
                      <Card.Header>
                        <Row>
                          <h5>{review.name}</h5>
                          {userInfo && userInfo._id === review.user && (
                            <div className='ml-auto'>
                              <EditReviewModal
                                recipeId={recipe._id}
                                review={review}
                              />
                              <Button
                                onClick={() => deleteReviewHandler(review._id)}
                                variant='outline-danger btn-sm'
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </Row>
                        <Row>
                          <Rating
                            value={review.rating}
                            text={review.createdAt.substring(0, 10)}
                          />
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <Card.Text as='h6'>
                          {review.comment.substring(0, 100)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </>
      )}
    </>
  )
}

export default RecipeScreen
