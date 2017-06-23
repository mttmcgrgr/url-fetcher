const kue = require('kue');
const request = require('request')
const url = require('url')

const jobQueue = kue.createQueue()
let jobId = 0;

jobQueue.createJob = (req, res) => {
  jobId++
  const data = {
    jobId: jobId,
    url: req.body.url,
    status: "still processing",
    html: ""
  }
  const job = jobQueue.create('jobs', data)
  job.on('complete', function(){
    job.data.status = "complete"
    job.update()
  })
  job.save( function(err){
     if( err ){
       jobId--;
       res.sendStatus(err)
     } else {
       res.json(job.data.jobId)
     }
  });
}

jobQueue.checkJobStatus = (req, res) => {
  let jobStatus;
  const job = kue.Job.get( req.params.id, function( err, job ) {
    if(err){
      res.sendStatus(err)
    }
    res.json(job.data)
  });
}

function getHtml(job, done){
  request(job.data.url, function(error, response, body) {
    job.data.status = "complete"
    job.data.html = body
    job.update()
  })
  done()
}



jobQueue.process('jobs', function(job, done){
  getHtml(job, done);
});



module.exports = jobQueue;
