'use strict';

module.exports = angular.module('app.directives', [])
.directive('movieTile', require('./movieTile'))
.directive('errSrc', require('./errSrc'));