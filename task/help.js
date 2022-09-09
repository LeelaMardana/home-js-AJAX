'use strict';
const getInfo = document.querySelector('.get-info');

const sendData = ({ url, data }) => {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => response.json());
};

const sendUser = user => {
  return sendData({
    url: 'https://jsonplaceholder.typicode.com/posts',
    data: JSON.stringify(user),
  });
};

const getData = () => {
  return fetch('db.json')
    .then(response => response.json())
    .then(json => sendUser(json))
    .then(data => console.log(data, 'Данные получены'));
};

getData();
