// If user is not logged in redirect to login
if (localStorage.getItem("sip") === null) {
	window.location.assign("login.html"); // Redirect to login
} 
// If no tent id in storage redirect to map
if (localStorage.getItem("tent_id") === null) {
	window.location.assign("mapviz.html"); // Redirect to map
}

var tent_id = localStorage.getItem("tent_id"); // Get tent id from local storage

// Get request where tent id = tent_id
var post_request = $.get(
	"https://archhack2016.herokuapp.com/tents", 
	{
		id: tent_id
	}
);

// Callback on post request success
post_request.done(function(data) {
	// TODO add all data to the screen
});
// Callback on post request failure
post_request.fail(function() {
	window.location.assign("mapviz.html"); // Redirect to map
	alert("Issue retrieving tent data");
});