const assert = require('assert')
const api = require('./../api/api')

let app =  {}
const MOCK_HEROI_CADASTAR = {name: 'Fernando', poder: 'carrinho'}
describe.only('Suite de Testes API', function(){
    const TAM_LIMIT = 5

    this.beforeAll( async ()=>{
        app = await api
        
    })

    it('Listar herois API', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIMIT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        //assert.ok(Array.isArray(dados))
        assert.deepEqual(statusCode, 200)
    })

    it('Listar por query 5 registros', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIMIT}`
        })
        
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.ok(dados.length <=TAM_LIMIT )
        assert.deepEqual(statusCode, 200)

    })
    it('Deve filtar um item', async ()=>{
        const TAM_LIMIT = 5
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIMIT}&name=${MOCK_HEROI_CADASTAR.name}`
        })
        
        const dados = JSON.parse(result.payload)

        assert.deepEqual(dados[0].name, MOCK_HEROI_CADASTAR.name)

    })
    it('Deve cadrastar /herois - POST', async ()=>{
        const result = await app.inject({
            method: 'POST',
            url: `/herois?skip=0&limit=${TAM_LIMIT}&name=${MOCK_HEROI_CADASTAR.name}`,
            payload: MOCK_HEROI_CADASTAR
        })

        const statusCode = result.statusCode
        const {message} = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.deepEqual(message, 'Heroi cadastrado')
    })
})