module.exports = app => {
  const Schedule = app.models.schedule;
  const Help = app.helps.crud;
  const pluck = app.utils.pluck;

  return {
    create: (req, res) => {
      const schedule = new Schedule();

      const fields = pluck(
        req.body,
        "allDay",
        "status",
        "startDate",
        "endDate",
        "startTime",
        "endTime",
        "eTime",
        "sTime",
        "email",
        "database",
        "query"
      );

      Object.assign(schedule, fields);

      Help.create(schedule, res);
    },
    listAll: (req, res) => {
      const myQuery = {};
      const mod = {
        page: 1,
        limit: 10,
        select: "-__v, -_id"
      };

      Help.listAll(Query, myQuery, mod, res);
    }
  };
};
