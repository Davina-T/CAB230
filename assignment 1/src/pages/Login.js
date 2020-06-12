import React, { useState } from "react"
import { Input, Button } from "reactstrap"

function Login() {
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const API_URL = "http://131.181.190.87:3000"

  function login() {
    const url = `${API_URL}/user/login`

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // if its an error
        if (res.error) {
          setError(res.message)
        } else {
          setError(null)
          setSuccess("Login successful")
        }

        console.log(res)

        if (res.token !== undefined) {
          localStorage.setItem("token", res.token)
          window.location.reload(false)
        }
      })
  }

  return (
    <div className="login__container">
      <div className="login__wrapper">
        <h1 className="login__header">Login</h1>

        {error != null ? (
          <p className="register__error">{error}</p>
        ) : null}

        {success != null ? (
          <p className="register__success">{success}</p>
        ) : null}

        <Input
          aria-labelledby="login-button"
          placeholder="Email"
          name="email"
          id="email"
          type="text"
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value)
          }}
        ></Input>
        <Input
          aria-labelledby="login-button"
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          value={passwordValue}
          onChange={(e) => {
            setPasswordValue(e.target.value)
          }}
        ></Input>
        <Button id="login-button" type="button" onClick={login}>
          Submit
        </Button>

        <p>
          Not a member?{" "}
          <a className="register__link" href="/register">
            Click here to register now!
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
