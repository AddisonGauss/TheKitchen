import React, { useEffect, useState } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getMyFavorites } from "../actions/userActions"
import { listGroups } from "../actions/groupActions"
import GroupName from "../components/GroupName"
import { useHistory } from "react-router-dom"
import GroupRecipes from "../components/GroupRecipes"
import Favorites from "../components/Favorites"
import { listGroupDetails } from "../actions/groupActions"

const UserProfileScreen = ({ location }) => {
  const groupName = location.search
    ? String(location.search.split("=")[1])
    : "All Of My Favorites"

  const dispatch = useDispatch()
  const history = useHistory()

  const userMyFavoritesList = useSelector((state) => state.userMyFavoritesList)
  const { loading, error, favorites } = userMyFavoritesList

  const groupList = useSelector((state) => state.groupList)
  const { loadingGroupList, groups, errorGroupList } = groupList

  const groupListDetails = useSelector((state) => state.groupListDetails)
  const {
    loadingGroupListDetails,
    group,
    errorGroupListDetails,
    successGroupListDetails,
  } = groupListDetails

  const groupDeleteRecipe = useSelector((state) => state.groupDeleteRecipe)
  const {
    loading: loadingDeleteRecipe,
    success: successDeleteRecipe,
    error: errorDeleteRecipe,
  } = groupDeleteRecipe

  const groupDelete = useSelector((state) => state.groupDelete)
  const {
    loading: loadingGroupDelete,
    success: successGroupDelete,
    error: errorGroupDelete,
  } = groupDelete

  const groupUpdateName = useSelector((state) => state.groupUpdateName)
  const {
    loading: loadingGroupUpdateName,
    success: successGroupUpdateName,
    error: errorGroupUpdateName,
    group: updatedGroup,
  } = groupUpdateName

  const display = (group) => {
    history.push(`/profile?group=${group._id}`)
    dispatch(listGroupDetails(group._id))
  }

  useEffect(() => {
    dispatch(getMyFavorites())
    dispatch(listGroups())
    if (groupName != "All Of My Favorites") {
      dispatch(listGroupDetails(groupName))
    }
  }, [
    dispatch,
    successGroupListDetails,
    successDeleteRecipe,
    successGroupUpdateName,
    successGroupDelete,
  ])

  return (
    <>
      <h1 className="text-center">My favorites</h1>
      {(loadingDeleteRecipe ||
        loading ||
        loadingGroupList ||
        loadingGroupListDetails) && <Loader />}
      <Col lg={10} sm={12} xs={12} className="m-auto">
        <Row>
          <Col lg={3} sm={4} xs={6}>
            <Button
              size="sm"
              active={groupName === "All Of My Favorites"}
              variant="outline-primary"
              className=" btn-block m-2"
              onClick={() => history.push(`/profile`)}
            >
              All Favorites
            </Button>
          </Col>
          {groups.map((group) => (
            <Col key={group._id} lg={3} sm={4} xs={6}>
              <GroupName
                key={group._id}
                group={group}
                display={display}
                location={location}
              />
            </Col>
          ))}
        </Row>
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : groupName === "All Of My Favorites" ? (
        <Favorites favorites={favorites} />
      ) : loadingGroupListDetails ? (
        <Loader />
      ) : errorGroupListDetails ? (
        <Message variant="danger">{errorGroupListDetails}</Message>
      ) : (
        <GroupRecipes group={group} location={location} />
      )}
    </>
  )
}

export default UserProfileScreen
