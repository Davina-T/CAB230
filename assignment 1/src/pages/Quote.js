import React, { useState } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-blue.css"
import { useStocksAPI } from "../apiQuote"
import SearchBarQuote from "../components/SearchBarQuote"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

function Quote() {
  const [search, setSearch] = useState("")
  const { loading, stocks, error } = useStocksAPI(search)

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

  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }

  const ClosingLineChart = () => {
    return (
      <LineChart width={700} height={500} data={chartData}>
        <XAxis />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#0a23b4" />
      </LineChart>
    )
  }

  const chartData = [
    { name: "Open", price: stocks.open },
    { name: "High", price: stocks.high },
    { name: "Low", price: stocks.low },
    { name: "Close", price: stocks.close },
  ]

  return (
    <div className="table__wrapper">
      <h1 className="page__title">Quote</h1>
      <div className="quote__searchBar__wrapper">
        <SearchBarQuote onSubmit={setSearch} />
      </div>
      {search ? (
        Object.keys(stocks).length === 0 ? (
          <h3 className="search__error__message">
            No entry for symbol in stocks database
          </h3>
        ) : (
          <div>
            <div
              className="ag-theme-blue"
              style={{
                height: "78px",
                width: "902px",
              }}
            >
              <AgGridReact
                columnDefs={columns}
                rowData={[stocks]}
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
          Get the latest price information by searching a company by
          symbol.
        </p>
      )}
    </div>
  )
}

export default Quote
