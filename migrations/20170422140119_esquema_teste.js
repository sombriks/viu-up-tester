
exports.up = knex => knex.schema.createTable("img", (tb) => {
  tb.increments("idimg")
  tb.string("mimeimg")
  tb.string("nomeimg")
  tb.binary("dataimg")
})

exports.down = knex => knex.schema.dropTable("img")
