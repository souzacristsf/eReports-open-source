const success = (res, callback) => object => callback(object, res);

const error = res => error => {
  return res.status(400).json({ error: error });
};

module.exports = {
  success: success,
  error: error
};

// create(data,success,error) {
//         this.group.create(data)
//             .then(success)
//             .then(group => {
//                 const idTeacher = {'_id':group.source.admin};
//                 const query = {$push:{'groups':group.source}}
//                 this.teacher.update(idTeacher,query)
//                     .then()
//                     .catch(error)
//             })
//             .catch(error)
//             .done()
//     }
