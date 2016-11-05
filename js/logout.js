function log_user_out() {
	var sip_id = localStorage.getItem("sip");
	if (sip_id === null) {
		return;
	}
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/organizations/logout", // Url to post logout
		{
			sip : sip_id
		}
	);
	// Callback on post request success
	post_request.done(function(data) {
		localStorage.removeItem("sip"); // Remove cookies
		localStorage.removeItem("uid");
		window.location.assign("login.html"); // Redirect to login
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Failed to log out. Please try again later.");
	});
}