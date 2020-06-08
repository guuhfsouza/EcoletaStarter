const express = require('express');
const server = express();


//pegando o banco 
const db = require('./database/db');

//habilita o uso do req.body
server.use(express.urlencoded({ extended: true}))

//config pasta public para deixar todo os arquivos visiveis para rodar no server. 
//Serve para que o servidor acesse styles, assets, js, etc
server.use(express.static('public'))


//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server, //mostra ao nunjucks qual é o server
    noCache: true //ignora o cache
})
// no template engine faltou conceitos de extend e block. São formas de refatorar e reaproveitar código.
//Ver as aulas para aplicar após assimilar o conteudo novo.


//configuração das rotas
server.get('/', (req, res) => {
    return res.render("index.html") //renderizando a pagina html com base nas configuraçções 
    //feitas no nunjucks que aponta a pasta onde os htmls ficam
})

server.get('/create-point', (req, res) => {
    return res.render("create-point.html")
})

server.post('/savepoint', (req, res) => {
    const data = req.body

    const query = `insert into collector (
                 name, image, address, address2, city, state, items
             ) values (? ,? ,? ,? ,? ,? ,? )`;
            
     const values = [
                data.name,
                data.image,
                data.address,
                data.address2,
                data.city,
                data.state,
                data.items
            ]

            db.run(query, values, function(err) { //callback é feita para que seja executada essa query e enquanto ela é executada a aplicação não pare.
                                                // Serve para continuar a execução da aplicação e depois chame essa função novamente
                if(err){
                    return res.send('Erro no cadastro') // criar uma tela para erro
                }
                return res.render("create-point.html", {saved: true})
            });
})

server.get('/search', (req, res) => {  
    const search = req.query.search;
    // if(search == ""){
    //     return res.render("search-results.html" , { total: 0}) // mostra a pagina e os dados do db. 
    // }
    
    db.all(`SELECT * FROM collector WHERE city LIKE '%${search}%' `, function(err, rows/* rows é um array que vem com os registros da tabela*/){
        if(err){
            return console.log(err)
        }   
       
        const total = rows.length;      
        return res.render("search-results.html", {places: rows, total : total}) // mostra a pagina e os dados do db. 
    })
})


server.listen(4000); //liga o servidor