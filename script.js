'use strict';
const postInfo = document.querySelector('.post-info');
const getInfo = document.querySelector('.get-info');
const button = document.querySelector('.button');
let i = 1;

const toggleLoader = () => {
  if (button.textContent === 'Start') {
    button.textContent = 'Loading...';
    button.disabled = true;
  } else {
    button.textContent = 'Start';
    button.disabled = false;
  }
};

const getData = () => {
  return fetch('db.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось принять данные');
      }
      return response.json();
    })
    .catch(error => console.log(error));
};

const postData = ({ user, url }) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось отправить данные');
      }
      return response.json();
    })
    .catch(error => console.log(error));
};

const render = (object, path) => {
  i = 1;
  for (const property in object) {
    const elem = document.createElement('span');
    elem.textContent = `${i++} ${property}: ${object[property]}`;
    path.append(elem);
  }
};

let array = [];

button.addEventListener('click', () => {
  array.forEach(item => item.remove()) || [];
  toggleLoader();
  getData()
    .then(object => {
      render(object, getInfo);
      return object;
    })
    .then(json =>
      postData({
        user: json,
        url: 'https://jsonplaceholder.typicode.com/posts',
      })
    )
    .then(object => render(object, postInfo))
    .finally(() => {
      toggleLoader();
      const a = postInfo.querySelectorAll('span');
      const b = getInfo.querySelectorAll('span');
      array = [...a, ...b];
    });
});
