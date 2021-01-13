import React from "react"
import { Button } from "react-bootstrap"

const GroupName = ({ group, display, location }) => {
  const groupName = location.search
    ? String(location.search.split("=")[1])
    : "All Of My Favorites"
  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        active={groupName === group._id}
        onClick={() => display(group)}
        className="m-2 btn-block"
      >
        {group.name.substring(0, 14)}
      </Button>
    </>
  )
}

export default GroupName
