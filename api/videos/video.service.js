const pool = require('../../config/database');

module.exports = {
    createVideo: (data, callback) => {
        pool.query(
            `INSERT INTO videos(url, user)
            VALUES(?,?)`,
            [
                data.url,
                data.user
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getVideos: (callback) => {
        pool.query(
            `SELECT * FROM videos`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                } 
                return callback(null, results); 
            });
    },
    getVideoById: (id, callback) => {
        pool.query(
            `SELECT * FROM videos WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    getVideosActive: (limit, offset, sort, callback) => {
        pool.query(
            `SELECT * FROM videos WHERE active = 1 ORDER BY id ? LIMIT ? OFFSET ?`,
            [sort, limit, offset],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getVideosPartial: (limit, offset, sort, callback) => {
        pool.query(
            `SELECT * FROM videos ORDER BY id ${sort} LIMIT ? OFFSET ?`,
            [limit, offset],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    countVideos: (callback) => {
        pool.query(
            `SELECT COUNT(*) AS total FROM videos`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0].total);
            }
        );
    },
    updateVideo(data, callback) {
        pool.query(
            `UPDATE videos SET url=?, user=?, active=? WHERE id=?`,
            [
                data.url,
                data.user,
                data.active,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteVideo: (id, callback) => {
        pool.query(
            `DELETE FROM videos WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    }

}
