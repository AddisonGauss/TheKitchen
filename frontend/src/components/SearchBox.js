import React, { useState } from "react"
import { Form, Button, ButtonGroup } from "react-bootstrap"

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }
  return (
    <Form onSubmit={submitHandler} inline className="search-form">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Recipes..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button
        type="submit"
        variant="success"
        className="p-2 search-btn"
        size="sm"
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
