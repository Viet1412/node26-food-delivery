const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();
const port = 4000;
app.use(express.json());

// Kết nối tới datable thông qua Sequelize
const sequelize = new Sequelize("node26-food", "root", "123", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

// Kiểm tra kết nối tới database
sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize connected okk");
  })
  .catch((error) => {
    console.log("sequelize not connected", error);
    throw error;
  });

// Tạo model để Sequelize liên kết tới table và CRUD data
const User = sequelize.define(
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
    },
    passWord: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    // bỏ qua createdAt, updatedAt
    timestamps: false,
  }
);

// localhost:4000/api/v1/user
app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await User.findAll();
    // Query DB thành công
    res.status(200).json({ data: users });
  } catch (error) {
    // Query DB thất bại
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
