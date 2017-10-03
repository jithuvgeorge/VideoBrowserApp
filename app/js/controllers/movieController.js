'use strict';

/* @ngInject */
function ExampleCtrl($scope, movieFactory, $q) {

  var totalItems = 0, itemsLoaded = 0, nextPageIndex = 0;
  $scope.tileArray = [];

  function init(){
    $scope.isLoading = false;
    $scope.loadNextPage();
  }

  $scope.loadNextPage = function(){
    
    if($scope.isLoading ||  itemsLoaded >= totalItems && nextPageIndex != 0){
      return;
    }
    $scope.isLoading = true;
    nextPageIndex = nextPageIndex + 1;
    $q.when(movieFactory.getMovieList(nextPageIndex))
    .then(function(result){
      $scope.isLoading = false;
      $scope.tileArray = _.concat($scope.tileArray, _.get(result, 'data.page.content-items.content'));
      totalItems = parseInt(_.get(result, 'data.page.total-content-items'), 10);
      itemsLoaded = _.size($scope.tileArray);
    })
    .catch(function () {
      console.log("error in reading data");
    })
    .finally(function () {
      
    });
  };

 var _selected;

  $scope.selected = undefined;

  var results = [];

 
  // Any function returning a promise object can be used to load values asynchronously
  $scope.searchMovies = function(searchKey) {
    return movieFactory.getSearchList(searchKey);
  };


  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };
  
  init();
}

module.exports= ExampleCtrl;