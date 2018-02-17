'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.galleryRenderPictures = {
    renderPictures: function (photos) {
      var picture = pictureTemplate.cloneNode(true);
      picture.querySelector('img').src = photos.url;
      picture.querySelector('.picture-likes').textContent = photos.likes;
      picture.querySelector('.picture-comments').textContent = photos.comments.length;
      return picture;
    }
  };

})();
