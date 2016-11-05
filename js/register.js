/**
	posts org details to the database
	redirects to login on success, stays on the page on failure
*/
function register_user() {
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/organizations", // Url to post org details to
		{
			name: $('#name').val(), 
			username: $('#username').val(), 
			password: $('#password').val()
		}
	);
	// Callback on post request success
	post_request.done(function() {
		window.location.assign("login.html"); // Redirect to login
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Registration failed, try a different username");
	});
}