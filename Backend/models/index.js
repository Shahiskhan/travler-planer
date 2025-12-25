const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Location = require("./Location")(sequelize, DataTypes);
const ViewPoint = require("./ViewPoint")(sequelize, DataTypes);
const ViewPointImage = require("./ViewPointImage")(sequelize, DataTypes);
const Hotel = require("./Hotel")(sequelize, DataTypes);
const Airline = require("./Airline")(sequelize, DataTypes);
const Flight = require("./Flight")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);

// RELATIONSHIPS
User.hasMany(Location);
Location.belongsTo(User);

User.hasMany(Hotel);
Hotel.belongsTo(User);

User.hasMany(Flight);
Flight.belongsTo(User);

User.hasMany(Airline);
Airline.belongsTo(User);

User.hasMany(ViewPoint);
ViewPoint.belongsTo(User);

Location.hasMany(ViewPoint);
ViewPoint.belongsTo(Location);

ViewPoint.hasMany(ViewPointImage);
ViewPointImage.belongsTo(ViewPoint);

ViewPoint.hasMany(Hotel);
Hotel.belongsTo(ViewPoint);

Airline.hasMany(Flight);
Flight.belongsTo(Airline);

const db = {
  sequelize,
  Sequelize,
  User,
  Location,
  ViewPoint,
  ViewPointImage,
  Hotel,
  Airline,
  Flight,
};

module.exports = db;
