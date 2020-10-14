const connection = require('../helpers/mysql')

module.exports = {
    getIdMessage: function (id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT message_tb.message_id, message_tb.sender_id, user_tb.username as sender_name, message_tb.receiver_id, message_tb.content, message_tb.created_at FROM message_tb INNER JOIN user_tb ON user_tb.user_id=message_tb.sender_id WHERE message_tb.message_id IN (SELECT MAX(message_id) FROM message_tb WHERE message_tb.receiver_id=? GROUP BY message_tb.sender_id) ORDER BY created_at DESC";
        connection.query(sql, id, function (err, result) {
        console.log(result, "g", err);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  getPersonalMessageModel: function (sender_id, receiver_id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT message_tb.message_id, message_tb.sender_id, user_tb.username as sender_name, message_tb.receiver_id, message_tb.content, message_tb.created_at FROM message_tb INNER JOIN user_tb ON user_tb.user_id=message_tb.sender_id WHERE (sender_id=${sender_id} AND receiver_id=${receiver_id}) || (sender_id=${receiver_id} AND receiver_id=${sender_id})`;
      connection.query(sql, [sender_id, receiver_id], function (err, result) {
        console.log(result, 'personal', err)
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  postMessageModel: function (setData) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO message_tb SET? ", setData, function (err, result) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        const newData = {
          id: result,
          ...setData,
        };
        resolve(newData);
      });
    });
  },

  putMessageModel: function (setData, id) {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE message_tb SET ? WHERE message_id=?", [setData, id], function (err, result) {
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

  deleteMessageModel: function (id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM message_tb WHERE message_id=?", id, function (err, result) {
        console.log(err, "k", result);
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },  
}