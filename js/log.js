/**
	posts org details to the database
	redirects to login on success, stays on the page on failure
*/
function submit() {
	var org = $('#organization').val();
	var tent = $('#tentId').val();
	var serv = $('#service').val();
	var diag = $('#diagnosis').val();
	var com = $('#comments').val();


	var payload = {
		orgId: org,
		tentId: tent,
		service: serv,
		diagnosis: diag,
		comments: com
	};

	var post_request = $.post("https://archhack2016.herokuapp.com/log/", payload);
	// Callback on post request success
	post_request.done(function() {
		window.location.assign("tent-details.html?id="+tent); // Redirect to login
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Registration failed, try a different username");
	});
}