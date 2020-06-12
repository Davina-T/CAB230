import React, { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import { useStocksAPI } from "../apiPriceHistory"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-blue.css"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

// components
import SearchBarPriceHistory from "../components/SearchBarPriceHistory"
import DatePicker from "../components/DatePicker"

function Price_History() {
  const [search, setSearch] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [submitSearch, setSubmitSearch] = useState("")
  const [submitDateFrom, setSubmitDateFrom] = useState("")
  const [submitDateTo, setSubmitDateTo] = useState("")

  const { loading, stocks, error } = useStocksAPI(
    submitSearch,
    submitDateFrom,
    submitDateTo
  )

  const columns = [
    { headerName: "Date", field: "date" },
    { headerName: "Open", field: "open" },
    { headerName: "High", field: "high" },
    { headerName: "Low", field: "low" },
    { headerName: "Close", field: "close" },
    { headerName: "Volumes", field: "volumes" },
  ]

  if (loading) {
    return <p>Loading...</p>
  }

  function handleSubmit() {
    setSubmitSearch(search)
    setSubmitDateFrom(dateFrom)
    setSubmitDateTo(dateTo)
  }

  const ClosingLineChart = () => {
    return (
      <LineChart width={700} height={300} data={stocks.reverse()}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="close" stroke="#0a23b4" />
      </LineChart>
    )
  }

  return (
    <div className="table__wrapper">
      <h1 className="page__title">Price History</h1>
      <div className="priceHistory__searchBar__wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <SearchBarPriceHistory
            search={search}
            setSearch={setSearch}
          />
          <DatePicker date={dateFrom} setDate={setDateFrom} />
          <DatePicker date={dateTo} setDate={setDateTo} />
          <input
            id="priceHistory__input"
            type="submit"
            value="Search"
          />
        </form>
      </div>

      {submitSearch && submitDateFrom && submitDateTo ? (
        error != null ? (
          <h4 className="priceHistory__error">{error.message}</h4>
        ) : (
          <div>
            <div
              className="ag-theme-blue"
              style={{
                height: "350px",
                width: "902px",
              }}
            >
              <AgGridReact
                columnDefs={columns}
                rowData={stocks.reverse()}
                pagination={true}
                paginationPageSize={8}
                headerHeight={40}
                rowHeight={35}
                colWidth={150}
              />
            </div>

            <div className="chart__wrapper">
              <ClosingLineChart />
            </div>
          </div>
        )
      ) : (
        <p>
          Sample the most recent information for a particular stock.
        </p>
      )}
    </div>
  )
}

export default Price_History
