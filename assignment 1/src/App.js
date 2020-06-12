import React, { useState, useEffect } from "react"
import "./App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

// components
import Header from "./components/Header"
import Footer from "./components/Footer"
import AuthenticatedRoute from "./components/AuthenticatedRoute"

// pages
import Home from "./pages/Home"
import Stocks from "./pages/Stocks"
import Quote from "./pages/Quote"
import PriceHistory from "./pages/PriceHistory"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <Router>
      <div className="container">
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/stocks">
              <Stocks />
            </Route>

            <Route path="/quote">
              <Quote />
            </Route>

            <AuthenticatedRoute
              path="/price_history"
              component={PriceHistory}
            />

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              {loggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
          </Switch>

          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
