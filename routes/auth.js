const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {  
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário ou e-mail já existe
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário ou e-mail já existe' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar usuário', err);
    res.status(500).json({ message: err.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
      // Verifique se o identifier é um email ou um username
      const user = await User.findOne({
          $or: [
              { username: identifier },
              { email: identifier }
          ]
      });

      if (!user) {    
          return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
      res.json({ token });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;
