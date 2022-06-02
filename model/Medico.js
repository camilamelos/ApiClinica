//Importando o Sequelize
const Sequelize = require("sequelize");

//Conexao com o Banco de Dados
const conexao = require("../banco/database");

//Importação da Tabela de Especialidade para criação da chave estrangeira representando a cardinalidade 1:N
const Especialidade = require("./Especialidade");

const Medico = conexao.define("tbl_medico", {
  nome_medico: {
    type: Sequelize.STRING(300),
    allowNull: false
  },

  email_medico: {
    type: Sequelize.STRING(100),
    allowNull: false
  },

  imagem_peq: {
    type: Sequelize.STRING,
    allowNull: false
  },

  imagem_grd: {
    type: Sequelize.STRING,
    allowNull: false
  },

  telefone_medico: {
    type: Sequelize.INTEGER(10),
    allowNull: false
  },

  celular_medico: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  }
});

// Colocando chave estrangeira | Lado Muitos N
Especialidade.hasMany(Medico);

// Colocando chave Primaria | Lado Muitos 1
Medico.belongsTo(Especialidade);

//Medico.sync({force:true})

module.exports = Medico;
