const kue = require('kue');
const request = require('request')
const url = require('url')

const jobQueue = kue.createQueue()

jobQueue.createJob = (req, res) => {

  const data = {
    url: req.body.url,
    status: "still processing",
    html: ""
  }
  const job = jobQueue.create('jobs', data)
  .on('complete', function(){
    job.data.status = "complete"
    job.update()
  })
  .save( function(err){
     if(err){
       res.sendStatus(err)
     } else {
       res.json(job.id)
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

jobQueue.process('jobs', function(job, ctx, done){
  getHtml(job, done);
});



function getHtml(job, done){
  request(job.data.url, function(error, response, body) {
    job.data.status = body
    job.update()
  })
  done()
}



module.exports = jobQueue;
