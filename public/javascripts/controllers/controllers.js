var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('openbugs', {
      url: '/openbugs',
      templateUrl: 'partials/openbugs.html',
      controller: 'OpenBugsCtrl'
    }).state('unittests', {
      url: '/unittests',
      templateUrl: 'partials/unittests.html',
      controller: 'UnitTestsCtrl'
    }).state('coverage', {
      url: '/coverage',
      templateUrl: 'partials/coverage.html',
      controller: 'CoverageCtrl'
    });

  $urlRouterProvider.otherwise('openbugs');
}]);

app.controller('OpenBugsCtrl', ['$scope', function($scope){
  $scope.OpenBugsCtrlTest = 'OpenBugsCtrlTest';
}]);


app.controller('UnitTestsCtrl', ['$scope', function($scope) {
  $scope.UnitTestsCtrlTest = 'UnitTestsCtrlTest';
  //$scope.ntest = 'this is ndv3';
  $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 200
                }
            }
        };

        $scope.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ]
}]);

app.controller('CoverageCtrl', ['$scope', function($scope){
  $scope.CoverageCtrlTest = 'CoverageCtrlTest';
}]);
