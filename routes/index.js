var express = require('express');
var SunCalc = require('suncalc');
// var SunCalc = require('./suncalc'),
var t = require('tap');
var router = express.Router();
router.post('/post/', function(req, res) {
  
  var jsonData = {
    'name': 'posted: chance of rainbows ',
    'api-status':'OK'
  }
  // respond with json data
  return res.json(jsonData)
});
router.get('/', function(req, res) {
  
  var jsonData = {
  	'name': 'chance of rainbows',
  	'api-status':'OK'  
  }

  // respond with json data
  res.json(jsonData)
})

// simple route to show an HTML page
router.get('/sample-page', function(req,res){
  res.render('sample.html')
})

router.get('/api/get/', function(req, res){

    console.log('get requestion data' , req.query)
    var degree;
    var rads;
    var aDate = req.query.date
    var date = new Date(aDate),
      lat = decimalAdjust('round', req.query.lat, -2),
      lng = decimalAdjust('round', req.query.lng, -2);
      console.log("aDate date lat lng: ", aDate', ', date, ', ', lat, ', ', lng)
    function near(val1, val2, margin) {
        return Math.abs(val1 - val2) < (margin || 1E-15);
    }
    var sunPos = SunCalc.getPosition(date, lat, lng);
    var rads =  sunPos.altitude;
    var degree =  rads*180/Math.PI;
    console.log("radians: ",rads)
    console.log("degrees: ",degree)
    var jsonData = {
        'name': 'chance of rainbows',
        'api-status':'getitdone',
        'radians': rads,
        'degrees': degree
    }
    res.json(jsonData);
    
})

 function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
 

module.exports = router;