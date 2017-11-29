module.exports = app => {
    const Return = require('./returnObject')
    const successOrError = require('./successOrError')
    return {
        createUser: (Model, res) => Model.save()
            .then(successOrError.success(res, Return.successCreateUser), successOrError.error),
            // .then(object => Return.successCreateUser(object, res))
            // .cacth(error => Return.returnError(error, res)),

        create: (Model, res) => Model.save()
            .then(successOrError.success(res, Return.success), successOrError.error),
        
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        listAll: (Model, query, mod, res) => Model.paginate(query, mod)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .cacth(error => Return.returnError(error, res)),

        listPaginate: (Model, query, options, res) => Model.paginate(query, options)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        listOne: (Model, query, res) => Model.findOne(query)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        listOnePopulate: (Model, query, options, res) => Model.paginate(query, options)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        listAllPopulate: (Model, query, options, res) => Model.paginate(query, options)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        update: (Model, query, mod, res) => Model.update(query, mod)
            .then(successOrError.success(res, Return.returnUpdateSuccess), successOrError.error),
            // .then(object => Return.returnUpdateSuccess(object, res))
            // .cacth(error => Return.returnError(error, res)),

        findOneAndUpdate: (Model, query, mod, res, options) => Model.findOneAndUpdate(query, mod, options)
            .then(successOrError.success(res, Return.returnUpdateSuccess), successOrError.error),
            // .then(object => Return.returnUpdateSuccess(object, res))
            // .cacth(error => Return.returnError(error, res)),

        delete: (Model, query, opt, res) => Model.findByIdAndRemove(query, opt)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        findByIdAndUpdate: (Model, query, options) => Model.findByIdAndUpdate(query, options)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

        aggregateList: (Model, arr, res) => Model.aggregate(arr)
            .then(successOrError.success(res, Return.success), successOrError.error),
            // .then(object => Return.success(object, res))
            // .cacth(error => Return.returnError(error, res)),

    }
}
