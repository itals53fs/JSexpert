/*
Pending: Estado inicial, ainda não terminou ou ainda não foi rejeitado.
Fulfillrd: Qaundo executou todas as operações com sucesso.
Rejected: Quando a operação falhou.
*/
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
            if (idUser == 1) {
                return resolve({
                    telefone: '123456789',
                    ddd: '33'
                })
            }
            return reject(new Error('Deu ruim de verdade'))
        }, 2000)
    })
}

function obterEndereco(idUser, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })

    }, 2000)
}

const user = getUser()
// para manipular com sucesso usamos o .then
// para manipular erros usamos o .cath

user
    .then((resultado) => {
        return getPhone(resultado.id)
            .then((resul) => {
                return {
                    usuario: {
                        nome: resultado.nome,
                        id: resultado.id
                    },
                    telefone: resul
                }
            })
    })
    .then((resultado) => {
        return obterEnderecoAsync(resultado.usuario.id)
            .then((resul) => {
                return {
                    dadosUser: {
                        user: resultado.usuario,
                        telefone: resultado.telefone,
                        endereco: resul
                    }
                }
            })
    })
    .then(function (resultado) {
        console.log('resultado', resultado)
    })
    .catch(function (erro) {
        console.log('Deu ruim', erro)
    })

