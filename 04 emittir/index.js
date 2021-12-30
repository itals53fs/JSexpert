const EventEmitter = require('events')
class MyEmissor extends EventEmitter{
    
}
const myEmissor = new MyEmissor()

const nomeEvento = 'usuario:click'

myEmissor.on(nomeEvento, (event)=>{
    console.log('Um usuario clicou', event)
})

const stdin = process.openStdin()

stdin.addListener('data', (value)=>{
    console.log(`Voce digitou ${value.toString().trim()}`)
})