const BaseRoutes = require('./base/baseRoutes')

class HeroRoutes extends BaseRoutes{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            method: 'GET',
            path: '/herois',
            handler: (req, res)=>{
                try{
                    const {skip, limit, name} = req.query

                    if(isNaN(skip))
                        throw Error ('O Tipo informado é invalido')
                        
                    if(isNaN(limit))
                        throw Error ('O Tipo informado é invalido')
                    let query = {}
                    if(name){
                        query.name = name
                    }
                    return this.db.read(
                        query,
                        parseInt(skip),
                        parseInt(limit)
                        )

                }catch(error){
                    console.log('Deu ruim', error)
                    return 'Erro interno'
                }
                
            }
        }
    }
}

module.exports = HeroRoutes