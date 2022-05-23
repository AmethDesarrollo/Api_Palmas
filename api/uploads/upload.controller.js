const path = require('path');
const Resize = require('./../../middleware/resize');
const { unlink } = require('fs');
const { createUpload, getUploadPartial, countUpload, getUploadById, deleteUpload, updateUpload, getUploads, getUploadActive } = require('./upload.service');
module.exports = {
    createUpload: async (req, res) => {
        const imagePath = path.join(__dirname, './../../uploads');
        const fileUpload = new Resize(imagePath);
        if (!req.files) {
            res.status(401).json({ error: 'Please provide an image' });
        }

        const filename = await fileUpload.save(req.files[0].buffer);

        var name = filename;
        var size = req.files[0].size;
        var type = req.files[0].mimetype;
        var path_file = "uploads/" + filename;
        var user = req.body["data.user"];

        const data = {
            name,
            size,
            type,
            path_file,
            user
        }

        createUpload(data, (error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });

    },
    getUploads: async (req, res) => {
        getUploads((error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    getUploadPartial: (req, res) => {
        console.log(req.query);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        getUploadPartial(limit, offset, sort, (error, results) => {
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
    getUploadById: (req, res) => {
        const id = req.params.id;
        getUploadById(id, (error, results) => {
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
    getUploadActive: (req, res) => {
        console.log(req.query);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        getUploadActive(limit, offset, sort, (error, results) => {
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
    countUpload: (req, res) => {
        countUpload((error, results) => {
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
    updateUpload: (req, res) => {
        const id = req.params.id;
        const data = req.body;

        console.log(data);

        updateUpload(id, data, (error, results) => {
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
    deleteUpload: (req, res) => {
        const id = req.params.id;
        console.log(req.params);

        getUploadById(id, (error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            const path = results.path;
            unlink(path, (error) => {
                if (error) {
                    return res.status(400).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                deleteUpload(id, (error, results) => {
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
            });
        });
    },
}

