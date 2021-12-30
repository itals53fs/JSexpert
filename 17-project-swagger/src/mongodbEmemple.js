/* npm i mongoose */

const Mongoose = require('mongoose')

Mongoose.connect('mongodb://talesfelix:minhasenhasecreta@localhost:27017/herois',
{useNewUrlParser:true, useUnifiedTopology: true}, function(error){
    if(!error) return

    console.log('Falha na conexão', error)
})

const connection = Mongoose.connection
connection.once('open', ()=> console.log('Database rodando!!'))

/* const state = connection.readyState */
/* 
console.log('0 Disconectado,\n1 connectado,\n2 connectado,\n3 disconnectando\nCONNEXÃO É', state )
 */
const heroiSchema = new Mongoose.Schema({
    name: {
        type: String,
        required:  true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main(){
    const resultCadrastar = await model.create({
        name: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('resultado', resultCadrastar)
    const listItns = await model.find({name:'Batman'})
    console.log('itens', listItns)
    //await model.remove({})
}
main()