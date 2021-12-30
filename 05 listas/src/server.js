const axios = require('axios')
const URL = 'https://swapi.dev/api/people'

async function getPeople(name) {
    const url = `${URL}/?serach=${name}&format=json`
    const response = await axios.get(url)
    return response.data
}

/* getPeople('rs')
    .then((response) => {
        console.log("resposta:", response)
    })
    .catch((erro)=>{
        console.log("Deu ruim", erro)
    }) */

    module.exports = {
        getPeople
    }