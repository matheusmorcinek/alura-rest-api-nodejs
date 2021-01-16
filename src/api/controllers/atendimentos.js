module.exports = app => {

    app.get('/atendimentos', (request, respose) => {

        respose.send('Você está na rota atendimentos e está realizando um GET');
    });

    app.post('/atendimentos', (request, response) => {

        console.log(request.body);

        response.send('Você está na rota atendimentos e está realizando um POST');
    });
};