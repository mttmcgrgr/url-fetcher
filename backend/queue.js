const kue = require('kue');
const request = require('request')
const url = require('url')
const jobQueue = kue.createQueue()
let htmlData;

jobQueue.createJob = (req, res) => {
  const job = jobQueue.create('jobs', {
    url: req.body.url,
    status: "still processing",
    html: ""
  })
  .save( function(err){
     if(err){
       res.sendStatus(err)
     }
   res.json(job.id)
  })
}

jobQueue.checkJobStatus = (req, res) => {
  const job = kue.Job.get( req.params.id,( err, job ) => {
    if(err){
      res.sendStatus(err)
    }
    jobQueue.frequency(5)
    res.json(job.data)
  });
}

jobQueue.frequency = (seconds) => {
  setInterval(jobQueue.process, seconds*100);
}


function getHtml(job, done){
  request(job.data.url, (error, response, body) => {
    job.data.html = body
    job.data.status = "complete"
    job.update()
  })
  done()
}

jobQueue.process('jobs',(job, done) => {
  getHtml(job, done)
});






module.exports = jobQueue;
