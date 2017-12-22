function returnSuccessCreateUser (object, res) {
    const obj = object.toObject()

    delete obj.password

    res.status(200).json(obj)
}

function returnSuccess (object, res) {
    console.log('Oii')
    res.status(200).json(object)
}

function returnError (err, res) {
    res.status(400).json(err)
}

function returnUpdateSuccess (object, res) {
    object.nModified || object
    // object.nModified
        ? res.status(200).json({success: true})
        : res.status(400).json({success: false})
}

function returnUpdateOnesucess (object, res) {

}

module.exports = {
    success: returnSuccess,
    successCreateUser: returnSuccessCreateUser,
    returnError: returnError,
    returnUpdateSuccess: returnUpdateSuccess,
    returnUpdateOnesucess: returnUpdateOnesucess
}
