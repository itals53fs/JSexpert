const ContextStrategy = require('./db/strategies/base/contexStrategy')
const MongoDB = require('./db/strategies/mongoDB')
const Postgres = require('./db/strategies/postgres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()