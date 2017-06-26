require('isomorphic-fetch');

export const createJob = (url) => {
  fetch('http://localhost:8000/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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
    return data;
  })
}



export const checkStatus = (id) => {
  fetch(`http://localhost:8000/jobs/${id}`)
  .then(response => {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  })
  .then(status => {
      console.log(status);
  });
}
