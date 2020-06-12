import React, { useState } from "react"
import { Input, Button } from "reactstrap"

function SearchBarQuote(props) {
  const [searchValue, setSearchValue] = useState("")
  const [error, setError] = useState(null)
  return (
    <div className="searchBarQuote__wrapper">
      <Input
        aria-labelledby="search-button"
        placeholder="Search Symbol"
        name="search"
        id="search"
        type="search"
        value={searchValue}
        onChange={(e) => {
          const { value } = e.target
          if (value === "") {
            setError(null)
          } else if (!/^[A-Z]{1,5}$/.test(value)) {
            setError(
              "Stock symbol incorrect format - must be 1-5 capital letters"
            )
          } else {
            setError(null)
          }
          setSearchValue(value)
        }}
      />
      {error != null ? (
        <p className="quote__error">Error: {error}</p>
      ) : null}
      <Button
        id="search-button"
        type="button"
        onClick={() => props.onSubmit(searchValue)}
      >
        Search
      </Button>
    </div>
  )
}

export default SearchBarQuote
