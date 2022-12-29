// Setup Sequelize
const { Sequelize, json } = require("sequelize");
const configs = require("../config");

// Kết nối tới database thông qua Sequelize
const sequelize = new Sequelize(configs.DB_NAME, configs.DB_USER, configs.DB_PASSWORD, {
  dialect: configs.DB_DIALECT,
  host: configs.DB_HOST,
  port: configs.DB_PORT,
});

// Kiểm tra kết nối tới database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected Okk");
  } catch (error) {
    console.log("Sequelize Errorrr", error);
  }
})();

// Khởi tạo model
const User = require("./User")(sequelize);
const Restaurant = require("./Restaurant")(sequelize);
const RestaurantLikes = require("./RestaurantLikes")(sequelize);

// Định nghĩa relationship giữa các model
// User 1 - n Restaurant
Restaurant.belongsTo(User, { as: "owner", foreignKey: "userId" });
User.hasMany(Restaurant, { as: "restaurants", foreignKey: "userId" });

// User 1 - n RestaurantLikes
// Restaurant 1 - n RestaurantLikes
User.belongsToMany(Restaurant, {
  as: 'restaurantLikes',
  through: RestaurantLikes,
  foreignKey: "userId",
});
Restaurant.belongsToMany(User, {
  as: 'userLikes',
  through: RestaurantLikes,
  foreignKey: "restaurantId",
});



module.exports = {
  sequelize,
  User,
  Restaurant,
  RestaurantLikes,
};
