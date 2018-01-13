module.exports = app => {
  const mongoose = require("mongoose");
  const validatorId = object => mongoose.Types.ObjectId.isValid(object);
  return validatorId;
};
