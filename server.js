const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Inicializa o Express e habilita CORS para permitir requisições de outros domínios
const app = express();
app.use(cors());

// Definição do porto do servidor
const port = 3000;

// Conectar ao MongoDB (substitua 'pedidosDB' pelo nome do seu banco de dados)
mongoose.connect('mongodb://localhost:27017/pedidosDB')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware para permitir que o Express leia JSON
app.use(express.json());

// Importa as rotas de autenticação
app.use('/auth', authRoutes); // Certifique-se de que o caminho está correto

// Importa as rotas de pedidos
const pedidosRouter = require('./routes/pedidos');
app.use('/pedidos', pedidosRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
