'use strict';

var photosArray = [];
var urlPhotosArray = [];

for (var i = 1; i <= 25; i++) {
  urlPhotosArray.push('photos/{{' + i + '}}.jpg');
}

var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var minCountLikes = 15;
var maxCountLikes = 200;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPhoto(min, max) {
  var numberPhoto = getRandomInt(min, max);
  var swap = urlPhotosArray[numberPhoto];
  urlPhotosArray.splice(numberPhoto, 1);
  return swap;
}

var countUsers = 25;
for (i = 0; i < countUsers; i++) {
  photosArray.push(
      {
        url: getRandomPhoto(0, urlPhotosArray.length - 1),
        likes: getRandomInt(minCountLikes, maxCountLikes),
        comments: commentsArray[getRandomInt(0, commentsArray.length - 1)]
      }
  );
}
