/**
	removes user session
*/
function log_user_out() {
	var sip = localStorage.getItem("sip");
	if (sip === null) {
		window.location.assign("./"); // Redirect to tents page
	}
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/organizations/logout", // Url to post login info
		{
			sid: sip
		}
	);
	// Callback on post request success
	post_request.done(function(data) {
		localStorage.removeItem("uid");
		localStorage.removeItem("sip");
		window.location.assign("./"); // Redirect to tents page
	});
	// Callback on post request failure
	post_request.fail(function() {
		window.location.assign("./"); // Redirect to tents page
	});
}