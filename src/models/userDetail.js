const connection = require('../helpers/mysql')

module.exports = {
    getAllDetailUser: function () {
    return new Promise((resolve, reject) => {
      const sql = `SELECT d.*, u.username, u.email, u.mobile_phone FROM user_tb as u INNER JOIN detail_user_tb as d WHERE u.user_id = d.user_id`;
        connection.query(sql, function (err, result) {
        console.log(result, "g", err);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  getIdDetailUser: function (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT d.*, u.username , u.mobile_phone FROM user_tb as u INNER JOIN detail_user_tb as d ON u.user_id = d.user_id WHERE detail_user_id=?`;
        connection.query(sql, id, function (err, result) {
        console.log(result, "g", err);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  postDetailUser: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO detail_user_tb SET ? ", setData, function (err, result) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        const newData = {
          id: result.insertId,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  putDetailUser: function (setData, id) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE detail_user_tb SET ? WHERE detail_user_id=?", [setData, id], function (err, result) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        const newData = {
          id,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  deleteDetailUser: function (id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM detail_user_tb WHERE detail_user_id=?", id, function (err, result) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
}