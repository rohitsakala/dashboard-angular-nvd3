var app = angular.module('app');

app.factory('ListService', ['$http', function($http){
  var o = {
    ListData :[]
  };
  o.getList = function() {
    return $http.get('/list', {cache: true}).success(function(data){
      angular.copy(data, o.ListData);
    });
  };
  return o;
}]);

app.factory('BugStatusService', ['$http', function($http){
  var o = {
    bugStatusData :[]
  };
  o.getBugStatus = function() {
    return $http.get('/bugstatus', {cache: true}).success(function(data){
      angular.copy(data, o.bugStatusData);
    });
  };
  return o;
}]);

app.factory('BugSeverityService', ['$http', function($http){
  var o = {
    bugSeverityData :[]
  };
  o.getBugSeverity = function() {
    return $http.get('/bugseverity', {cache: true}).success(function(data){
      angular.copy(data, o.bugSeverityData);
    });
  };
  return o;
}]);

app.factory('BugPriorityService', ['$http', function($http){
  var o = {
    bugPriorityData :[]
  };
  o.getBugPriority = function() {
    return $http.get('/bugpriority', {cache: true}).success(function(data){
      angular.copy(data, o.bugPriorityData);
    });
  };
  return o;
}]);

app.factory('UnitTestCoverageService', ['$http', function($http){
  var o = {
    unitTestCoverageData :[]
  };
  o.getUnitTestCoverage = function() {
    return $http.get('/unittestcoverage', {cache: true}).success(function(data){
      angular.copy(data, o.unitTestCoverageData);
    });
  };
  return o;
}]);

app.factory('IntegrationCoverageService', ['$http', function($http){
  var o = {
    integrationCoverageData :[]
  };
  o.getIntegrationCoverage = function() {
    return $http.get('/integrationcoverage', {cache: true}).success(function(data){
      angular.copy(data, o.integrationCoverageData);
    });
  };
  return o;
}]);

app.factory('OverallCoverageService', ['$http', function($http){
  var o = {
    overallCoverageData :[]
  };
  o.getOverallCoverage = function() {
    return $http.get('/overallcoverage', {cache: true}).success(function(data){
      angular.copy(data, o.overallCoverageData);
    });
  };
  return o;
}]);
