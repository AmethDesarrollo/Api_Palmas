const { createVideo, getVideos, getVideosPartial, countVideos, deleteVideo, updateVideo, getVideoById, getVideosActive } = require('./video.service');

module.exports = {
    createVideo: (req, res) => {
        const body = req.body;
        createVideo(body, (error, results) => {
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
        }
        );
    },
    getVideos: (req, res) => {
        getVideos((error, results) => {
            if (error) {
                return res.status(400).json({
                    success: 0,
                    message: "Database connection error",
                    error: error
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        }); 
    },
    getVideoById: (req, res) => {
        const id = req.params.id;
        getVideoById(id, (error, results) => {
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
    getVideosPartial: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        console.log(sort);
        getVideosPartial(limit, offset, sort,  (error, results) => {
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
    getVideosActive: (req, res) => {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const sort = req.query.sort;
        console.log(sort);
        getVideosActive(limit, offset, sort, (error, results) => {
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
    countVideos: (req, res) => {
        countVideos((error, results) => {
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
    updateVideo(req, res) {
        const body = req.body;
        updateVideo(body, (error, results) => {
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
    deleteVideo: (req, res) => {
        const id = req.params.id;
        deleteVideo(id, (error, results) => {
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
    }
}
