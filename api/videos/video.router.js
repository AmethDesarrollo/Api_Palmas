const { createVideo, getVideos, getVideosPartial, countVideos, deleteVideo, updateVideo, getVideoById, getVideosActive } = require('./video.controller');
const router = require('express').Router();

router.get('/', getVideos);
router.post('/', createVideo);
router.get('/partial', getVideosPartial);
router.get('/active', getVideosActive);
router.get('/count', countVideos);
router.delete('/:id', deleteVideo);
router.put('/:id', updateVideo);
router.get('/:id', getVideoById);

module.exports = router;