const {get} = require('axios')
const URL = 'https://swapi.dev/api/people'

async function getNamePeople(name){
    const baseUrl = `${URL}/?=search=${name}&format=json`
    const result = await get(baseUrl)
    return result
}

module.exports =  {getNamePeople}