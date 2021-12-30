const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongoDB')
const Context = require('./../db/strategies/base/contexStrategy')
const heroiSchema = require('./../db/strategies/mongodb/schema/heroisSchemas')


const MOCK_HEROI_CADASTAR = {name: 'Batman', poder: 'Dinheiro'}
const MOCK_HEROI_ATUALIZAR = {name: 'Fernando', poder: 'Carrinhos'}

let context = {}
describe('MongoDB Suite de Testes', function(){
    let ObjectId = ''

    this.beforeAll( async ()=>{
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, heroiSchema))
        
    })

    it('MongoDB Connection', async ()=>{
        const result = await context.isConnected()
        const expected = "Conectado"
        assert.deepEqual(result, expected)
    })

    it('cadstrar um super', async function(){
            const {name, poder} = await context.create(MOCK_HEROI_ATUALIZAR)

        assert.deepEqual({name, poder}, MOCK_HEROI_CADASTAR)
    })

    it('Listar heroi', async function(){

        const [{name, poder, id}]= await context.read({name:'Batman'})
        ObjectId = {id}
      assert.deepEqual({name, poder}, MOCK_HEROI_CADASTAR)
    })
    it('atualizar', async function(){
/*         const [atualizar] = await context.read({nome:'Tales'})
        const novoItem = {
            ...atualizar,
            ...MOCK_HEROI_ATUALIZAR
        }
        const [result] = await context.update(atualizar.id, novoItem)
        assert.deepEqual(result, 1) */

        const result = await context.update(ObjectId.id, {
            name: 'itals'
        })
        assert.deepEqual(result.nModified, 1)
        
    })
    it('remover por id', async function(){
        const result = await context.delete(ObjectId.id)

        assert.deepEqual(result.n, 1)
    })
})