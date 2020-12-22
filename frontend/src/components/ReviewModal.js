import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import Message from "../components/Message"
import { createRecipeReview } from "../actions/recipeActions"
import { RECIPE_REVIEW_CREATE_RESET } from "../constants/recipeConstants"
import { RECIPE_REVIEW_EDIT_RESET } from "../constants/recipeConstants"

const ReviewModal = ({ recipeId }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [commentError, setCommentError] = useState(false)
  const [ratingError, setRatingError] = useState(false)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const recipeReviewCreate = useSelector((state) => state.recipeReviewCreate)
  const { loading, success, error } = recipeReviewCreate

  const handleClose = () => {
    dispatch({ type: RECIPE_REVIEW_CREATE_RESET })
    dispatch({ type: RECIPE_REVIEW_EDIT_RESET })
    setShow(false)
  }
  const handleShow = () => setShow(true)
  useEffect(() => {
    if (success) {
      handleClose()
    }
  }, [success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!comment) {
      setCommentError(true)
    } else if (rating === 0) {
      setRatingError(true)
    } else {
      setCommentError(false)
      setRatingError(false)
      dispatch(createRecipeReview(recipeId, { rating, comment }))
    }
  }

  return (
    <>
      <Button className="mt-auto" onClick={handleShow}>
        Add Review
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        {error && <Message variant="danger">{error}</Message>}
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              {ratingError && (
                <Message variant="danger">Please select a rating</Message>
              )}
              <Form.Control
                placeholder="Select Rating..."
                required
                as="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="0">Select Rating...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>
            {commentError && (
              <Message variant="danger">Please enter a comment</Message>
            )}
            <Form.Group controlId="comment">
              <Form.Control
                required
                as="textarea"
                row="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add comment here..."
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" onClick={submitHandler} variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReviewModal
