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
  // var date = req.query.date,
  var date = new Date('2013-03-05UTC'),
    lat = req.query.lat,
    lng = req.query.lng;
    console.log("datalatlng: ", date, ', ', lat, ', ', lng)
  function near(val1, val2, margin) {
      return Math.abs(val1 - val2) < (margin || 1E-15);
  }

// var testTimes = {
//     solarNoon: '2013-03-05T10:10:57Z',
//     nadir: '2013-03-04T22:10:57Z',
//     sunrise: '2013-03-05T04:34:56Z',
//     sunset: '2013-03-05T15:46:57Z',
//     sunriseEnd: '2013-03-05T04:38:19Z',
//     sunsetStart: '2013-03-05T15:43:34Z',
//     dawn: '2013-03-05T04:02:17Z',
//     dusk: '2013-03-05T16:19:36Z',
//     nauticalDawn: '2013-03-05T03:24:31Z',
//     nauticalDusk: '2013-03-05T16:57:22Z',
//     nightEnd: '2013-03-05T02:46:17Z',
//     night: '2013-03-05T17:35:36Z',
//     goldenHourEnd: '2013-03-05T05:19:01Z',
//     goldenHour: '2013-03-05T15:02:52Z'
// };
  var sunPos = SunCalc.getPosition(date, lat, lng);

    // t.ok(near(sunPos.azimuth, -2.5003175907168385), 'azimuth');
    // t.ok(near(sunPos.altitude, -0.7000406838781611), 'altitude in radians');
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

// t.test('getPosition returns azimuth and altitude for the given time and location', function (t) {
//     var sunPos = SunCalc.getPosition(date, lat, lng);

//     // t.ok(near(sunPos.azimuth, -2.5003175907168385), 'azimuth');
//     // t.ok(near(sunPos.altitude, -0.7000406838781611), 'altitude in radians');
//     var rads =  sunPos.altitude;
//     var degree =  rads*180/Math.PI;
//     console.log("radians: ",rads)
//     console.log("degrees: ",degree)
//     var jsonData = {
//       'name': 'chance of rainbows',
//       'api-status':'getitdone',
//       'radians': rads,
//       'degrees': degrees
//     }
//     res.json(jsonData);
//     t.end();
// });

// t.test('getTimes returns sun phases for the given date and location', function (t) {
//     var times = SunCalc.getTimes(date, lat, lng);

//     for (var i in testTimes) {
//         t.equal(new Date(testTimes[i]).toUTCString(), times[i].toUTCString(), i);
//     }
//     t.end();
// });

  
})

module.exports = router;