var seriesApp = angular.module("seriesApp", ['ngRoute']);

seriesApp.config(function($routeProvider) {
    $routeProvider
        .when('/seriesList', {
            templateUrl: 'seriesList.html',
            controller: 'seriesListController'
        })
        .when('/serieDetails', {
            templateUrl: 'serieDetails.html',
            controller: 'serieDetailsController'
        })
        .otherwise({
            redirectTo: '/seriesList'
        });
});

seriesApp.controller('seriesListController', function(seriesServer, $scope, $window, $location) {
    $scope.listOfSeries = [];
    $scope.redirect = redirect;
    $scope.onlyMatch = onlyMatch;
    $scope.dropdownChanged = dropdownChanged;
    $scope.dropdown = ["Name", "Views", "Seasons"];
    init();

    function init() {
        seriesServer.getSeries().then(function(resp) {
            $scope.listOfSeries = resp.data;
        });
    }

    function redirect(item) {
        seriesServer.setSerieItem(item);
        window.location = '#' + "/serieDetails";
    };

    function onlyMatch(input, output) {
        var str = (input + "").toLowerCase();
        return str.indexOf(output.toLowerCase()) === 0;
    }

    function dropdownChanged(selectedVal) {
        if (selectedVal != null) {
            switch (selectedVal) {
                case 'Name':
                    $scope.listOfSeries.sort(function(a, b) {
                        var textA = a.Title.toUpperCase();
                        var textB = b.Title.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    });
                    break;
                case 'Views':
                    $scope.listOfSeries.sort((a, b) => Number(a.Views) - Number(b.Views));
                    break;
                case 'Seasons':
                    $scope.listOfSeries.sort((a, b) => Number(a.Seasons) - Number(b.Seasons));
                    break;
                default:
            }
        }
    }
});


seriesApp.service('seriesServer', function($http, $q) {
    var chosenItem;
    this.getSeries = function() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost/pasgotApi/api/values',
        }).then(function successCallback(response) {
            defer.resolve(response);
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
    }

    this.setSerieItem = function(selectedVal) {
        chosenItem = selectedVal;
    }
    this.getSerieItem = function() {
        return chosenItem;
    }
});


seriesApp.controller('serieDetailsController', function(seriesServer, $scope, $window, $location) {
    init();

    function init() {
        $scope.chosenItem = seriesServer.getSerieItem();
    }
});