const BaseRoutes = require('./base/baseRoutes')
const Joi = require('joi');
const Boom = require('boom')
const failAction = (resq, headers, erro) => {
    throw erro;
}
class HeroRoutes extends BaseRoutes {
    constructor(db) {
        super()
        this.db = db
    }
    list() {
        return {
            method: 'GET',
            path: '/herois',
            config: {
                // payload -> body

                validate: {
                    failAction
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

                    const query = name ? { name: { $regex: `.*${name}.*` } } : {}
                    return this.db.read(
                        query,
                        parseInt(skip),
                        parseInt(limit)
                    )

                } catch (error) {
                    console.log('Deu ruim', error)
                    return Boom.internal()
                }

            }
        }
    }
    create() {
        const payload = Joi.object({
            name: Joi.string().required().min(3).max(100),
            poder: Joi.string().min(3).max(100)
        })
        return {
            path: '/herois',
            method: 'POST',
            options: {
                validate: {
                    failAction,
                    //payload
                }
            },
            handler: async req => {
                try {
                    const { name, poder } = req.payload
                    const result = await this.db.create({ name, poder })
                    return {
                        message: 'Heroi cadastrado',
                        _id: result._id
                    }
                } catch (error) {
                    console.log("Deu ruim", error)
                    return Boom.internal()
                }
                
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',

            config: {
                validate: {
                    failAction,
                }
            },
            handler: async req => {
                try {
                    const { id } = req.params
                    const { payload } = req
                    const result = await this.db.update(id, payload)
                    if (result.nModified === 1) {
                        return {
                            message: 'Heroi atualizado',
                            nModified: result.nModified
                        }
                    }
                    
                    return Boom.preconditionFailed("Not Fauld")
                } catch (error) {
                    console.log('error', error)
                    return Boom.internal()
                
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',

            config: {
                validate: {
                    failAction,
                }
            },
            handler: async req => {
                try {
                    const { id } = req.params
                    const result = await this.db.delete(id)

                    if (result.deletedCount == 1) {
                        return {
                            message: 'Heroi removido',
                            deletedCount: result.deletedCount
                        }
                    }
                    return Boom.preconditionFailed("Not Fauld")


                } catch (error) {
                    console.log('error', error)
                    returnBoom.internal()
                
                }
            }
        }
    }
}

module.exports = HeroRoutes