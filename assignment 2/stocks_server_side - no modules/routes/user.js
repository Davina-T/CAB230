var express = require("express")
var router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello from users route")
})

/* POST user register */
router.post("/register", function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  // Verify body
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed",
    })
    return
  }

  // Determine if user already exists in table
  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email)
  queryUsers
    .then((users) => {
      // If user exists, return error response
      if (users.length > 0) {
        res.status(409).json({
          error: true,
          message: "User already exists!",
        })
        return
      }

      // If user does not exist, insert user into DB
      const saltRounds = 10
      const hash = bcrypt.hashSync(password, saltRounds)
      return req.db.from("users").insert({ email, hash })
    })
    .then(() => {
      res.status(201).json({ success: true, message: "User created" })
    })
})

/* POST user login */
router.post("/login", function (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  // Verify body
  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed",
    })
    return
  }

  // Determine is user exists in table
  const queryUsers = req.db
    .from("users")
    .select("*")
    .where("email", "=", email)
  queryUsers
    .then((users) => {
      // If user does not exist, return error response
      if (users.length == 0) {
        res.status(401).json({
          error: true,
          message: "Incorrect email or password",
        })
        return
      }

      // If user does exist, verify if passwords match
      // Compare password hashes
      const user = users[0]
      return bcrypt.compare(password, user.hash)
    })
    .then((match) => {
      // If passwords do not match, return error response
      if (!match) {
        res.status(401).json({
          error: true,
          message: "Incorrect email or password",
        })
        return
      }

      // If passwords match, create and return JWT token
      const secretKey = process.env.SECRETKEY
      const expires_in = 60 * 60 * 24 // 1 Day
      const exp = Math.floor(Date.now() / 1000) + expires_in
      const token = jwt.sign({ email, exp }, secretKey)
      res.json({ token_type: "Bearer", token, expires_in })
    })
})

module.exports = router
