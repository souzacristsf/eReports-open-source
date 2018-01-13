function returnSuccessCreateUser(object, res) {
  const obj = object.toObject();

  delete obj.password;

  res.status(200).json(obj);
}

function returnSuccess(object, res) {
  if (object.password) {
    const obj = object.toObject();
    delete obj.password;
    delete obj.__v;
    delete obj.descrConect;
    res.status(200).json(obj);
  } else {
    res.status(200).json(object);
  }
}

function returnError(err, res) {
  res.status(400).json(err);
}

function returnUpdateSuccess(object, res) {
  object.nModified || object
    ? // object.nModified
      res.status(200).json({ success: true })
    : res.status(400).json({ success: false });
}

function returnUpdateOnesucess(object, res) {}

module.exports = {
  success: returnSuccess,
  successCreateUser: returnSuccessCreateUser,
  returnError: returnError,
  returnUpdateSuccess: returnUpdateSuccess,
  returnUpdateOnesucess: returnUpdateOnesucess
};
