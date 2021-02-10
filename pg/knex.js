
const KNEX = require("knex")

const knex = KNEX({
    client:"pg",
    connection:{
        host:"",
        port:1234,
        user:"",
        password:"",
        database:"",
        encrypt: true,
    },
    pool: { min:0, max:7 },
    useNullAsDefault: true
})

module.exports = {
    knex
}