import React, { useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { LinkContainer } from "react-router-bootstrap"
import { getMyFavorites } from "../actions/userActions"
import Recipe from "../components/Recipe"
import { listGroups } from "../actions/groupActions"
const UserProfileScreen = () => {
  const dispatch = useDispatch()

  const userMyFavoritesList = useSelector((state) => state.userMyFavoritesList)
  const { loading, error, favorites } = userMyFavoritesList

  useEffect(() => {
    dispatch(getMyFavorites())
    dispatch(listGroups())
  }, [dispatch])
  return (
    <>
      <Row>
        <Col className="text-left mb-3">
          <LinkContainer to="/mylists">
            <Button variant="outline-primary">View My Created Folders</Button>
          </LinkContainer>
        </Col>
      </Row>
      <h1>My favorites</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {favorites.map((recipe) => (
            <Col
              key={recipe._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}
              className="d-flex align-items-stretch"
            >
              <Recipe recipe={recipe} groupType={true} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default UserProfileScreen
