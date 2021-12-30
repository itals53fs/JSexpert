/* docker ps
docker exec -it 31a346317eae /
mongo -u admin -p senhaadmin --autheticationDatabase admin
 */
/* show dbs

use herois

show collections */

db.teste.insert({
    nome: 'Tales',
    poder: 'Incrivel',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i=0; i<10; i++){
    db.herois.insert({
        nome: i,
        poder: 'Incrivel',
        dataNascimento: 2000-i
    })
}