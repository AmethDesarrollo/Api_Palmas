const { createVideo, getVideos, getVideosPartial, countVideos, deleteVideo, updateVideo, getVideoById, getVideosActive } = require('./video.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.get('/', getVideos);
router.post('/', createVideo);
router.get('/partial', getVideosPartial);
router.get('/active', getVideosActive);
router.get('/count', countVideos);
router.delete('/:id',checkToken, deleteVideo);
router.put('/:id', checkToken, updateVideo);
router.get('/:id', getVideoById);

module.exports = router;