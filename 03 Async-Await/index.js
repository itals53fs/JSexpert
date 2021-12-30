const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)
function getUser() {
    // problema -> reject(ERRO)
    // sucesso -> Resolve
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function () {
            //return reject(new Error('Deu ruim de verdade'))
            return resolve({
                id: 1,
                nome: 'Tales',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}
function getPhone(idUser) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
                return resolve({
                    numero: '123456789',
                    ddd: '33'
                })
            //return reject(new Error('Deu ruim de verdade'))
        }, 2000)
    })
}

function obterEndereco(idUser, callback){
    setTimeout(() => {
        return callback(null,{
            rua: 'dos bobos',
            numero: 0
        })

    }, 2000)
}

async function main(){
    try{
        console.time('medirtempo-promise')
        const user = await getUser()
        //const  telefone = await getPhone(user.id)
        //const endereco = await obterEnderecoAsync(user.id)

        const resultado = await Promise.all([
            getPhone(user.id),
            obterEnderecoAsync(user.id)
        ])
        const  telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${user.nome}
            Endereço: ${endereco.rua} n°${endereco.numero}
            Telefone: ${telefone.ddd} ${telefone.numero}
        `)
        console.timeEnd('medirtempo-promise')
    }catch(erro){
        console.log('deu ruim', erro)
    }
}
main()