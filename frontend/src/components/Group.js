import React from "react"
import { Button, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { deleteGroup } from "../actions/groupActions"
import { useDispatch } from "react-redux"
const Group = ({ group }) => {
  const dispatch = useDispatch()

  const deleteGroupHandler = (groupId) => {
    if (window.confirm("Are you sure you want to delete?"))
      dispatch(deleteGroup(groupId))
  }
  return (
    <Card className="my-3 p-1 rounded">
      <Link to={`/group/${group._id}`}>
        <Card.Img variant="top" src={group.image} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Link to={`/group/${group._id}`}>
          <Card.Title as="h3">{group.name}</Card.Title>
        </Link>
        <Card.Text>{group.description && group.description}</Card.Text>
        <Button
          variant="danger"
          onClick={() => deleteGroupHandler(group._id)}
          className="mt-auto"
        >
          <i className="fas fa-trash"></i>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Group
