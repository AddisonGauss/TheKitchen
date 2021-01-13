import React from "react"
import { Row, Col } from "react-bootstrap"
import Recipe from "../components/Recipe"

const Favorites = ({ favorites }) => {
  return (
    <>
      <h2 className="text-center mt-5">All My Favorites</h2>
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
    </>
  )
}

export default Favorites
