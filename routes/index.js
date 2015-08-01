var express = require('express');
var router = express.Router();
var rest = require('restler');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/partials/openbugs.html', function(req, res, next) {
  res.render('partials/openbugs');
});

router.get('/partials/unittests.html', function(req, res, next) {
  res.render('partials/unittests');
});

router.get('/partials/coverage.html', function(req, res, next) {
  res.render('partials/coverage');
});

router.get('/bugs', function(req, res, next){
  var projectBugs = [];
  rest.get('https://bugs.opendaylight.org/jsonrpc.cgi?method=Product.get_selectable_products').on('complete', function(data){
    var url = 'https://bugs.opendaylight.org/jsonrpc.cgi?method=Product.get&params=[{"ids":[' + data.result.ids + ']}]';
    rest.get(url).on('success', function(dataPerProject){
      var productNames = [];
      for(var i = 0; i < dataPerProject.result.products.length; i++){
        productNames.push(dataPerProject.result.products[i].name);
      }
      async.eachLimit(productNames, 10, function(param, eachCb){
        var urlPerProduct = 'https://bugs.opendaylight.org/jsonrpc.cgi?method=Bug.search&params=[{"product":["' + param + '"]}]';
        rest.get(urlPerProduct).on('complete', function(bugsPerProject, param){
          //if(!(bugsPerProject.result.bugs == null )){
            var entry = new Object();
            if((bugsPerProject.result.bugs.length != 0)){
              entry.product = bugsPerProject.result.bugs[0].product;
              entry.numberOfBugs = bugsPerProject.result.bugs.length;
              projectBugs.push(entry);
            }
            //else{
              //entry.product = 'Undefined product'
            //}

          //}
          eachCb(null);
        });
      }, function(err){
        res.json(projectBugs);
      });
      //}
    });
  });
});


router.get('/coverage', function(req, res, next){
  var projectCoverage = [];
  rest.get('https://sonar.opendaylight.org/api/resources?format=json').on('success', function(data){
    var ids = [];
    for(var i = 0; i < data.length; i++){
      ids.push(data[i].id);
    }
    async.each(ids, function(param, eachCb){
      var url = 'https://sonar.opendaylight.org/api/resources?format=json&resource=' + param + '&metrics=coverage';
      rest.get(url).on('success', function(dataPerProject){
        if(!(typeof dataPerProject[0] === 'undefined')){
          //projectCoverage.push(dataPerProject[0].name + "," + dataPerProject[0].msr[0].val);
          var entry = new Object();
          entry.product = dataPerProject[0].name;
          entry.coverage = dataPerProject[0].msr[0].val;
          //console.log(entry);
          projectCoverage.push(entry);

          //console.log('############### : ' + dataPerProject[0].name + "," + dataPerProject[0].msr[0].val);
        }
        eachCb(null);
      });
    },function(err){
      res.json(projectCoverage);
    })
  });
});

router.get('/bugs.json', function(req, res, next) {
  res.json([{product:"Add-on",numberOfBugs:3},{product:"Graveyard",numberOfBugs:56},{product:"Infrastructure",numberOfBugs:3},{product:"Air Mozilla",numberOfBugs:1},{product:"Services",numberOfBugs:9}, {product:"Add-on2",numberOfBugs:3},{product:"Graveyard2",numberOfBugs:36},{product:"Infrastructure2",numberOfBugs:21},{product:"Air Mozilla2",numberOfBugs:14},{product:"Services2",numberOfBugs:39}]);
});

router.get('/bugzilla', function(req, res, next){
  var projectBugs = [];
  rest.get('https://bugs.opendaylight.org/jsonrpc.cgi?method=Product.get_selectable_products').on('success', function(data){
    var url = 'https://bugs.opendaylight.org/jsonrpc.cgi?method=Product.get&params=[{"ids":[' + data.result.ids + ']}]';
    rest.get(url).on('success', function(dataPerProject){
      for(var i = 0; i < dataPerProject.result.products.length; i++){
        var urlPerProduct = 'https://bugs.opendaylight.org/jsonrpc.cgi?method=Bug.search&params=[{"product":["' + dataPerProject.result.products[i].name + '"]}]';
        rest.get(urlPerProduct).on('success', function(bugsPerProject){
          if(!(bugsPerProject.result.bugs == null )){
            //console.log(bugsPerProject.result.bugs.length);
            var entry = new Object();
            if((bugsPerProject.result.bugs.length != 0)){
              entry.product = bugsPerProject.result.bugs[0].product;
            }else{
              entry.product = 'Undefined product'
            }
            entry.numberOfBugs = bugsPerProject.result.bugs.length;
            projectBugs.push(entry);
          }else{
            console.log('null');
          }
        });
      }
    });
    //res.end();
    setTimeout(function () {
        res.json(projectBugs);
    }, 15000);
  });
});




/*
function getCoverageData(){
  rest.get('https://sonar.opendaylight.org/api/resources?format=json').on('success', function(data){
    var projectCoverage = [];
    for(i = 0; i < data.length; i++){
      url = 'https://sonar.opendaylight.org/api/resources?format=json&resource=' + data[i].id + '&metrics=coverage';
      rest.get(url).on('success', function(dataPerProject){
        if(!(typeof dataPerProject[0] === 'undefined')){
          projectCoverage.push(dataPerProject[0].name + "," + dataPerProject[0].msr[0].val);
        }else{
        }
      });
    }
  });
  return projectCoverage;
  console.log("NOT WORKING!!!!!!!!!!!!!!!!!");
}

*/
module.exports = router;
