require('isomorphic-fetch');


export const createJob = (data, cb) => {
  fetch('http://localhost:4000/jobs', {
    method: 'POST',
    'credentials': 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
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
  fetch(`http://localhost:4000/jobs/${id}`, {
      'credentials': 'same-origin'
    })
  .then(response => {
      if (response.status >= 400) {
            return "Bad ID try again";
      }
      return response.json();
  }).then(data => {
    cb(data)
  })
}
