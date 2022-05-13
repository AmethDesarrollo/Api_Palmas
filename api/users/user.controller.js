const { createUser, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createUser(body, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        }); 
    },
    updateUser: (req, res) => {
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(id, body, (error, results) => {
            console.log(results);
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;

        deleteUser(id, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (error, results) => {
            console.log("results: " + JSON.stringify(results));
            console.log("error:" + error);
            console.log(compareSync(body.password, results.password))
            if (error) {
                console.log(error);
                return res.status(200).json({
                    success: 400,
                    message: "Database connection error"
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 404,
                    message: "Invalid email or password"
                });
            }
            if (!compareSync(body.password, results.password)) {
                return res.status(200).json({
                    success: 409,
                    message: "Wrong password"
                });
            }else{
                results.password = undefined;
                const token = sign({ results: results}, process.env.TOKEN, { expiresIn: '1h' });
    
                return res.status(200).json({
                    success: 200,
                    message: "Login success",
                    token: token,
                    data: results
                });
            }
        });
    }
};