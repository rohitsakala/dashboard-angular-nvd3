var app = angular.module('app');

app.controller('BugStatusCtrl', ['$scope', 'BugStatusService', function($scope, BugStatusService){
  $scope.optionsBugStatus = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                multibar: {
                  dispatch: {
                    elementClick: function(e) {
                      if(e.data.series == 2){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_status=CONFIRMED&bug_status=UNCONFIRMED&product=' + e.data.x + '&resolution=---').focus();
                      }else if(e.data.series == 1){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_status=WAITING_FOR_REVIEW&bug_status=IN_PROGRESS&product=' + e.data.x + '&resolution=---').focus();
                      }else if(e.data.series == 0){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_status=RESOLVED&bug_status=VERIFIED&product=' + e.data.x + '&resolution=FIXED&resolution=INVALID&resolution=WONTFIX&resolution=DUPLICATE&resolution=WORKSFORME').focus();
                      }
                    }
                  }
                },
                x: function(d){return d.x;},
                y: function(d){return d.y;},
                stacked: true,
                reduceXTicks:false,
                showValues: true,
                valueFormat: function(d){
                    return d3.format('d')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Project',
                    rotateLabels: -60
                },
                yAxis: {
                    axisLabel: 'Status of Bugs',
                    axisLabelDistance: 30,
                    tickFormat : function (d) { return d }
                }
            },
            title: {
                  enable: true,
                  text: 'Status of Bugs',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataBugStatus = BugStatusService.bugStatusData;
}]);

app.controller('BugSeverityCtrl', ['$scope', 'BugSeverityService', function($scope, BugSeverityService) {
  $scope.optionsBugSeverity = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                multibar: {
                  dispatch: {
                    elementClick: function(e) {
                      console.log(e);
                      if(e.data.series == 2){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_severity=critical&bug_severity=blocker&bug_severity=major&product=' + e.data.x + '&resolution=---').focus();
                      }else if(e.data.series == 1){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_severity=normal&bug_severity=minor&bug_severity=trivial&product=' + e.data.x + '&resolution=---').focus();
                      }else if (e.data.series == 0) {
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_severity=enhancement&product=' + e.data.x + '&resolution=---').focus();
                      }
                    }
                  }
                },
                x: function(d){return d.x;},
                y: function(d){return d.y;},
                stacked: true,
                reduceXTicks:false,
                showValues: true,
                valueFormat: function(d){
                    return d3.format('d')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Project',
                    rotateLabels: -60
                },
                yAxis: {
                    axisLabel: 'Severity of Bugs',
                    axisLabelDistance: 30,
                    tickFormat : function (d) { return d }
                }
            },
            title: {
                  enable: true,
                  text: 'Severity of Bugs',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataBugSeverity = BugSeverityService.bugSeverityData;
}]);

app.controller('BugPriorityCtrl', ['$scope', 'BugPriorityService', function($scope, BugPriorityService) {
  $scope.optionsBugPriority = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                multibar: {
                  dispatch: {
                    elementClick: function(e) {
                      console.log(e);
                      if(e.data.series == 2){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&priority=Highest&priority=Highproduct=' + e.data.x + '&resolution=---').focus();
                      }else if(e.data.series == 1){
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_severity=normal&bug_severity=minor&bug_severity=trivial&product=' + e.data.x + '&resolution=---').focus();
                      }else if (e.data.series == 0) {
                        window.open('https://bugs.opendaylight.org/buglist.cgi?action=wrap&bug_severity=enhancement&product=' + e.data.x + '&resolution=---').focus();
                      }
                    }
                  }
                }, 
                x: function(d){return d.x;},
                y: function(d){return d.y;},
                stacked: true,
                reduceXTicks:false,
                showValues: true,
                valueFormat: function(d){
                    return d3.format('d')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Project',
                    rotateLabels: -60
                },
                yAxis: {
                    axisLabel: 'Priority of Bugs',
                    axisLabelDistance: 30,
                    tickFormat : function (d) { return d }
                }
            },
            title: {
                  enable: true,
                  text: 'Priority of Bugs',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataBugPriority = BugPriorityService.bugPriorityData;
}]);

app.controller('UnitTestCoverageCtrl', ['$scope', 'UnitTestCoverageService', function($scope, UnitTestCoverageService){
  $scope.optionsUnitTestCoverage = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                discretebar: {
                  dispatch: {
                    elementClick: function(e) {
                      window.open('https://sonar.opendaylight.org/dashboard/index/' + e.data.projectId).focus();
                    }
                  }
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Projects',
                    rotateLabels: -60,
                },
                yAxis: {
                    axisLabel: 'Unit Test Coverage',
                    axisLabelDistance: 30
                }
            },
            title: {
                  enable: true,
                  text: 'Unit Test Coverage',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataUnitTestCoverage = UnitTestCoverageService.unitTestCoverageData;
}]);

app.controller('IntegrationCoverageCtrl', ['$scope', 'IntegrationCoverageService', function($scope, IntegrationCoverageService){
  $scope.optionsIntegrationCoverage = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                discretebar: {
                  dispatch: {
                    elementClick: function(e) {
                      window.open('https://sonar.opendaylight.org/dashboard/index/' + e.data.projectId).focus();
                    }
                  }
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Projects',
                    rotateLabels: -60,
                },
                yAxis: {
                    axisLabel: 'Integration Test Coverage',
                    axisLabelDistance: 30
                }
            },
            title: {
                  enable: true,
                  text: 'Integration Test Coverage',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataIntegrationCoverage = IntegrationCoverageService.integrationCoverageData;
}]);

app.controller('OverallCoverageCtrl', ['$scope', 'OverallCoverageService', function($scope, OverallCoverageService){
  $scope.optionsOverallCoverage = {
            chart: {
                type: 'discreteBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 120,
                    left: 55
                },
                discretebar: {
                  dispatch: {
                    elementClick: function(e) {
                      window.open('https://sonar.opendaylight.org/dashboard/index/' + e.data.projectId).focus();
                    }
                  }
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Projects',
                    rotateLabels: -60,
                },
                yAxis: {
                    axisLabel: 'Overall Test Coverage',
                    axisLabelDistance: 30
                }
            },
            title: {
                  enable: true,
                  text: 'Overall Test Coverage',
                  className: 'h4',
                  css: {
                    width: 'nullpx',
                    textAlign: 'center'
                  }
            }
        };
  $scope.dataOverallCoverage = OverallCoverageService.overallCoverageData;
}]);

app.controller('AboutCtrl', ['$scope', function($scope) {
}]);
