// Controller nhận vào request, response
// Nhiệm vụ: chỉ parse request (params, body) sau đó chuyển xuống Service xử lý, nhận kết quả trả về từ Service và trả response về cho client

const {response, response2, res200} = require("../helpers/response");
const usersService = require("../services/users.service");

const usersController = {
  get: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const users = await usersService.get(id);
        // res.status(200).json(response(users));
        response2(res, 200, users);
      } catch (error) {
        console.log('--------: ', error);
        // res.status(500).json({ error: error.message });

        //Chuyển tiếp cái error xuống middleware handleErrors
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const user = req.body;
        const createdUser = await usersService.create(user);
        // res.status(200).json({ data: createdUser });
        res200(res, createdUser)
      } catch (error) {
        console.log('--------: ', error);
        // res.status(500).json({error: error.message});
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        await usersService.delete(id);
        res.status(200).json(response(true));
      } catch (error) {
        // res.status(500).json({error: error.message});
        next(error);
      }
    };
  },

  update: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = req.body;
        const updatedUser = await usersService.update(id, user);
        res.status(200).json({ data: updatedUser });
      } catch (error) {
        // res.status(400).json({error: error.message});
        next(error);
      }
    };
  },
};

module.exports = usersController;
