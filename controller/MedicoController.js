const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

const medico = require("../model/Medico");
const { Router } = require("express");
const router = express.Router();

/******* MULTER - STORAGE ******/
/** GERENCIA O ARMAZENAMENTO DOS ARQUIVOS **/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + "_" + file.originalname);
  }
});

/******* MULTER - FILTER ******/
/** GERENCIA O TIPO DE ARQUIVO QUE PPDE SER RECEBIDO **/
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/******* MULTER -  UPLOAD ******/
/** EXECUTA O PROCESSO DE ARMAZENAMENTO **/
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

/*** CADASTRAR MEDICO ****/
router.post("/medico/cadastrarMedico", upload.array("files", 2), (req, res) => {
  console.log(req.files[0]);
  console.log(req.files[1]);
  console.log(req.body);

  const {
    nome_medico,
    email_medico,
    telefone_medico,
    celular_medico,
    tblEspecialidadeId
  } = req.body;
  const imagem_peq = req.files[0].path;
  const imagem_grd = req.files[1].path;

  medico
    .create({
      nome_medico,
      email_medico,
      imagem_peq,
      imagem_grd,
      telefone_medico,
      celular_medico,
      tblEspecialidadeId
    })
    .then(() => {
      res.send("DADOS DO MÉDICO INSERIDOS COM SUCESSO!");
    });
});

/*** LISTAR MEDICO ***/
router.get("/medico/listarMedico", (req, res) => {
  medico.findAll().then(medicos => {
    res.send(medicos);
  });
});

/*** LISTAR MEDICO POR ID ***/
router.get("/medico/listarMedicoCodigo/:id", (req, res) => {
  const { id } = req.params;
  medico.findByPk(id).then(medicosId => {
    res.send(medicosId);
  });
});

/*** EXCLUIR MEDICO  ****/
router.delete("/medico/excluirMedico/:id", (req, res) => {
  const { id } = req.params;

  medico.findByPk(id).then(medico => {
    let imagem_grd = medico.imagem_grd;
    let imagem_peq = medico.imagem_peq;

    medico
      .destroy({
        where: { id }
      })
      .then(() => {
        // Exclusão da imagem pequena
        fs.unlink(imagem_peq, error => {
          if (error) {
            console.log("Erro ao excluir a imagem: " + error);
          } else {
            console.log("Imagem excluida pequena com sucesso! ");
          }
        });

        /*Exclusão da imagem grande  */
        fs.unlink(imagem_grd, error => {
          if (error) {
            console.log("Erro ao excluir a imagem: " + error);
          } else {
            console.log("Imagem excluida grande com sucesso! ");
          }
        });

        res.send("DADOS DE MÉDICOS EXCLUÍDOS COM SUCESSO!");
      });
  });
});

/*** ALTERAR MEDICO ***/
router.put("/medico/editarMedico", upload.array("files", 2), (req, res) => {
  const {
    id,
    nome_medico,
    email_medico,
    telefone_medico,
    celular_medico,
    tblEspecialidadeId
  } = req.body;

  /** Update com Imagem **/
  if (req.files != "") {
    medico.findByPk(id).then(medico => {
      let imagem_peq = medico.imagem_peq;
      let imagem_grd = medico.imagem_grd;

      // Exclusão da imagem pequena
      fs.unlink(imagem_peq, error => {
        if (error) {
          console.log("Erro ao excluir a imagem: " + error);
        } else {
          console.log("Imagem excluida pequena com sucesso! ");
        }
      });

      /*Exclusão da imagem grande  */
      fs.unlink(imagem_grd, error => {
        if (error) {
          console.log("Erro ao excluir a imagem: " + error);
        } else {
          console.log("Imagem excluida grande com sucesso! ");
        }
      });

      imagem_peq = req.files[0].path;
      imagem_grd = req.files[1].path;

      /** ATUALIZAÇÃO DOS DADOS DE MEDICO **/
      medico
        .update(
          {
            nome_medico,
            email_medico,
            imagem_peq,
            imagem_grd,
            telefone_medico,
            celular_medico,
            tblEspecialidadeId
          },
          { where: { id } }
        )
        .then(() => {
          res.send("DADOS DE MÉDICOS ALTERADOS COM SUCESSO!");
        });
    });
  } else {
    /** Update sem Imagem **/
    medico
      .update(
        {
          nome_medico,
          email_medico,
          telefone_medico,
          celular_medico,
          tblEspecialidadeId
        },
        { where: { id } }
      )
      .then(() => {
        res.send("DADOS DE MÉDICOS ALTERADOS COM SUCESSO!");
      });
  }
});

module.exports = router;
