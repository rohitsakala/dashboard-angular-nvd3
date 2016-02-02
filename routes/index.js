var express = require('express');
var router = express.Router();
var rest = require('restler');
var csv = require("fast-csv");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/partials/bugstatus.html', function(req, res, next) {
  res.render('partials/bugstatus');
});

router.get('/partials/bugseverity.html', function(req, res, next) {
  res.render('partials/bugseverity');
});

router.get('/partials/bugpriority.html', function(req, res, next) {
  res.render('partials/bugpriority');
});

router.get('/partials/unittestcoverage.html', function(req, res, next) {
  res.render('partials/unittestcoverage');
});

router.get('/partials/integrationcoverage.html', function(req, res, next) {
  res.render('partials/integrationcoverage');
});

router.get('/partials/overallcoverage.html', function(req, res, next) {
  res.render('partials/overallcoverage');
});

router.get('/partials/about.html', function(req, res, next) {
  res.render('partials/about');
});

router.get('/bugstatus', function(req, res, next){
  var map = new Map();
  rest.get('https://bugs.opendaylight.org/report.cgi?bug_status=RESOLVED&bug_status=VERIFIED&resolution=---&resolution=FIXED&resolution=INVALID&resolution=WONTFIX&resolution=DUPLICATE&resolution=WORKSFORME&x_axis_field=resolution&y_axis_field=product&width=1024&height=600&action=wrap&ctype=csv&format=table').on('complete', function(dataURL) {
    var temp = dataURL.split('\n');
    temp[0] = "Product,---,FIXED,INVALID,WONTFIX,DUPLICATE,WORKSFORME";
    dataURL = temp.join('\n');
    csv
     .fromString(dataURL, {headers: true})
     .on("data", function(data){
         var sum = +data.FIXED + +data.INVALID + +data.WONTFIX + +data.DUPLICATE + +data.WORKSFORME;
         map.set(data.Product, {});
         map.get(data.Product).closed = sum;
     })
     .on("end", function(){
       rest.get('https://bugs.opendaylight.org/report.cgi?bug_status=UNCONFIRMED&bug_status=CONFIRMED&bug_status=IN_PROGRESS&bug_status=WAITING_FOR_REVIEW&resolution=---&x_axis_field=bug_status&y_axis_field=product&width=1024&height=600&action=wrap&ctype=csv&format=table').on('complete', function(dataURL) {
         var temp = dataURL.split('\n');
         temp[0] = "Product,UNCONFIRMED,CONFIRMED,IN_PROGRESS,WAITING_FOR_REVIEW";
         dataURL = temp.join('\n');
         csv
          .fromString(dataURL, {headers: true})
          .on("data", function(data){
              var item = map.get(data.Product);
              if(typeof item === 'undefined'){
                map.set(data.Product, {closed: 0, open: (+data.UNCONFIRMED + +data.CONFIRMED), working: (+data.IN_PROGRESS + +data.WAITING_FOR_REVIEW)});
              }else{
                item.open = +data.UNCONFIRMED + +data.CONFIRMED;
                item.working = +data.IN_PROGRESS + +data.WAITING_FOR_REVIEW;
                map.set(data.Product, item);
              }
          })
          .on("end", function(){
            var open, closed, working;
            open = {key: 'Open', color: '#FF0000', values: []};
            closed = {key: 'Closed', color: '#33CC33', values: []};
            working = {key: 'Working on', color: '#FFFF00', values: []};
            map.forEach(function(value, key) {
              open.values.push({ x : key, y : value.open});
              closed.values.push({ x : key, y : value.closed});
              working.values.push({ x : key, y : value.working});
            }, map);
            res.json([closed, working, open]);
          });
       });
     });
     });
});

router.get('/bugseverity', function(req, res, next){
  rest.get('https://bugs.opendaylight.org/report.cgi?resolution=---&x_axis_field=bug_severity&y_axis_field=product&width=1024&height=600&action=wrap&ctype=csv&format=table').on('complete', function(dataURL) {
    var temp = dataURL.split('\n');
    temp[0] = "Product,blocker,critical,major,normal,minor,trivial,enhancement";
    dataURL = temp.join('\n');
    var critical, normal, enhancement;
    critical = {key: 'Critical', color: '#FF0000', values: []};
    normal = {key: 'Normal', color: '#FFFF00', values: []};
    enhancement = {key: 'Enhancement', color: '#33CC33', values: []};
    csv
     .fromString(dataURL, {headers: true})
     .on("data", function(data){
         critical.values.push({ x : data.Product, y : (+data.blocker + +data.critical + +data.major)});
         normal.values.push({ x : data.Product, y : (+data.normal + +data.minor + +data.trivial)});
         enhancement.values.push({ x : data.Product, y : +data.enhancement});
     })
     .on("end", function(){
          res.json([enhancement, normal, critical]);
     });
     console.log(normal);
  });
});

router.get('/bugpriority', function(req, res, next){
  rest.get('https://bugs.opendaylight.org/report.cgi?resolution=---&x_axis_field=priority&y_axis_field=product&width=1024&height=600&action=wrap&ctype=csv&format=table').on('complete', function(dataURL) {
    var temp = dataURL.split('\n');
    temp[0] = "Product,Highest,High,Normal,Low,Lowest,Unspecified";
    dataURL = temp.join('\n');
    var High,Normal,Low;
    High = {key: 'High', color: '#FF0000', values: []};
    Normal = {key: 'Normal', color: '#FFFF00', values: []};
    Low = {key: 'Low', color: '#33CC33', values: []};
    csv
     .fromString(dataURL, {headers: true})
     .on("data", function(data){
         High.values.push({ x : data.Product, y : (+data.Highest + +data.High)});
         Normal.values.push({ x : data.Product, y : (+data.Normal + +data.Unspecified)});
         Low.values.push({ x : data.Product, y : (+data.Low + +data.Lowest)});
     })
     .on("end", function(){
         res.json([High, Normal, Low]);
     });
  });
});

router.get('/unittestcoverage', function(req, res, next){
  rest.get('https://sonar.opendaylight.org/api/resources?metrics=coverage&format=json').on('complete', function(data){
    var projectCoverage = [];
    for(var i = 0; i < data.length; i++){
      projectCoverage.push({label: data[i].name, value: data[i].msr[0].val, projectId: data[i].id});
    }
    projectCoverage.sort(function(a, b) {
        return a.label.localeCompare(b.label);
    });
    res.json([{
      key: 'Cumulative Return',
      values: projectCoverage
    }]);
  });
});

router.get('/integrationcoverage', function(req, res, next){
  rest.get('https://sonar.opendaylight.org/api/resources?metrics=it_coverage&format=json').on('complete', function(data){
    var projectCoverage = [];
    for(var i = 0; i < data.length; i++){
      projectCoverage.push({label: data[i].name, value: data[i].msr[0].val, projectId: data[i].id});
    }
    projectCoverage.sort(function(a, b) {
        return a.label.localeCompare(b.label);
    });
    res.json([{
      key: 'Cumulative Return',
      values: projectCoverage
    }]);
  });
});

router.get('/overallcoverage', function(req, res, next){
  rest.get('https://sonar.opendaylight.org/api/resources?metrics=overall_coverage&format=json').on('complete', function(data){
    var projectCoverage = [];
    for(var i = 0; i < data.length; i++){
      projectCoverage.push({label: data[i].name, value: data[i].msr[0].val, projectId: data[i].id});
    }
    projectCoverage.sort(function(a, b) {
        return a.label.localeCompare(b.label);
    });
    res.json([{
      key: 'Cumulative Return',
      values: projectCoverage
    }]);
  });
});

module.exports = router;