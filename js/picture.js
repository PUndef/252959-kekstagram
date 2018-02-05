'use strict';

var photosArray = [];
var minCountLikes = 15;
var maxCountLikes = 200;
var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomComments(inputCommentsArray, countForOutput) {
  var comments = [];
  for (var j = 0; j < countForOutput; j++) {
    comments.push(inputCommentsArray[getRandomInt(0, inputCommentsArray.length - 1)]);
  }
  return comments;
}

var countUsers = 25;
for (var i = 1; i < countUsers + 1; i++) {
  photosArray.push(
      {
        url: 'photos/' + i + '.jpg',
        likes: getRandomInt(minCountLikes, maxCountLikes),
        comments: getRandomComments(commentsArray, getRandomInt(1, 2))
      }
  );
}

function renderPictures(photos) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = photos.url;
  picture.querySelector('.picture-likes').textContent = photos.likes;
  picture.querySelector('.picture-comments').textContent = photos.comments.length;
  return picture;
}

for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPictures(photosArray[i]));
}
pictures.appendChild(fragment);

galleryOverlay.classList.remove('hidden');
galleryOverlay.querySelector('.gallery-overlay-image').src = photosArray[0].url;
galleryOverlay.querySelector('.likes-count').textContent = photosArray[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = photosArray[0].comments.length;
