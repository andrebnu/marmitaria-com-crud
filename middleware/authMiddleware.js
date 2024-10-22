const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Sem token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, 'secret'); // A chave secreta deve ser a mesma usada na assinatura
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = protect;
