
const knex = require("knex")(require("./knexfile").development)
const bodyparser = require("body-parser")
const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan("combined"))

app.use(bodyparser.raw({
  type: ['application/octet-stream', 'image/*', 'application/pdf', 'audio/*'],
  limit: 10240 * 1024
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Filename, Content-Type")
  next()
})

app.post("/upimage", (req, res) => {
  knex("img").insert({
    mimeimg: req.header("Content-Type"),
    nomeimg: req.header("X-Filename"),
    dataimg: req.body
  }, "idimg").then(ret => {
    res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

knex.migrate.latest().then(_ => app.listen(3000))
