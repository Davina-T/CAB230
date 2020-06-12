import { useState, useEffect } from "react"

function getStocks(search) {
  return fetch(`http://131.181.190.87:3000/stocks/${search}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)

      if (res.status > 400) {
        console.log(res.message)
        throw new Error(`Error code is ${res.status}`)
      }

      if (res.error === true) {
        return {}
      }

      return {
        name: res.name,
        symbol: res.symbol,
        date: res.timestamp,
        open: res.open,
        high: res.high,
        low: res.low,
        close: res.close,
        volumes: res.volumes,
      }
    })
}

export function useStocksAPI(search) {
  const [loading, setLoading] = useState(true)
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getStocks(search)
      .then((stocks) => {
        if (stocks.date !== undefined) {
          let dateTime = new Date(stocks.date)
          stocks.date = dateTime.toLocaleDateString("en-GB")
        }

        setStocks(stocks)
        setLoading(false)
      })
      .catch((e) => {
        setError(e)
        setLoading(false)
      })
  }, [search])

  return {
    loading,
    stocks,
    error,
  }
}
