const createComment = (author, text) => {
  const comment = document.createElement('div');
  comment.className = 'post-comment';

  const commentAuthor = document.createElement('span');
  commentAuthor.className = 'post-comment__author';
  commentAuthor.innerText = author;

  const commentText = document.createElement('span');
  commentText.className = 'post-comment__text';
  commentText.innerText = `Хочу сказать, что ${text}`;

  comment.append(commentAuthor, commentText);

  return comment;
};

const createPost = (postName, text, comments) => {
  const post = document.createElement('div');
  post.id = 'post';
  post.className = 'post';

  const postTitle = document.createElement('h1');
  postTitle.className = 'post__title';
  postTitle.innerText = `Название поста: ${postName}`;

  const postText = document.createElement('p');
  postText.className = 'post__text';
  postText.innerText = `Описание поста: ${text}`;

  const commentsText = document.createElement('b');
  commentsText.className = 'post__comments-text';
  commentsText.innerText = 'Комментарии';

  const commentsBlock = document.createElement('div');
  commentsBlock.className = 'post__comments';

  comments.forEach(comment => {
    const commentHTML = createComment(comment.email, comment.body);
    commentsBlock.append(commentHTML);
  });

  post.append(postTitle, postText, commentsText, commentsBlock);

  return post;
};

const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const renderComment = post => {
  fetch(`${COMMENTS_URL}?postId=${post.id}`)
    .then(response => response.json())
    .then(data => document.body.append(createPost(post.title, post.body, data)))
    .catch(error => {
      console.error(error);
    });
};

const renderPost = postId => {
  fetch(`${POSTS_URL}/${postId}`)
    .then(response => response.json())
    .then(data => renderComment(data))
    .catch(error => {
      console.error(error);
    });
};

renderPost(1);
