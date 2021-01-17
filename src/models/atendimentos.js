const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento {

    adicona(atendimento, response) {

        const dataCriacao = new Date();
        // const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const atendimentoDatadao = {...atendimento, dataCriacao, data};

        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatadao, (erro, resultados) => {

            if (erro) {

                response.status(400).json(erro);
            } else {

                response.status(201).json(resultados);
            }
        });

    }
}

module.exports = new Atendimento;