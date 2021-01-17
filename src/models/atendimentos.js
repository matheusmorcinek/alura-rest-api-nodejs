const conexao = require('../infraestrutura/conexao');
const moment = require('moment');
const { query } = require('../infraestrutura/conexao');

class Atendimento {

    adicona(atendimento, response) {

        const dataCriacao = new Date();
        // const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if (existemErros) {

            response.status(400).json(erros);
        } else {

            const atendimentoDatadao = { ...atendimento, dataCriacao, data };

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

    lista(response) {

        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {

            if (erro) {

                response.json(erro);
            } else {

                response.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, response) {

        const sql = `select * from Atendimentos where id = ${id}`;

        conexao.query(sql, (erro, resultados) => {

            if (erro) {

                response.status(400).json(erro);
            } else {

                const atendimento = resultados[0];

                response.status(201).json(atendimento);
            }
        });

    }
}

module.exports = new Atendimento;