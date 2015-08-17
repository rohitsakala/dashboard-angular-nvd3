var app = angular.module('app');

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('bugStatus', {
      url: '/bugstatus',
      templateUrl: 'partials/bugstatus.html',
      controller: 'BugStatusCtrl',
      resolve: {
        openClosedBugsPromise: ['BugStatusService', function(BugStatusService){
          return BugStatusService.getBugStatus();
        }]
      }
    }).state('bugSeverity', {
      url: '/bugseverity',
      templateUrl: 'partials/bugseverity.html',
      controller: 'BugSeverityCtrl',
      resolve: {
        bugSeverityPromise: ['BugSeverityService', function(BugSeverityService){
          return BugSeverityService.getBugSeverity();
        }]
      }
    }).state('unitTestCoverage', {
      url: '/unittestcoverage',
      templateUrl: 'partials/unittestcoverage.html',
      controller: 'UnitTestCoverageCtrl',
      resolve: {
        unitTestCoveragePromise: ['UnitTestCoverageService', function(UnitTestCoverageService){
          return UnitTestCoverageService.getUnitTestCoverage();
        }]
      }
    }).state('integrationCoverage', {
      url: '/integrationcoverage',
      templateUrl: 'partials/integrationcoverage.html',
      controller: 'IntegrationCoverageCtrl',
      resolve: {
        integrationCoveragePromise: ['IntegrationCoverageService', function(IntegrationCoverageService){
          return IntegrationCoverageService.getIntegrationCoverage();
        }]
      }
    }).state('overallCoverage', {
      url: '/overallcoverage',
      templateUrl: 'partials/overallcoverage.html',
      controller: 'OverallCoverageCtrl',
      resolve: {
        overallCoveragePromise: ['OverallCoverageService', function(OverallCoverageService){
          return OverallCoverageService.getOverallCoverage();
        }]
      }
    }).state('about', {
      url: '/about',
      templateUrl: 'partials/about.html',
      controller: 'AboutCtrl'
    });

  $urlRouterProvider.otherwise('bugstatus');
}]);

app.run(['$rootScope',function($rootScope){

    $rootScope.stateIsLoading = false;
    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.stateIsLoading = false;
    });
    $rootScope.$on('$stateChangeError', function() {
        //catch error
    });

}]);
