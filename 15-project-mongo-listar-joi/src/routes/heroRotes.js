const BaseRoutes = require('./base/baseRoutes')
const Joi = require('joi')
class HeroRoutes extends BaseRoutes {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            method: 'GET',
            path: '/herois',
            options: {
                // payload -> body

                validate: {
                    failAction: (resq, headers, erro) => {
                        throw erro;
                    },
/*                     query: {
                         skip: Joi.number(),
                         limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100) 
                    } */
                }
            },
            handler: (req, res) => {
                try {
                    const { skip, limit, name } = req.query

                    /*  if(isNaN(skip))
                         throw Error ('O Tipo informado é invalido')
                         
                     if(isNaN(limit))
                         throw Error ('O Tipo informado é invalido') */
                    const query = name? {name: {$regex: `.*${name}.*`}} : {}
                    return this.db.read(
                        query,
                        parseInt(skip),
                        parseInt(limit)
                    )

                } catch (error) {
                    console.log('Deu ruim', error)
                    return 'Erro interno'
                }

            }
        }
    }
}

module.exports = HeroRoutes