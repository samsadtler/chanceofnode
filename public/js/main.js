
function suncalcRequest(){
	jQuery.ajax({
			url : '/api/get',
			dataType : 'json',
			success : function(response) {
				console.log("calculation response", response);
				}
				console.log("calculation");
				// now, render the animal image/data

	})
}