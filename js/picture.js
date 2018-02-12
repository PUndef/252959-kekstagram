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
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var upload = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadClose = document.querySelector('#upload-cancel');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDescription = document.querySelector('.upload-form-description');
var uploadEffectLevel = document.querySelector('.upload-effect-level');
var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
var effectImagePreview = document.querySelector('.effect-image-preview');
var uploadEffectControls = document.querySelector('.upload-effect-controls');

var stepResizeValue = 25;
var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
var uploadResizeMinValue = 25;
var uploadResizeMaxValue = 100;
var decreaseUploadImageSize = document.querySelector('.upload-resize-controls-button-dec');
var increaseUploadImageSize = document.querySelector('.upload-resize-controls-button-inc');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomComments = function (inputCommentsArray, countForOutput) {
  var comments = [];
  for (var j = 0; j < countForOutput; j++) {
    comments.push(inputCommentsArray[getRandomInt(0, inputCommentsArray.length - 1)]);
  }
  return comments;
};

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

var renderPictures = function (photos) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('img').src = photos.url;
  picture.querySelector('.picture-likes').textContent = photos.likes;
  picture.querySelector('.picture-comments').textContent = photos.comments.length;
  return picture;
};

for (i = 0; i < photosArray.length; i++) {
  fragment.appendChild(renderPictures(photosArray[i]));
}
pictures.appendChild(fragment);

var openGalleryOverlay = function (src, likes, comments) {
  document.addEventListener('keydown', onPopupEscPress);
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('.gallery-overlay-image').src = src;
  galleryOverlay.querySelector('.likes-count').textContent = likes;
  galleryOverlay.querySelector('.comments-count').textContent = comments;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    closeUploadPopup();
  }
};

var stopCloseEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

uploadFormHashtags.addEventListener('keydown', function (evt) {
  stopCloseEscPress(evt);
});
uploadFormDescription.addEventListener('keydown', function (evt) {
  stopCloseEscPress(evt);
});

var closePopup = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var closeUploadPopup = function () {
  upload.value = '';
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var openPopup = function (elem) {
  elem.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  openPopup(uploadOverlay);
});

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

var setNewEffectLevel = function (levelEffect, nameEffect) {
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
};

var setNewEffect = function (nameEffect) {
  effectImagePreview.className = '';
  effectImagePreview.classList.add('effect-image-preview', 'effect-' + nameEffect);

  setNewEffectLevel(DEFAULT_LEVEL_EFFECT, nameEffect);
  uploadEffectLevel.classList.remove('hidden');
  if (nameEffect === 'none') {
    uploadEffectLevel.classList.add('hidden');
  }
};

uploadEffectControls.addEventListener('click', function (evt) {
  var selectElement = evt.toElement;
  if (selectElement.value) {
    setNewEffect(evt.toElement.value);
  }
});

var changeUploadImagesSize = function (currentUploadResizeValue) {
  uploadResizeValue.value = currentUploadResizeValue + '%';
  effectImagePreview.style.transform = 'scale(' + currentUploadResizeValue / 100 + ')';
};

decreaseUploadImageSize.addEventListener('click', function () {
  var currentUploadResizeValue = parseInt(uploadResizeValue.value, 10);
  if (currentUploadResizeValue > uploadResizeMinValue) {
    currentUploadResizeValue -= stepResizeValue;
    changeUploadImagesSize(currentUploadResizeValue);
  }
});

increaseUploadImageSize.addEventListener('click', function () {
  var currentUploadResizeValue = parseInt(uploadResizeValue.value, 10);
  if (currentUploadResizeValue < uploadResizeMaxValue) {
    currentUploadResizeValue += stepResizeValue;
    changeUploadImagesSize(currentUploadResizeValue);
  }
});

pictures.addEventListener('click', function (evt) {
  evt.preventDefault();
  var elem = evt.target;
  var comments = elem.nextElementSibling.querySelector('.picture-comments').textContent;
  var likes = elem.nextElementSibling.querySelector('.picture-likes').textContent;
  var src = evt.target.getAttribute('src');
  openGalleryOverlay(src, likes, comments);
});

galleryOverlayClose.addEventListener('click', function () {
  closePopup();
});
