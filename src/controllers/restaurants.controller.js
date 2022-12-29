const { response, response2, res200 } = require("../helpers/response");
const restaurantsService = require("../services/restaurants.service");

const restaurantsController = {
  get: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;

        const restaurants = await restaurantsService.get(id);
        response2(res, 200, restaurants);
      } catch (error) {
        console.log("--------: ", error);
        next(error);
      }
    };
  },

  create: () => {
    return async (req, res, next) => {
      try {
        const { user } = res.locals;
        const data = req.body;
        // set userId, là thông tin người tạo nhà hàng
        data.userId = user.id;
  
        const restaurant = await restaurantsService.create(data);
        res.status(200).json(response(restaurant));
      } catch (error) {
        next(error);
      }
    };
  },

  delete: () => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const { user } = res.locals;

        await restaurantsService.delete(id, user);
        res.status(200).json(response('restaurant deleted'));
      } catch (error) {
        next(error);
      }
    };
  },

//   update: () => {
//     return async (req, res, next) => {
//       try {
//         const { id } = req.params;
//         const user = req.body;
//         const updatedUser = await usersService.update(id, user);
//         res.status(200).json({ data: updatedUser });
//       } catch (error) {
//         // res.status(400).json({error: error.message});
//         next(error);
//       }
//     };
//   },


// POST localhost:4000/restaurants/:restaurantId/like - body: {userId: 1}
likeRestaurant: () => { 
  return async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { userId } = req.body;
      await restaurantsService.likeRestaurant(userId, restaurantId);
      res200(res, 'Okkk')
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
 }


};

module.exports = restaurantsController;
