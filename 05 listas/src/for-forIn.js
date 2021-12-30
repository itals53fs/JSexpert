const service = require('./server')

async function main(){
    try{
        const res = await service.getPeople('a')
        
 /*        for(let i = 0; i < res.results.length; i++){
            const people = res.results[i].name
            console.log(people)
        } */
/*         for(let i in res.results){
            const people = res.results[i].name
            console.log(people)
        } */
        for(const people of res.results){
            console.log(people.name)
        }

    }catch(erro){
        console.log('DEU RUIM',erro)
    }
}
main()