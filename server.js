const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
const app = express();
const port = 3000;

// Conectar ao MongoDB (substitua 'pedidosDB' pelo nome do seu banco de dados)
mongoose.connect('mongodb://localhost:27017/pedidosDB')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware para permitir que o Express leia JSON
app.use(express.json());


// Importa as rotas de pedidos
const pedidosRouter = require('./routes/pedidos');
app.use('/pedidos', pedidosRouter);

// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema de pedidos de marmitas!');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
