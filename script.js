'use strict';
const postInfo = document.querySelector('.post-info');
const getInfo = document.querySelector('.get-info');
let i = 1;

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

const render = (object, path) => {
  i = 1;
  for (const property in object) {
    const elem = document.createElement('span');
    elem.textContent = `${i++} ${property}: ${object[property]}`;
    path.append(elem);
  }
};

getData()
  .then(object => {
    render(object, getInfo);
    return object;
  })
  .then(json => sendData(json))
  .then(object => render(object, postInfo));
