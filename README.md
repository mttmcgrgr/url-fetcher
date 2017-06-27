# url-fetcher

A job queue whose workers fetch data from a URL and store the results in a database.
The job queue exposes a REST API for adding jobs and checking their status / results.


## technologies:
- kue (npm package for creating queue with redis)
- request (npm package for retrieving html from url)
- react / webpack (frontend)
- node express (server backend)

## how to run:
- clone or download this repo
- navigate to project folder and run `npm install`
- install [Redis](https://redis.io/topics/quickstart) if necessary
- type `redis-server` in terminal to start Redis
- navigate to backend folder and type `node server.js`
- navigate to frontend folder and type `npm start`


## features:

### creating a job
  A user provides a valid url to the input form, which on submit, makes a POST
 request to the /JOBS endpoint, returning an id to the user if successful.
 On the backend, the POST endpoint creates a job instance for the kue job queue with
 initial attributes of "still processing" for status and an empty string for HTML.

### processing a job
  Kue automatically checks for queued jobs to process and processes them instantly by default, provided
  there is an instance of kue with a `.process` function defined. Future implementations could use the [kue](https://www.npmjs.com/package/kue)
  "delay" job attribute or "paused processing" functionality to adjust processing intervals. Node package
  [kue-scheduler](https://www.npmjs.com/package/foundry-kue-scheduler) could also be another option


### checking a job
  Once given a valid job id, the user can change the form by pushing the "check status instead"
  button and provide the id to the form. On submit, the form makes a GET request to the /JOBS/:id
  endpoint which returns information about the job. If the job has been processed, the user will
  see "still processing" otherwise the user will see the job is "complete" along with the html from the job's
  url.

### future implementations
  future implementations will incorporate more specific error handling in front end backend (i.e. checking if id is outside of range
  or if url is non-unique in the queue when creating a job)
