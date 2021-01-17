const atendimentos = require('../../models/atendimentos');
const Atendimento = require('../../models/atendimentos');

module.exports = app => {

    app.get('/atendimentos', (request, respose) => {

        respose.send('Você está na rota atendimentos e está realizando um GET');
    });

    app.post('/atendimentos', (request, response) => {

        const atendimento = request.body;

        Atendimento.adicona(atendimento, response);

        // response.send('Você está na rota atendimentos e está realizando um POST');
    });
};