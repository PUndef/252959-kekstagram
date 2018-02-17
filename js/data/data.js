'use strict';

(function () {

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

  var countUsers = 25;
  for (var i = 1; i < countUsers + 1; i++) {
    photosArray.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: window.util.getRandomInt(minCountLikes, maxCountLikes),
          comments: window.util.getRandomComments(commentsArray, window.util.getRandomInt(1, 2))
        }
    );
  }

  window.data = {
    photosArray: photosArray
  };

})();
