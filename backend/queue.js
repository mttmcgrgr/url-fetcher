const kue = require('kue');
const request = require('request')
const url = require('url')
const jobQueue = kue.createQueue()

jobQueue.process('jobs',(job, done) => {
  request(job.data.url, (error, response, body) => {
    console.log(job.data.url, body)
    job.data.html = body
    job.data.status = "complete"
    job.update()
    });
  done()
});

jobQueue.createJob = (req, res) => {
  const job = jobQueue.create('jobs', {
    url: req.body.url,
    status: "still processing",
    html: ""
  })
  .save( err => {
     if(err){
       res.sendStatus(err)
     }
   res.json(job.id)
  })
}

jobQueue.checkJobStatus = (req, res) => {
  const job = kue.Job.get( req.params.id,( err, job ) => {
    if(err){
      res.send("status: bad ID try again")
    }
    res.json(job.data)
  });
}


function getHtml(job, done){
  console.log(job.data)
  request(job.data.url, (error, response, body) => {
    job.data.html = body
    job.data.status = "complete"
    console.log(job.data)
    job.update()
  })
  done()
}






module.exports = jobQueue;
