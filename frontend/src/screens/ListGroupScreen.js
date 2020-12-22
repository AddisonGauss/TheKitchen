import React, { useEffect } from "react"

import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listGroups } from "../actions/groupActions"
import Group from "../components/Group"

const ListGroupsScreen = () => {
  const dispatch = useDispatch()

  const groupList = useSelector((state) => state.groupList)
  const { loading, groups, error } = groupList

  const groupDelete = useSelector((state) => state.groupDelete)
  const { success: successDelete } = groupDelete

  useEffect(() => {
    dispatch(listGroups())
  }, [dispatch, successDelete])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>My recipe folders</h1>
          <Row>
            {groups.map((group) => (
              <Col
                key={group._id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="d-flex align-items-stretch"
              >
                <Group group={group} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default ListGroupsScreen
