'use strict';

/* @ngInject */
function movieTile(AppSettings) {
  return {
    templateUrl: "tile.html",
    scope:{
      movieData:"="
    },
    replace: true,
    link: function(scope) {
      // console.log(scope.movieData);
      scope.icon = "images/"+ scope.movieData["poster-image"];
      scope.missingIcon = "images/"+ AppSettings.default_image;
      scope.name = scope.movieData.name;
    }
  };
}

module.exports= movieTile;