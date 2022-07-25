'use strict';
const getInfo = document.querySelector('.get-info');
// let i = 1;

const getData = () => {
  return fetch('db.json')
    .then(response => response.json())
    .then(json => console.log(json));
};

getData();

const sendData = ({ url, data }) => {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(response => response.json());
};

sendData({
  url: 'https://jsonplaceholder.typicode.com/posts',
  data: JSON.stringify(getData),
}).then(data => console.log(data));

// const showWeb = () => {
//   a.then(object => {
//     for (const property in object) {
//       const elem = document.createElement('span');
//       elem.textContent = `${i++} ${property}: ${object[property]}`;
//       getInfo.append(elem);
//     }
//   });
// };
