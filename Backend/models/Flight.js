module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define("Flight", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        flightNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        toCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        departureTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrivalTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.STRING, // e.g., "2h 30m"
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        class: {
            type: DataTypes.ENUM("ECONOMY", "BUSINESS", "FIRST"),
            defaultValue: "ECONOMY",
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "SCHEDULED",
        }
    });
    return Flight;
};
