const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "postgres://postgres:postgres@localhost:5432/postgres"
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
