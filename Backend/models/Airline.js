module.exports = (sequelize, DataTypes) => {
    const Airline = sequelize.define("Airline", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING, // e.g., PK, EK
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
        contactEmail: {
            type: DataTypes.STRING,
        }
    });
    return Airline;
};
