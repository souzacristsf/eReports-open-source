module.exports = app => {
  const Schedule = app.models.schedule;
  const moment = require("moment");
  const prepare = app.schedule.prepare;

  return {
    prepare: async () => {
      const data = await Schedule.find();

      // new date for trunc
      const now = new Date();
      // trunc date without the seconds
      const now_utc = new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        0
      );

      data.map(data => {
        if (data.sTime === now_utc.getTime()) {
          // console.log("passou aqui no mounted: ", data);
          prepare.mounted(data);
        }
      });
      //   .then(data => {
      //     data.map(data => {
      //       if (data.sTime === now_utc.getTime()) {
      //         prepare.mounted(data);
      //       }
      //     });
      //   });
    }
  };
};
