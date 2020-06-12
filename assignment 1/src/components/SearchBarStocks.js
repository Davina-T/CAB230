import React from "react"
import { Input } from "reactstrap"

function SearchBarStocks({ placeholder, search, setSearch }) {
  return (
    <div>
      <Input
        placeholder={placeholder}
        name="search"
        id="search"
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchBarStocks
