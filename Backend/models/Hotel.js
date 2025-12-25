module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("Hotel", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        starCategory: {
            type: DataTypes.ENUM("1_STAR", "2_STAR", "3_STAR", "4_STAR", "5_STAR"),
            allowNull: false,
        },
        pricePerNight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amenities: {
            type: DataTypes.TEXT, // Could be comma separated strings
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        contactNumber: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        }
    });
    return Hotel;
};
