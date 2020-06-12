import { useState, useEffect } from "react"

const API_URL = "http://131.181.190.87:3000"

async function getAuthStock(search, dateFrom, dateTo) {
  const url = `${API_URL}/stocks/authed/${encodeURIComponent(
    search
  )}?from=${encodeURIComponent(dateFrom)}&to=${encodeURIComponent(
    dateTo
  )}`

  const token = localStorage.getItem("token")
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  const res = await fetch(url, { headers })
  const json = await res.json()
  console.log(json)

  if (json.error) {
    console.log(json.message)
    return json
  }

  return json.map((company) => {
    return {
      name: company.name,
      symbol: company.symbol,
      date: company.timestamp,
      open: company.open,
      high: company.high,
      low: company.low,
      close: company.close,
      volumes: company.volumes,
    }
  })
}

export function useStocksAPI(search, dateFrom, dateTo) {
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (dateFrom !== "" && dateTo !== "" && search !== "") {
      setLoading(true)
      getAuthStock(search, dateFrom, dateTo)
        .then((response) => {
          if (Array.isArray(response)) {
            for (let i = 0; i < Object.keys(response).length; i++) {
              if (response[i].date !== undefined) {
                let dateTime = new Date(response[i].date)
                response[i].date = dateTime.toLocaleDateString(
                  "en-GB"
                )
              }
            }
            setError(null)
            setStocks(response)
            setLoading(false)
          } else {
            setError(response)
            setLoading(false)
          }
        })
        .catch((e) => {
          setError(e)
          setLoading(false)
        })
    }
  }, [search, dateFrom, dateTo])

  return {
    loading,
    stocks,
    error,
  }
}
