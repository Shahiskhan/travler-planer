module.exports = (sequelize, DataTypes) => {
    const ViewPointImage = sequelize.define("ViewPointImage", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING,
        },
    });
    return ViewPointImage;
};
