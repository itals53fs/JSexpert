const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectando',
    2: 'Conectado',
    3: 'Disconectando'
}

class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }
    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if(state === 'Conectado') return state

        if(state === 'Conectando') return state

        await new Promise(resolve=> setTimeout(resolve, 1000))
        return STATUS[this._driver.readyState]
    }
    defineModel() {
       const heroiSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
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

        this._herois = Mongoose.model('herois', heroiSchema)
    }
    connect() {
        Mongoose.connect('mongodb://talesfelix:minhasenhasecreta@localhost:27017/herois',
            { useNewUrlParser: true, useUnifiedTopology: true }, function (error) {
                if (!error) return

                console.log('Falha na conexão', error)
            })

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('Database rodando!!'))
        this.defineModel()
    }
    async create(item) {
        return await this._herois.create(item)
    }

    async read(item, skip=0, limit=0){
        const result = await this._herois.find(item).skip(skip).limit(limit)
        return result
    }

    async update(id, item){
        return this._herois.updateOne({_id:id}, {$set: item})
    }
    async delete(id){
        return this._herois.deleteOne({_id: id})/*  ou
        return this._herois.remove({_id: id})  */
    }

}

module.exports = MongoDB