const express = require('express');
const router = express.Router();
const jobQueue = require('./queue.js');


router.post( '/jobs', jobQueue.createJob )
router.get( '/jobs/:id', jobQueue.checkJobStatus )

module.exports = router;
