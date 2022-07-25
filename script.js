'use strict';

const getData = () => {
  return fetch('db.json').then(response => response.json());
};

const sendData = user => {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => response.json());
};

const showLocalData = object => {
  const getInfo = document.querySelector('.get-info');
  let i = 1;

  for (const property in object) {
    const elem = document.createElement('span');
    elem.textContent = `${i++} ${property}: ${object[property]}`;
    getInfo.append(elem);
  }
};

const showGlobalData = object => {
  const postInfo = document.querySelector('.post-info');
  let i = 1;

  for (const property in object) {
    const elem = document.createElement('span');
    elem.textContent = `${i++} ${property}: ${object[property]}`;
    postInfo.append(elem);
  }
};

// Get and Show local Data
getData().then(object => showLocalData(object));

// Get, Send local Data and Show Global Data
getData()
  .then(json => sendData(json))
  .then(object => showGlobalData(object));
