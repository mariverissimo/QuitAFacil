const Debt = require('../models/debt');

async function createDebt(req, res) {
  const { descricao, valorTotal, jurosMensal, valorParcela, quantidadeParcelas, dataVencimento } = req.body;

  if (!descricao || !valorTotal || !valorParcela || !quantidadeParcelas || !dataVencimento) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const debt = await Debt.create({
      descricao,
      valorTotal,
      jurosMensal: jurosMensal || 0,
      valorParcela,
      quantidadeParcelas,
      dataVencimento,
      userId: req.userId,
    });

    return res.status(201).json(debt);
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

async function listDebts(req, res) {
  try {
    const debts = await Debt.findAll({ where: { userId: req.userId } });
    return res.json(debts);
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

async function getDebt(req, res) {
  try {
    const debt = await Debt.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!debt) return res.status(404).json({ error: 'Debt not found' });
    return res.json(debt);
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

async function updateDebt(req, res) {
  try {
    const debt = await Debt.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!debt) return res.status(404).json({ error: 'Debt not found' });

    const { descricao, valorTotal, jurosMensal, valorParcela, quantidadeParcelas, dataVencimento } = req.body;

    await debt.update({
      descricao: descricao || debt.descricao,
      valorTotal: valorTotal || debt.valorTotal,
      jurosMensal: jurosMensal !== undefined ? jurosMensal : debt.jurosMensal,
      valorParcela: valorParcela || debt.valorParcela,
      quantidadeParcelas: quantidadeParcelas || debt.quantidadeParcelas,
      dataVencimento: dataVencimento || debt.dataVencimento,
    });

    return res.json(debt);
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

async function deleteDebt(req, res) {
  try {
    const debt = await Debt.findOne({ where: { id: req.params.id, userId: req.userId } });
    if (!debt) return res.status(404).json({ error: 'Debt not found' });

    await debt.destroy();
    return res.json({ message: 'Debt deleted' });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createDebt, listDebts, getDebt, updateDebt, deleteDebt };
