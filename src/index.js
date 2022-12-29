const express = require("express");
const { sequelize } = require("./models/index");
const { AppError, handleErrors } = require("./helpers/error");
const app = express();
app.use(express.json());
app.use(express.static('.'));

// Sync cái model của sequelize với DB
sequelize.sync({ alter: true });

const v1 = require("./routers/v1");
app.use("/api/v1", v1);


//demo handleError
app.get("/error", (req, res) => {
  throw new AppError(500, "Internal Serverr");
});

//MiddleWare dùng để bắt và xử lý trả lỗi ra cho client
//Phải được đặt bên dưới các routers
app.use(handleErrors);

app.listen(4000);
