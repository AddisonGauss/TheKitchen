import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import Message from "../components/Message"
import { updateGroupName } from "../actions/groupActions"

const EditGroupNameModal = ({ groupId }) => {
  const [newGroupName, setNewGroupName] = useState("")
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const groupUpdateName = useSelector((state) => state.groupUpdateName)
  const {
    loading: loadingGroupUpdateName,
    success: successGroupUpdateName,
    error: errorGroupUpdateName,
    group: updatedGroup,
  } = groupUpdateName

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateGroupName(groupId, newGroupName))
    handleClose()
  }
  return (
    <>
      <Button onClick={handleShow} className="btn-danger m-2">
        Edit Folder
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {errorGroupUpdateName && <Message>{errorGroupUpdateName}</Message>}
          <Modal.Title>Edit Folder Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mt-auto" controlId="newGroupName">
              <Form.Control
                required
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Edit group name..."
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

export default EditGroupNameModal
