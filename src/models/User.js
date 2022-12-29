const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "email invalidd",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        // validate: {
        //   //Demo custom validator
        //   customValidator2: (value) => {
        //     //logic validation
        //     //Nếu không thỏa điều kiện => throw new Error('message')
        //     if (value !== this.confirmPassword) {
        //       throw new Error("password not matched");
        //     }
        //   },
        // },

        // Sẽ được chạy trước khi create/update
        set(value) {
          //không được lưu plaintext password trực tiếp xuống DB
          //cần phải hash password bằng thư viện bcrypt
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hashedPassword);
        },
      },
      role:{
        type: DataTypes.ENUM('user', 'merchant', 'admin'),
        defaultValue: 'user',
      },
      avatar:{
        type: DataTypes.STRING
      }
    },
    {
      tableName: "users",
      // disable createdAt, updatedAt
      timestamps: false,
      // bỏ qua columm pass word khi tìm kiếm các record
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      // Các phương thức được tự động chạy sau một hành động(create/update/delete)
      hooks: {
        // Xoá property password của record được trả ra sau khi tạo thành công
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
