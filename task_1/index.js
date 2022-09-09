const USERS_URL = 'http://jsonplaceholder.typicode.com/users';
const usersContainer = document.querySelector('#data-container');
 
const createUserElement = (text) => {
    const userElement = document.createElement('li');
    const userAnchorElement = document.createElement('a');
    userAnchorElement.href = '#';
    userAnchorElement.innerText = text;
    userElement.append(userAnchorElement);

    return userElement;
}
 
const toggleLoader = () => {
  const loaderHTML = document.querySelector('#loader');
  const isHidden = loaderHTML.getAttribute('hidden') !== null;
  if (isHidden) {
    loaderHTML.removeAttribute('hidden');
  } else {
    loaderHTML.setAttribute('hidden', '');
  }
};
 
const getAllUsers = () => {
  toggleLoader();
  fetch(USERS_URL, {
    method: 'GET',
    headers: {},
  })
    .then((response) => {
      return response.json();
    })
    .then((users) => {
        (users || []).forEach((user) => {
            const todoHTMLElement = createUserElement(user.name);
            usersContainer.append(todoHTMLElement);
        });
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      toggleLoader();
    });
};
 
getAllUsers();
