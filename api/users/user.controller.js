const { createUser, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const tokenList = {}

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createUser(body, (error, results) => {
            if (error) {
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
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
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
            if (error) {
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
            if (error) {
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
            } else {
                results.password = undefined;
                const token = sign({ results: results }, process.env.TOKEN, { expiresIn: '900' });
                const refreshToken = sign({ results: results }, process.env.TOKEN_REFRESH, { expiresIn: '86400' })
                return res.status(200).json({
                    success: 200,
                    message: "Login success",
                    token: token,
                    refreshToken: refreshToken,
                    data: results
                });
            }
        });
    },
    token: (req, res) => {
        // refresh the damn token
        const postData = req.body
        // if refresh token exists
        if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
            const user = {
                "email": postData.email,
            }
            const token = sign(user, config.secret, { expiresIn: config.tokenLife })
            const response = {
                "token": token,
            }
            // update the token in the list
            tokenList[postData.refreshToken].token = token
            res.status(200).json(response);
        } else {
            res.status(404).send('Invalid request')
        }
    }
};