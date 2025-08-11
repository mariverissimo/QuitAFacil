const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

async function signup(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(senha, 8);

    const user = await User.create({ nome, email, senha: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ token, user: { id: user.id, nome, email } });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).json({ error: 'Missing fields' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({ token, user: { id: user.id, nome: user.nome, email } });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { signup, login };
