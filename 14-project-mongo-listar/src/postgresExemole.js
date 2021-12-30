// npm install sequelize
// npm install pg-hstore pg

const sequelize = require('sequelize')

const driver = new sequelize(
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

async function main(){
    const Herois = driver.define('herois', {
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

    await Herois.sync()

    await Herois.create({
        nome:'Lanterna Verde',  
        poder: 'luz'
    })

    const result = await Herois.findAll({
        raw: true
    })
    console.log('result', result)
}
main()