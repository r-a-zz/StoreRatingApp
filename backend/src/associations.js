const User = require("./models/User");
const Store = require("./models/Store");
const Rating = require("./models/Rating");

// User associations
User.hasMany(Store, { as: "stores", foreignKey: "ownerId" });
User.hasMany(Rating, { foreignKey: "UserId" });

// Store associations
Store.belongsTo(User, { as: "owner", foreignKey: "ownerId", allowNull: false });
Store.hasMany(Rating, { foreignKey: "StoreId" });

// Rating associations
Rating.belongsTo(User, { foreignKey: "UserId", allowNull: false });
Rating.belongsTo(Store, { foreignKey: "StoreId", allowNull: false });

module.exports = { User, Store, Rating };
