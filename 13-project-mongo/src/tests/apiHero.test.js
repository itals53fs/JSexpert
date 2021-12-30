const assert = require('assert')
const api = require('./../api/api')

let app =  {}

describe('Suite de Testes API', function(){

    this.beforeAll( async ()=>{
        app = await api
        
    })

    it('Listar herois API', async ()=>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const statusCode = result.statusCode
        console.log('resultado', result)
        assert.deepEqual(statusCode, 200)
    })
})