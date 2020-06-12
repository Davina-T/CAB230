import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-blue.css"

import SearchBarStocks from "../components/SearchBarStocks"
import DropdownBar from "../components/DropdownBar"

import { useStocksAPI } from "../apiStocks"
import { Container, Row, Col, Button } from "reactstrap"

function Stocks() {
  const { loading, stocks, error } = useStocksAPI()
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")
  const [dropdownItem, setDropdownItem] = useState("")

  useEffect(() => {
    if (!loading && stocks && !error) {
      setFiltered(
        stocks.filter((e) =>
          e.industry.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [stocks, search, loading, error])

  useEffect(() => {
    if (!loading && stocks && !error && dropdownItem) {
      setFiltered(stocks.filter((e) => e.industry === dropdownItem))
    }
  }, [stocks, search, loading, error, dropdownItem])

  const columns = [
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Industry", field: "industry" },
  ]

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }

  function reset() {
    setFiltered(stocks)
    setSearch("")
    setDropdownItem("")
  }

  return (
    <Container className="table__wrapper">
      <h1 className="page__title">Stocks</h1>

      <Row className="filter__wrapper">
        <Col xs="12" sm="4">
          <div className="stocks__searchBar__wrapper">
            <SearchBarStocks
              placeholder="Search Industry"
              search={search}
              setSearch={setSearch}
            />
          </div>
        </Col>
        <Col xs="12" sm="4">
          <Button
            id="reset-button"
            type="button"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Col>
        <Col xs="12" sm="4">
          <DropdownBar setDropdownItem={setDropdownItem} />
        </Col>
      </Row>

      {search !== "" && filtered.length === 0 && (
        <h3 className="search__error__message">
          Industry sector not found
        </h3>
      )}

      <div
        className="ag-theme-blue"
        style={{
          height: "1000px",
          width: "903px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={filtered}
          pagination={true}
          paginationPageSize={26}
          headerHeight={40}
          rowHeight={35}
          minColWidth={300}
        />
      </div>
    </Container>
  )
}

export default Stocks
