// Service nhận vào data từ controller
// Nhiệm vụ: xử lý nghiệp vụ của ứng dụng, sau đó gọi tới model của sequelize để query xuống DB, nhận data từ DB và return về cho controller

const { AppError } = require("../helpers/error");
const { User, Restaurant } = require("../models");

const usersService = {
  get: async (userId) => {
    try {
      if (userId) {
        // const user = await User.findOne({
        //   where: {
        //     id: userId,
        //   },
        // });

        const user = await User.findByPk(userId);
        return user;
      }

      const users = await User.findAll({
        include: "restaurants",
      });
      return users;
    } catch (error) {
      throw error;
    }
  },

  create: async (data) => {
    try {
      const user = await User.findOne({
        where: {
          email: data.email,
        },
      });

      // Email đã tồn tại trong DB
      if (user) {
        throw new AppError(400, "Email already exists");
      }

      // Ví dụ trong trường hợp admin thêm user, chỉ cần dùng email, ta cần phải tạo một mật khẩu ngẫu nhiên
      if (!data.password) {
        data.password = Math.random().toString(36).substring(2);
        // Gửi email về cho user mật khẩu này
      }

      const createdUser = await User.create(data);
      return createdUser;
    } catch (error) {
      throw error;
    }
  },

  delete: async (userId) => {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (user) {
        await User.destroy({ where: { id: userId } });
      } else {
        throw new AppError(400, "user not found");
      }
    } catch (error) {
      throw error;
    }
  },

  update: async (userId, dataUpdate) => {
    try {
      const userToUpdate = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (userToUpdate) {
        if (userToUpdate.email !== dataUpdate.email) {
          const userWithSameEmail = await User.findOne({
            where: {
              email: dataUpdate.email,
            },
          });
          if (userWithSameEmail) {
            throw new AppError(400, "Email already used by someone else");
          }
        }

        await User.update(dataUpdate, {
          where: {
            id: userId,
          },
        });

        const updatedUser = await User.findOne({
          where: { id: userId },
        });
        return updatedUser;
      }

      throw new Error("User not found");
    } catch (error) {
      throw error;
    }
  },
};

module.exports = usersService;
