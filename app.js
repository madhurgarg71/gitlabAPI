const apiBase = 'https://gitlab.com/api/v4'
const getProjectsOfUser = '/users/2331857/projects'
const fetch = require('node-fetch')


function checkStatus(response) {
  if (response.status >= 200 && response.status < 305) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function fetchProjectsByUser(CB) {
  const url = apiBase + getProjectsOfUser
  const fetchOptions = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Private-token': 'aEr7yYyLc8Umn8MoM9ya'
    }
  }
  return fetch(url, fetchOptions)
          .then(checkStatus)
          .then(parseJSON)
          .then(json => { CB(json); return json })
}


function display(data) {
  console.log(data);
}

;(function init() {
  fetchProjectsByUser(display)
})()
