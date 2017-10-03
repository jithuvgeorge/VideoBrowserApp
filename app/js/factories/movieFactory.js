'use strict';

/* @ngInject */
module.exports = function MovieFactory($q, $http, AppSettings) {

  function getMovieList(page) {
    var deferred = $q.defer();
    $http.get(AppSettings.api_url + page + ".json").then(function(result){
      deferred.resolve(result);
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  }

  function getSearchList(val) {
    var deferred = $q.defer();
    $http.get(AppSettings.search_url).then(function(result){
      var results = _.filter(result.data.page['content-items'].content, function(o) { return _.includes(_.toLower(o.name), val);});
      deferred.resolve(results);
    }, function(error){
      deferred.reject(error);
    });
    return deferred.promise;
  }

  return {
    getMovieList,
    getSearchList
  };

};