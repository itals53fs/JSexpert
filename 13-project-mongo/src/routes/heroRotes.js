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
                return this.db.read()
            }
        }
    }
}

module.exports = HeroRoutes