const express = require("express");

//importando a Especialidade
const especialidade = require("../model/Especialidade");

//Configurações das rotas
const router = express.Router();

//Definição das rotas

//Rota de inserção de especialidade (Verbo HTTP: Post)

//Metodos do verbo da rota precisa de dois parametros

//1 - A rota em si

//2 - Ação que a rota deve executar (arrow function)

/*** CADASTRAR ESPECIALIDADE ***/
router.post("/especialidade/cadastrarEspecialidade", (req, res) => {  
  let { nome_especialidade } = req.body;
  especialidade
    .create({
      nome_especialidade
    })
    .then(() => {
      res.send("ESPECIALIDADE INSERIDA COM SUCESSO");
    });
});

/*** LISTAR ESPECIALIDADE ***/
router.get("/especialidade/listarEspecialidade", (req, res) => {
  especialidade.findAll().then(
    especialidade => {
      res.send(especialidade);    
  });
});

/*** LISTAR ESPECIALIDADE POR ID ***/
router.get("/especialidade/listarEspecialidade/:id", (req, res) => {
  let { id } = req.params;

  especialidade.findByPk(id).then(especialidade => {
      const {nome_especialidade} = especialidade;
    res.send(nome_especialidade);
  });
});

/*** ALTERAR ESPECIALIDADE ***/
router.put("/especialidade/alterarEspecialidade", (req, res) => {
  let { id, nome_especialidade } = req.body;

  especialidade.update({ nome_especialidade }, { where: { id } }).then(() => {
    res.send("DADOS DE ESPECIALDADES ALTERADOS COM SUCESSO");
  });
});

/*** EXCLUIR ESPECIALIDADE ***/
router.delete("/especialidade/deletarEspecialidade", (req, res) => {
  let { id } = req.body;

  especialidade.destroy({ where: { id } }).then(() => {
    res.send("ESPECIALIDADE EXCLUÍDA COM SUCESSO");
  });
});

module.exports = router;
