import React, { useState } from 'react'
import { Button, Card, Container, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import FolderModal from '../components/FolderModal'
const Recipe = ({ recipe, groupType }) => {
  return (
    <>
      <Card className='my-3 p-1 rounded'>
        <Link to={`/recipe/${recipe._id}`}>
          <Card.Img variant='top' src={recipe.image} />
        </Link>
        <Card.Body className='d-flex flex-column'>
          <Card.Text as='div'>
            <Rating
              value={recipe.rating}
              text={`${recipe.numReviews} reviews`}
            />
          </Card.Text>
          <Link to={`/recipe/${recipe._id}`}>
            <Card.Title as='h3'>{recipe.name}</Card.Title>
          </Link>
          {recipe.totaltime && (
            <i className='fas fa-clock fa-lg mb-3'>
              {recipe.totaltime.substring(2, 5)} minutes
            </i>
          )}
          {groupType && <FolderModal recipeId={recipe._id} />}
        </Card.Body>
      </Card>
    </>
  )
}

export default Recipe
