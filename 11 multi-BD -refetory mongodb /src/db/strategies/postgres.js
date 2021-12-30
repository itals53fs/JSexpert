const ICrud = require('./interfaces/interfaceCrud')
const sequelize = require('sequelize')

class Postgres  extends ICrud{
    constructor(){
        super()
        this._driver = null
        this._hetois = null
    }
    async isConnected(){
        try{
            await this._driver.authenticate()
            return true
        }catch(error){
            console.log('error', error)
            return false
        }
    }
   async connect(){
        this._driver = new sequelize(
            'heroes',
            'talesfelix',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifies: false,
                operatorsAliases: 0
            }
        )
        await this.defineModel()
    }
    async defineModel(){
        this._hetois = this._driver.define('herois', {
            id:{
                type: sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome:{
                type: sequelize.STRING,
                required: true
            },
            poder:{
                type: sequelize.STRING,
                required: true
            }
        },
        {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
    
        await this._hetois.sync()
    }
    
   async create(item){
        const {dataValues} = await this._hetois.create(item)
        return dataValues
    }
    async read(item){
        return this._hetois.findAll({where: item, raw: true})

    }
    async update(id, item){
        return this._hetois.update(item, {where:{id:id}})
    }
    async delete(id){
        const query = id? {id} : {}
        return this._hetois.destroy({where: query})
    }
}

module.exports = Postgres