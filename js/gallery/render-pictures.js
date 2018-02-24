'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  window.galleryRenderPictures = {
    renderPictures: function (photos) {
      for (var i = 0; i < photos.length; i++) {
        var picture = pictureTemplate.cloneNode(true);
        picture.querySelector('img').src = photos[i].url;
        picture.querySelector('.picture-likes').textContent = photos[i].likes;
        picture.querySelector('.picture-comments').textContent = photos[i].comments.length;
        fragment.appendChild(picture);
      }
      pictures.appendChild(fragment);
    }
  };

})();
