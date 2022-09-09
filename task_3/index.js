const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const dataContainer = document.querySelector('#data-container');
 
const createPhotoItem = (url, title) => {
  const photoItem = document.createElement('li');
  photoItem.className = 'photo-item';

  const photoImage = document.createElement('img');
  photoImage.src = url;
  photoImage.className = 'photo-item__image';

  const photoTitle = document.createElement('h3');
  photoTitle.className = 'photo-item__title';
  photoTitle.innerText = title;

  photoItem.append(photoImage, photoTitle);

  return photoItem;
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

const getFastestLoadedPhoto = (ids) => {
  toggleLoader();
  Promise.race(ids.map((id) => fetch(`${PHOTOS_URL}/${id}`)))
    .then((response) => response.json())
    .then((photo) => {
      const photoHTML = createPhotoItem(photo.url, photo.title);
      dataContainer.append(photoHTML);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      toggleLoader();
    });
};

getFastestLoadedPhoto([60, 12, 55])