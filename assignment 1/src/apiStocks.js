import { useState, useEffect } from "react"

function getStocks() {
  return fetch(`http://131.181.190.87:3000/stocks/symbols`)
    .then((res) => res.json())
    .then((res) =>
      res.map((company) => {
        if (res.status > 400) {
          console.log(res.message)
          throw new Error(`Error code is ${res.status}`)
        }
        return {
          name: company.name,
          symbol: company.symbol,
          industry: company.industry,
        }
      })
    )
}

export function useStocksAPI() {
  const [loading, setLoading] = useState(true)
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getStocks()
      .then((stocks) => {
        setStocks(stocks)
        setLoading(false)
      })
      .catch((e) => {
        setError(e)
        setLoading(false)
      })
  }, [])

  return {
    loading,
    stocks,
    error,
  }
}
