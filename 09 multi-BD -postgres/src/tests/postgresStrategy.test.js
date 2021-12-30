const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contexStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTAR = {nome: 'Tales', poder: 'Natalia'}
const MOCK_HEROI_ATUALIZAR = {nome: 'Fernando', poder: 'Carrinhos'}

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    this.beforeAll( async function(){
        await context.connect()
    })
    it('PostgresSQL Connection', async function(){
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadstrar um super', async function(){
        const result = await context.create(MOCK_HEROI_CADASTAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTAR)
    })
    it('Listar heroi', async function(){
        const [result] = await context.read({id: 1})
        assert.deepEqual(result, MOCK_HEROI_CADASTAR)
    })
    it('atualizar', async function(){
        const [atualizar] = await context.read({nome:'Tales'})
        const novoItem = {
            ...atualizar,
            ...MOCK_HEROI_ATUALIZAR
        }
        const [result] = await context.update(atualizar.id, novoItem)
        assert.deepEqual(result, 1)
        
    })
    it.only('remover por id', async function(){
        const [item] = await context.read({id:2})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })
})