import React from "react"

import Cards from "../components/Cards"

function Home() {
  return (
    <main>
      <Hero />
      <Cards />
    </main>
  )
}

const Hero = () => (
  <section className="hero">
    <div className="hero__content">
      <h1 className="hero__title">Stock Prices</h1>
      <p className="hero__subtitle">
        Welcome to the Stock Analyst portal. Click on Stocks to see
        the available companies, Quote to get the latest price
        information by stock symbol, or choose Price History to sample
        from the most recent one hundred days of information for a
        particular stock.
      </p>
    </div>
  </section>
)

export default Home
