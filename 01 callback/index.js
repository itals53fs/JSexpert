function getUser(callback){
    setTimeout(function(){
        return callback(null, {
            idUser: '00',
            name: 'itals',
            endereco: 'rua travessa 02',
            phone: '9999999'
        })
    },1000)
}
function getPhone(idUser, callback){
    setTimeout(function(){
        return callback(null, {
            phone: '11111'
        })
    },2000)
}
function getEndereco(idUser){

}

function resolverUsuario(erro, usuario){

}

getUser(function(erro, usuario){
    if(erro){
        console.error("Deu ruim mano, deu ruim em usuário", erro)
        return;
    }

    getPhone('111', function(erro1, telefone){
        if(erro1){
            console.error("Deu ruim mano, deu ruim em telefone", erro1)
            return;
        }
        console.log(`
            Usuario: ${usuario.name}\n
            Telefone: ${telefone.phone}
        `)
    })

})
//const phone = getPhone(user.idUser)

//console.log(`usuário ${user.name} seu telefone ${phone} `)