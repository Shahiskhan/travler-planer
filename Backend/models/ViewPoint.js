module.exports = (sequelize, DataTypes) => {
    const ViewPoint = sequelize.define("ViewPoint", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        bannerImage: {
            type: DataTypes.STRING,
        },
        openingHours: {
            type: DataTypes.STRING,
        },
        entryFee: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    return ViewPoint;
};
