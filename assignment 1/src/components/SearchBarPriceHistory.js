import React, { useState } from "react"
import { Input } from "reactstrap"

function SearchBarPriceHistory({ search, setSearch }) {
  const [error, setError] = useState(null)

  return (
    <div>
      <Input
        aria-labelledby="search-button"
        placeholder="Search Symbol"
        name="search"
        id="search"
        type="search"
        value={search}
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
          setSearch(value)
        }}
      />

      {error != null ? (
        <p className="price__history__error">Error: {error}</p>
      ) : null}
    </div>
  )
}

export default SearchBarPriceHistory
