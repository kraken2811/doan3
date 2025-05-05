const db = require("../common/db");

const StoreProcedure = {};

// Authentication for USERS
// Procedure đăng nhập
StoreProcedure.checkLogin = (identifier, password, callback) => {
    const sqlString = "CALL checkLogin(?, ?)";
    db.query(sqlString, [identifier, password], (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result[0]);
    });
};


module.exports = StoreProcedure;
