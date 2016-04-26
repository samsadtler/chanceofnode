var localhost = "https://chanceofrainbows.herokuapp.com";
// var localhost = "https://localhost:3000";

function init(){
	console.log("init babies")
	var date = new Date('2013-03-05UTC'),
    lat = 50.5,
    lng = 30.5;
	suncalcRequest(lat, lng, date)
}
function suncalcRequest(lat, lng, yearmonthday){
	console.log('request --> lat: ', lat,'lng: ', lng, 'date: ', yearmonthday);
	dataArray = {
		'lat': lat,
		'lng': lng,
		'date': yearmonthday
	}
	jQuery.ajax({
			url : localhost + '/api/get/',
			type : 'get',
			data : dataArray,
			dataType : 'json',
			success : function(response) {
				console.log("calculation response", response);
			},
			error: function(response){
				console.log('fuck beans')
			}
			

	})
}