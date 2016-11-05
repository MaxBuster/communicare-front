function log_user_out() {
	var sip_id = localStorage.getItem("sip");
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/organizations/logout", // Url to post logout
		{
			sip : sip_id
		}
	);
	// Callback on post request success
	post_request.done(function(data) {
		// TODO remove sip and uid from local
		// Redirect to login
	});
	// Callback on post request failure
	post_request.fail(function() {
		// TODO logout failed?
	});
}