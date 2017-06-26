require('isomorphic-fetch');

export const createJob = (url, cb) => {
  fetch('http://localhost:4000/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'credentials': 'same-origin'
    },
    body:{
      url: url
    }
  })
  .then(response => {
      if (response.status >= 400) {
        return "Bad response from server";
      }
    return response.json()
  }).then(data => {
    cb(JSON.stringify(data))
  })
}



export const checkStatus = (id, cb) => {
  fetch(`http://localhost:4000/jobs/${id}`)
  .then(response => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(data => {

    cb(data)
  })
}
