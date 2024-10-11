const express = require('express');
const { body, validationResult } = require('express-validator');
const Pedido = require('../models/Pedido');  // Importa o modelo Pedido
const router = express.Router();

// Rota para listar todos os pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para criar um novo pedido

const { body, validationResult } = require('express-validator');

// Rota para criar um novo pedido
router.post('/', [
    body('cliente').optional().isString().notEmpty().withMessage('O cliente deve ser um texto não vazio.'),
    body('marmita').optional().isString().notEmpty().withMessage('A marmita deve ser um texto não vazio.'),
    body('quantidade').optional().isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que 0.')
], async (req, res) => {
    // Verifica se há erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pedido = new Pedido({
        cliente: req.body.cliente,
        marmita: req.body.marmita,
        quantidade: req.body.quantidade
    });

    try {
        const novoPedido = await pedido.save();
        res.status(201).json(novoPedido);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// Rota para atualizar um pedido
router.patch(
    '/:id',
    [
        body('cliente').optional().isString().notEmpty().withMessage('O cliente deve ser um texto não vazio.'),
        body('marmita').optional().isString().notEmpty().withMessage('A marmita deve ser um texto não vazio.'),
        body('quantidade').optional().isInt({ min: 1 }).withMessage('A quantidade deve ser um número inteiro maior que 0.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const pedido = await Pedido.findById(req.params.id);
            if (pedido == null) {
                return res.status(404).json({ message: 'Pedido não encontrado' });
            }

            if (req.body.cliente != null) {
                pedido.cliente = req.body.cliente;
            }
            if (req.body.marmita != null) {
                pedido.marmita = req.body.marmita;
            }
            if (req.body.quantidade != null) {
                pedido.quantidade = req.body.quantidade;
            }

            const pedidoAtualizado = await pedido.save();
            res.json(pedidoAtualizado);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Rota para deletar um pedido
const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {   
    try {
        const pedido = await Pedido.findById(req.params.id);
        if (pedido == null) {           
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        
        await Pedido.deleteOne({ _id: req.params.id });
        res.json({ message: 'Pedido deletado' });
    } catch (err) {
        console.error('Erro ao deletar pedido:', err.message);
        res.status(500).json({ message: err.message });
    }
});







module.exports = router;
