const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createDebt,
  listDebts,
  getDebt,
  updateDebt,
  deleteDebt,
} = require('../controllers/debtController');

router.use(authMiddleware);

router.post('/', createDebt);
router.get('/', listDebts);
router.get('/:id', getDebt);
router.put('/:id', updateDebt);
router.delete('/:id', deleteDebt);

module.exports = router;
