const { 
    deepEqual, 
    ok 
} = require('assert')

const database = require('./service')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}
const DEFAULT_ITEM_ALTERAR = {
    nome: 'Lanterna Verde',
    poder: 'luz',
    id: 1
}

describe('Suite de manipulação de Herois', ()=>{
    before( async ()=>{
        //await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })
    it('deve cadrastarum heroi, usando arqivos', async ()=>{
        const expecdet = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.list(expecdet.id)


        deepEqual(resultado, expecdet)
    })
    it('deve cadrastar um heroi usando arquivo', async ()=>{
        const expecdet = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [data] = await database.list(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(data, expecdet)
    })
    it('deve remover por id', async ()=>{
        const expecdet = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expecdet)
    })
    it.only('deve alterar por ai', async ()=>{
        const expecdet = {
            ... DEFAULT_ITEM_ALTERAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        const [resultado] = await database.atualizar(2, novoDado)
        deepEqual(resultado, expecdet)
    })
})