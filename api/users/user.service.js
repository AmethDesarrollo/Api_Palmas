const pool = require('../../config/database');

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `INSERT INTO registration
            (firstName, lastName, email, password, number)
            VALUES(?,?,?,?,?,?)`,
            [
                data.firstName, 
                data.lastName, 
                data.email, 
                data.password, 
                data.number
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUsers: (callback) => {
        pool.query(
            `SELECT id, firstName, lastName, email, password, number FROM registration`,
            [],
            (error, results, fields) => {
                if(error){
                    callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getUserById: (id, callback) => {
        pool.query(
            `SELECT id, firstName, lastName, email, number FROM registration WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )   
    },
    updateUser: (id, data, callback) => {
        pool.query(
            `UPDATE registration SET firstName = ?, lastName = ?, email = ?, password = ?, number = ? WHERE id = ?`,
            [
                data.firstName, 
                data.lastName, 
                data.email, 
                data.password, 
                data.number,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    deleteUser: (id, callback) => {
        pool.query(
            `DELETE FROM registration WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callback) => {
        pool.query(
            `SELECT * FROM registration WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
};