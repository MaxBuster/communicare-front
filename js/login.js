/**
	posts org username/password to server login
	redirects to tents on success, alerts of incorrect credentials on fail
*/
function login_user() {
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/organizations/login", // Url to post login info
		{
			username: $('#username').val(), 
			password: $('#password').val()
		}
	);
	// Callback on post request success
	post_request.done(function(data) {
		localStorage.setItem("uid", data["uid"]);
		localStorage.setItem("sip", data["sip"]);
		window.location.assign("mapviz.html"); // Redirect to tents page
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Login failed, please check your credentials and try again");
	});
}

function logged_in() {
	var sid = localStorage.getItem("sip");
	if (sid === null) {
		return false;
	} else {
		return true;
	}
}