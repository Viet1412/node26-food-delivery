const response = (payload, ...rest) => {
  return {
    status: "success",
    data: payload,
    ...rest,
  };
};

const response2 = (res, statusCode, payload, ...rest) => {
  return res.status(statusCode).json({
    status: "success",
    data: payload,
    ...rest,
  });
};

const res200 = (res, payload, ...rest) => {
  return res.status(200).json({
    status: "success",
    data: payload,
    ...rest,
  });
};

module.exports = {
  response,
  response2,
  res200
};
