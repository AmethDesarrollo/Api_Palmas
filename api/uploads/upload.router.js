const { createUpload, getUploadPartial, countUpload, deleteUpload, updateUpload, getUploadById, getUploads, getUploadActive } = require('./upload.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');
const upload = require('./../../middleware/upload');

router.post('/', checkToken, upload.any(), createUpload);
router.get('/partial', getUploadPartial);
router.get('/active', getUploadActive);
router.get('/', getUploads);
router.get('/count', countUpload);
router.delete('/:id',checkToken, deleteUpload);
router.put('/:id', checkToken, updateUpload);
router.get('/:id', getUploadById);

module.exports = router;