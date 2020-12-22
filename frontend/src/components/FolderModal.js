import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal } from "react-bootstrap"
import Message from "../components/Message"
import { createGroup, listGroups, updateGroup } from "../actions/groupActions"
import { GROUP_LIST_CREATE_RESET } from "../constants/groupConstants"

const FolderModal = ({ recipeId }) => {
  const [newFolder, setNewFolder] = useState("")
  const [show, setShow] = useState(false)
  let folderNames = []
  const dispatch = useDispatch()

  const groupList = useSelector((state) => state.groupList)
  const {
    loading: loadingGroups,
    success: successGroups,
    error: errorGroups,
    groups,
  } = groupList

  const groupListCreate = useSelector((state) => state.groupListCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = groupListCreate

  useEffect(() => {
    if (successCreate && show) {
      dispatch(listGroups())
      dispatch({ type: GROUP_LIST_CREATE_RESET })
    }
  }, [successCreate])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const createFolderHandler = () => {
    if (newFolder) {
      dispatch(createGroup(newFolder))
    }
  }
  const submitHandler = (e) => {
    e.preventDefault()
    folderNames.forEach((groupId) => {
      dispatch(updateGroup(groupId, recipeId))
    })
    handleClose()
  }

  return (
    <>
      <Button className="mt-auto" onClick={handleShow}>
        Add recipe to a folder
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {errorCreate && <Message>{errorCreate}</Message>}
          <Modal.Title>Choose a folder</Modal.Title>
        </Modal.Header>
        {errorGroups && <Message variant="danger">{errorGroups}</Message>}
        <Modal.Body>
          <Form>
            <Form.Group controlId="groupCheckBox">
              {groups &&
                groups.map((group) => (
                  <Form.Check
                    key={group._id}
                    id={group._id}
                    value={group._id}
                    type="checkbox"
                    label={group.name}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        folderNames.push(e.currentTarget.value)
                        //folder.push(e.currentTarget.value)
                      } else {
                        folderNames.splice(
                          folderNames.indexOf(e.currentTarget.value),
                          1
                        )
                        //folder.splice(folder.indexOf(e.currentTarget.value), 1)
                      }
                    }}
                  />
                ))}
            </Form.Group>

            <Form.Group className="mt-auto" controlId="newFolder">
              <Form.Control
                required
                type="text"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                placeholder="Add a folder..."
              ></Form.Control>
              <Button className="mt-2 btn-sm" onClick={createFolderHandler}>
                Create Folder
              </Button>
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

export default FolderModal
