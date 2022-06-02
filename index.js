// Importando do pacote express
const express = require('express'); //  metodo que espera como parametro uma string que vai ser usado o express

// Importação da conexão com o bando de dados
const conexao = require('./banco/database');

// importaçao das models
const Medico = require('./model/Medico');
const Especialidade = require('./model/Especialidade');

//Precisamos deixar o express como objeto para ser utilizado
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Importação das rotas
const especialidadeController = require('./controller/EspecialidadeController');
app.use('/', especialidadeController);

const medicoController = require('./controller/medicoController');
app.use('/', medicoController);


// Servidor de requisições da aplicação
//O express tem um metodo dentro dele chamado listen para abrir o servidor

app.listen(3000, ()=> // Listen é um metodo para chamar

    {
        console.log('Servidor rodando na porta 3000 na URL: http://localhost:3000');
    }

)  