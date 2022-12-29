const { AppError } = require("../helpers/error");
const { Restaurant, User } = require("../models");

const restaurantsService = {
  get: async (restaurantId) => {
    try {
      if (restaurantId) {
        const restaurant = await Restaurant.findByPk(restaurantId);
        return restaurant;
      }

      const restaurants = await Restaurant.findAll({
        // include: "userLikes"

        include: {
          association: "userLikes",
          through: {
            attributes: [],
          },
        },

        // include: [
        //   "owner",
        //   {
        //     association: "userLikes",
        //     through: {
        //       attributes: [],
        //     },
        //   },
        // ],

        // include: [
        //   {
        //     association: "owner",
        //     attributes: {
        //       exclude: ["email", "password"],
        //     },
        //   },
        //   {
        //     association: "userLikes",
        //     attributes: {
        //       exclude: ["email", "password"],
        //     },
        //     through: {
        //       attributes: [],
        //     },
        //   },
        // ],
      });
      return restaurants;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const restaurant = await Restaurant.create(data);
      return restaurant;
    } catch (error) {
      throw error;
    }
  },

  // requester: thông tin user thực hiện request này
  delete: async (restaurantId, requester) => {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);

      if (!restaurant) {
        throw new AppError(400, "restaurant not found");
      }

      // Kiểm tra người xoá nhà hàng, có phải là chủ nhà hàng hay không
      if (restaurant.userId !== requester.id) {
        throw new AppError(403, "have no permission");
      }

      Restaurant.destroy({
        where: {
          id: restaurantId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // update: async (restaurantId, dataUpdate) => {
  //   try {
  //     const userToUpdate = await User.findOne({
  //       where: {
  //         id: restaurantId,
  //       },
  //     });
  //     if (userToUpdate) {
  //       if (userToUpdate.email !== dataUpdate.email) {
  //         const userWithSameEmail = await User.findOne({
  //           where: {
  //             email: dataUpdate.email,
  //           },
  //         });
  //         if (userWithSameEmail) {
  //           throw new AppError(400, "Email already used by someone else");
  //         }
  //       }

  //       await User.update(dataUpdate, {
  //         where: {
  //           id: restaurantId,
  //         },
  //       });

  //       const updatedUser = await User.findOne({
  //         where: { id: restaurantId },
  //       });
  //       return updatedUser;
  //     }

  //     throw new Error("User not found");
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  likeRestaurant: async (userId, restaurantId) => {
    try {
      const restaurant = await Restaurant.findByPk(restaurantId);
      console.log("restaurant: ", restaurant);
      if (!restaurant) {
        throw new AppError(400, "Restaurant not found");
      }

      const user = await User.findByPk(userId);
      if (!user) {
        throw new AppError(400, "user not found");
      }

      console.log(restaurant.__proto__);

      // Khi thiết lập relationships cho các model, mặc định sequelize sẽ tạo ra các phương thức cho các model để tương tác với các model khác
      const hasLiked = await restaurant.hasUserLike(user.id);

      if (hasLiked) {
        await restaurant.removeUserLike(user.id);
      } else {
        await restaurant.addUserLike(user.id);
      }

      return null;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = restaurantsService;
