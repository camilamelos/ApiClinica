//Importando o Sequelize
const Sequelize = require("sequelize");

//Conexao com o Banco de Dados
const conexao = require("../banco/database");

//Criação da Model Da Tabela Categoria
//O Metodo Define crua uma tabela que possui parametros
// 1 - Nome da Tabela
// 2 - É um objeto JSON que representa os campos da tabela, seus tipos e regras de preenchimento

const Especialidade = conexao.define("tbl_especialidade", {
  nome_especialidade: {
    //String é o mesmo que VarChar
    type: Sequelize.STRING,
    // Campo allowNull é o Not Null
    allowNull: false
  }
});

// Executar a criação da tabela no banco de dados | comenta a linha depois de criada a tabela
// Especialidade.sync({force: true});

module.exports = Especialidade;
