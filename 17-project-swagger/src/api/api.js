//npm i vision inert hapi-swagger
const MongoDb = require('./../db/mongodb/mongoDB')
const Context = require('./../db/base/contexStrategy')
const heroiSchema = require('./../db/mongodb/schema/heroisSchemas')
const HeroRoutes = require('./../routes/heroRotes')
const hapi = require('hapi')


const vision = require('vision')
const insert = require('inert')
const hapiswagger = require('hapi-swagger')


const app = new hapi.Server({
    port: 4000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, heroiSchema))
    const options = {
        info: {
            title: 'API Heros = Tales Félix',
            version: 'v!.0'
        },
        lang: 'pt'
    }
    /*await app.register([
        vision,
        insert,
        {
            plugin: hapiswagger,
            options: options
        }
    ])*/
    app.route(
        mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    )

    await app.start()
    console.log(`Sever rodando na porta ${app.info.port}`)
    return app
}
module.exports = main()