const kue = require('kue');
const request = require('request')
const jobQueue = kue.createQueue()


jobQueue.createJob = (req, res) => {
  const job = jobQueue.create('jobs', {
    url: req.body.url,
    status: "still processing",
    html: ""
  }).save(err => {
     if(err){
       res.sendStatus(err)
       console.log("invalid URL try again")
     }
   res.json(job.id)
   console.log(`job created! id = ${job.id}`)
  })
}


jobQueue.checkJobStatus = (req, res) => {
  const job = kue.Job.get( req.params.id,( err, job ) => {
    if(err){
      res.send("status: bad ID try again")
    }
    res.json(job.data)
    console.log(`job status: ${job.data.status}`)
  });
}



jobQueue.process('jobs',(job, done) => {
  request(job.data.url, (error, response, body) => {
    console.log(` job ${job.id} processed!`)
    job.data.html = body
    job.data.status = "complete"
    job.update()
    done()
    });
});


module.exports = jobQueue;
