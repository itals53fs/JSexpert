const { promisify } = require('util')
const {
    readFile,
    writeFile

} = require('fs')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'data/herois.json'
    }
    async getdata() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escrever(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados, null, 2))
        return true
    }
    async cadastrar(heroi){
        const dados = await this.getdata()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        
        const heroidComid = {
            id,
            ...heroi
        }
        const dadosFinal = [
            ...dados,
            heroidComid
        ]
        const resultado = await this.escrever(dadosFinal)
        return resultado
    }
    async list(id) {
        const dados = await this.getdata()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }
    async remover(id){
        if(!id){
            return await this.escrever([])
        }

        const data = await this.getdata()
        const index = data.findIndex(item=> item.id === parseInt(id))
        if(index === -1){
            throw Error('Deu ruim')
        }

        data.splice(index, 1)
        const resultado = await this.escrever(data)
        return resultado 
    }
    async atualizar(id, dado){
        const dados = await this.getdata()
        const index = dados.findIndex(item=> item.id == parseInt(id))
        if(index === -1){
            throw Error('Deu ruim')
        }
        const atual = dados[index]
        const atualizarObj = {
            ...atual,
            ...dado
        }
        dados.splice(index, 1)
        return await this.escrever([
            ...dados,
            atualizarObj
        ])
    }
}

module.exports = new Database()