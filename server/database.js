const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEME}`
);

const Phone = sequelize.define("Phone", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING(4),
    allowNull: false,
  },
  number: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
});

module.exports = {
  sequelize: sequelize,
  Phone: Phone,
};
