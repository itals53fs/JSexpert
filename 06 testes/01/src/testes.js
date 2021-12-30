//const assert = require('asseet')
const {getNamePeople} = require('./sevice')
/*describe('Star wars Tests', function(){
    it('deve buscar o r2 d2 no formato correto', async ()=>{
        const expected = [{
            name: 'R2-D2', peso: '96'
        }]
        const nameBase = 'r2'
        const resultado = await getNamePeople(nameBase)

        assert.deepEqual(resultado, expected)
    })
})*/
const result = getNamePeople('r2')
console.log(result)