const assert = require('assert')
const api = require('./../api/api')

let app = {}
const MOCK_HEROI_CADASTAR = { name: 'Fernando', poder: 'comer' }
describe.only('Suite de Testes API 16', function () {
    const TAM_LIMIT = 5
    let MOCK_ID = ''
    this.beforeAll(async () => {
        app = await api

        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTAR)
        })
        const {_id} = JSON.parse(result.payload)
        MOCK_ID = _id
    })

    it('Listar herois API', async () => {
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        //assert.ok(Array.isArray(dados))
        assert.deepEqual(statusCode, 200)
    })

    it('Listar por query 5 registros', async () => {
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIMIT}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.ok(dados.length <= TAM_LIMIT)
        assert.deepEqual(statusCode, 200)

    })
    it('Deve filtar um item', async () => {
        const TAM_LIMIT = 5
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIMIT}&name=${MOCK_HEROI_CADASTAR.name}`
        })

        const dados = JSON.parse(result.payload)

        assert.deepEqual(dados[0].name, MOCK_HEROI_CADASTAR.name)

    })
    it('Deve cadrastar /herois - POST', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_CADASTAR
        })

        const statusCode = result.statusCode
        const { message } = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(message, 'Heroi cadastrado')
    })

    it('Deve atualizar /herois/:id - PATCH', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            payload: {poder: 'super carros'}
        })


        const { message } = JSON.parse(result.payload)
        const {nModified} = JSON.parse(result.payload)

        assert.ok( nModified === 1)
        assert.deepEqual(message, 'Heroi atualizado')
    })


    it('Deve remover /herois/:id - DELETE', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}`,
        })



        const {deletedCount, message} = JSON.parse(result.payload)

        
        assert.ok( deletedCount == 1)
        assert.deepEqual(message, 'Heroi removido')
    })

    it('NÃO Deve remover /herois/:id - DELETE', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}`,
        })

        const {statusCode, message} = JSON.parse(result.payload)
        assert.ok(statusCode === 412)
        assert.deepEqual(message, 'Not Fauld')
    })

})