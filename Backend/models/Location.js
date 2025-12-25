module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("Location", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cityName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pakistan"
        },
        description: {
            type: DataTypes.TEXT,
        },
        bestTimeToVisit: {
            type: DataTypes.STRING,
        },
        coordinates: {
            type: DataTypes.STRING, // e.g., "33.6844, 73.0479"
        },
        thumbnail: {
            type: DataTypes.STRING,
        }
    });
    return Location;
};
