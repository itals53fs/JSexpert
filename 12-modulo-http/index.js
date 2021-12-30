const http = require('http')

http.createServer((req, res)=>{
    res.end('Hello Node!!')
}).listen(4000, ()=> console.log('Sever rodando'))