const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Debt = sequelize.define('Debt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  jurosMensal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  valorParcela: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidadeParcelas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataVencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Debt.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Debt, { foreignKey: 'userId' });

module.exports = Debt;
