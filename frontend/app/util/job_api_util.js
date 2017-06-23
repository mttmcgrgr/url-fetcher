
const request = require('request');

const jobQueue = new Queue();
let jobId = 0;



export const createJob = (url) => {
  joQueue.addtoQueue({
    url: url,
    status: processing,
    html: ""
  })
}
