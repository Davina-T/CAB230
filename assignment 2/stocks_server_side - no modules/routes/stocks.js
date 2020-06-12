var express = require("express")
var router = express.Router()
const jwt = require("jsonwebtoken")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello from stocks route")
})

/* Authorization check */
const authorize = (req, res, next) => {
  const authorization = req.headers.authorization
  let token = null

  // Retrieve token
  if (authorization && authorization.split(" ").length == 2) {
    token = authorization.split(" ")[1]
    // console.log("Token: ", token)
  } else {
    res.status(403).json({
      error: true,
      message: "Authorization header not found",
    })
    return
  }

  // Verify JWT and check expiration date
  try {
    secretKey = process.env.SECRETKEY
    const decoded = jwt.verify(token, secretKey)

    if (decoded.exp > Date.now()) {
      res.status(401).json({
        error: true,
        message: "Token has expired",
      })
      return
    }
    // Permit user to advance to route
    next()
  } catch (e) {
    res.status(401).json({
      error: true,
      message: ("Token is not valid: ", err),
    })
  }
}

/* GET /stocks/symbols */
router.get("/symbols", function (req, res, next) {
  const industry = req.query.industry

  // Verify query
  // If there is an industry query, display filtered stocks
  if (industry) {
    req.db
      .distinct()
      .from("stocks")
      .select("name", "symbol", "industry")
      .where("industry", "like", `%${industry}%`)
      .then((rows) => {
        // Check if industry only contains letters
        if (industry.match(/^[A-Za-z]+$/)) {
          // Check if industry sector is found
          if (rows.length == 0) {
            res.status(404).json({
              error: true,
              message: "Industry sector not found",
            })
          }
          res.json(rows)
        } else {
          res.status(404).json({
            error: true,
            message: "Industry parameter can only contain letters",
          })
        }
      })
    // Else if the query parameter is wrong, return error response
  } else if (/\?.+/.test(req.url)) {
    res.status(400).json({
      error: true,
      message:
        "Invalid query parameter: only 'industry' is permitted",
    })
    // Else, display all stocks
  } else {
    req.db
      .distinct()
      .from("stocks")
      .select("name", "symbol", "industry")
      .then((rows) => {
        res.json(rows)
      })
      .catch((err) => {
        res.json({ Error: true, Message: "Error in MySQL query" })
      })
  }
})

/* GET /stocks/:symbol */
router.get("/:symbol", function (req, res, next) {
  const from = req.query.from
  const to = req.query.to

  // Verify query
  if (from || to) {
    res.status(400).json({
      error: true,
      message:
        "Date parameters only available on authenticated route /stocks/authed",
    })
  } else {
    req.db
      .from("stocks")
      .select("*")
      .where("symbol", "=", req.params.symbol)
      .orderBy("timestamp", "desc")
      .limit(1)
      .then((rows) => {
        if (rows.length == 0) {
          res.status(404).json({
            error: true,
            message: "No entry for symbol in stocks database",
          })
        }
        res.json(rows[0])
      })
      .catch((err) => {
        res.json({
          Error: true,
          Message: "Error executing MySQL query",
        })
      })
  }
})

/* GET /stocks/authed/:symbol */
router.get("/authed/:symbol", authorize, function (req, res, next) {
  const from = req.query.from
  const to = req.query.to

  // Verify query
  if (!from || !to) {
    res.status(400).json({
      error: true,
      message:
        "Parameters allowed are 'from' and 'to', example: /stocks/authed/AAL?from=2020-03-15",
    })
  }

  req
    .db("stocks")
    .where("symbol", "=", req.params.symbol)
    .where("timestamp", ">", from)
    .where("timestamp", "<=", to)
    .then((rows) => {
      if (rows.length == 0) {
        res.status(404).json({
          error: true,
          message:
            "No entries available for query symbol for supplied date range",
        })
      }
      res.json(rows)
    })
})

module.exports = router
