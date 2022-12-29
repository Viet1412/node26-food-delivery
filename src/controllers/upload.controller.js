const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return (req, res, next) => {
    const file = req.file;
    if (!file) {
      next(new AppError(400, "please upload a fileee"));
    }

    // Có thể validate loại file và kích thước bằng file.mimetype và file.size

    //Nếu window lỗi đường dẫn thì đổi dấu chéo bằng hàm replace + regex, Mac không ảnh hưởng
    file.path = file.path.replace("/\\/g", "/");
    const url = `http://localhost:4000/${file.path}`;
    res.status(200).json(response(url));
    
  };
};

module.exports = {
  upload,
};
