'use strict';

var ESC_KEYCODE = 27;
var DEFAULT_LEVEL_EFFECT = 100;
var PROPORTION_1 = 1 / 100;
var PROPORTION_3 = 3 / 100;

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
var upload = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadClose = document.querySelector('#upload-cancel');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDescription = document.querySelector('.upload-form-description');
var uploadEffectLevel = document.querySelector('.upload-effect-level');
var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
var effectImagePreview = document.querySelector('.effect-image-preview');
var uploadEffectControls = document.querySelector('.upload-effect-controls');

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

function openGalleryOverlay() {
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').src = photosArray[0].url;
  galleryOverlay.querySelector('.likes-count').textContent = photosArray[0].likes;
  galleryOverlay.querySelector('.comments-count').textContent = photosArray[0].comments.length;
}

var onUploadPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadPopup();
  }
};

function stopCloseEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
}

uploadFormHashtags.addEventListener('keydown', function (evt) {
  stopCloseEscPress(evt);
});

uploadFormDescription.addEventListener('keydown', function (evt) {
  stopCloseEscPress(evt);
});

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onUploadPopupEscPress);
}

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  openUploadOverlay();
});

function closeUploadPopup() {
  upload.value = '';
  uploadOverlay.classList.add('hidden');
}

uploadClose.addEventListener('click', function () {
  closeUploadPopup();
});

uploadEffectLevelPin.addEventListener('mouseup', function () {
  if (effectImagePreview.classList[1]) {
    var currenEffect = effectImagePreview.classList[1].replace('effect-', '');
    var currenLevel = parseInt(uploadEffectLevelPin.style.left, 10);
    setNewEffectLevel(currenLevel, currenEffect);
  }
});

function setNewEffectLevel(levelEffect, nameEffect) {
  if (nameEffect === 'none') {
    effectImagePreview.style.filter = 'none';
  }
  if (nameEffect === 'chrome') {
    document.querySelector('.effect-chrome').style.filter = 'grayscale(' + levelEffect * PROPORTION_1 + ')';
  }
  if (nameEffect === 'sepia') {
    document.querySelector('.effect-sepia').style.filter = 'sepia(' + levelEffect * PROPORTION_1 + ')';
  }
  if (nameEffect === 'marvin') {
    document.querySelector('.effect-marvin').style.filter = 'invert(' + levelEffect + '%)';
  }
  if (nameEffect === 'phobos') {
    document.querySelector('.effect-phobos').style.filter = 'blur(' + levelEffect * PROPORTION_3 + 'px)';
  }
  if (nameEffect === 'heat') {
    document.querySelector('.effect-heat').style.filter = 'brightness(' + levelEffect * PROPORTION_3 + ')';
  }
}

function setNewEffect(nameEffect) {
  effectImagePreview.className = '';
  effectImagePreview.classList.add('effect-image-preview', 'effect-' + nameEffect);

  setNewEffectLevel(DEFAULT_LEVEL_EFFECT, nameEffect);
  uploadEffectLevel.classList.remove('hidden');
  if (nameEffect === 'none') {
    uploadEffectLevel.classList.add('hidden');
  }
}

uploadEffectControls.addEventListener('click', function (evt) {
  var selectElement = evt.toElement;
  if (selectElement.value) {
    setNewEffect(evt.toElement.value);
  }
});
