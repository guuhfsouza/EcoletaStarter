const sqlite3 = require('sqlite3').verbose();


//cria um objeto que irá operar no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

//utilizando o objeto de banco para a operação.
// db.serialize(() => {
    
// //Criar tabela
    // db.run(`
    //     Create table if not exists collector(
    //         idCollector integer primary key autoincrement,
    //         name text,
    //         image text,
    //         address text,
    //         address2 text,
    //         state text,
    //         city text,
    //         items text
    //     );
    // `)

// // Insert na tabela    
//     const query = `insert into collector (
//         name, image, address, address2, state, city, items
//     ) values (? ,? ,? ,? ,? ,? ,? )`;
    
//     const values = [
//         "Papersider",
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Guilherme Gamballa, Jardim América",
//         "nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]
//     db.run(query, values, function(err) { //callback é feita para que seja executada essa query e enquanto ela é executada a aplicação não pare.
//                                         // Serve para continuar a execução da aplicação e depois chame essa função novamente
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso");
//         console.log(this); // this referencia o run 
//     });

// //select na tabela
//     db.all(`select * from collector`, function(err, rows/* rows é um array que vem com os registros da tabela*/){
//         if(err){
//             return console.log(err)
//         }
//         console.log(rows);
//     })

//delete na tabela -> exemplo
//  db.run(`delete from collector where idCollector = ? `,[5], function(err) { //callback é feita para que seja executada essa query e enquanto ela é executada a aplicação não pare.
//                                         // Serve para continuar a execução da aplicação e depois chame essa função novamente
//         if(err){
//             return console.log(err)
//         }
//         console.log("Registro removido com sucesso."); 
//     });
// })
