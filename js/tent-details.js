// ------------------- Check for tent id param --------------------- //
var tent_id = getURLParameter('id');
if (tent_id == null) {
	window.location.assign("./mapviz.html");
}

// ------------------- Retreive tent info --------------------- //
var get_request = $.get(
	"https://archhack2016.herokuapp.com/tents", 
	{
		id: tent_id
	}
);
// Callback on get request success
get_request.done(function(data) {
	add_info(data);
	add_actions(data);
});
// Callback on get request failure
get_request.fail(function() {
	window.location.assign("./mapviz.html");
});

// ------------ Add info of the tent ---------------- //
function add_info(data) {
	$("#tent_name").text("Tent: " + data["name"]);
	$("#tent_type").text("Type: " + data["type"]);
	var all_services = "Services: ";
	for (i=0; i<data["services"].length; i++) {
		all_services += data["services"][i] + ", ";
	}
	$("#service_list").text(all_services);
}

// ------------ Add actions if correct user ---------------- //
function add_actions(data) {
	var user_id = localStorage.getItem("uid");
	if (user_id === data["orgId"]) {
		// TODO add actions
	}
}

// ------------ Get tent stock ---------------- //
function get_stock(data) {
	var get_request = $.get(
		"https://archhack2016.herokuapp.com/stock", 
		{
			tentId: tent_id
		}
	);
	// Callback on get request success
	get_request.done(function(data) {
		// TODO add each to stock list with values - name, value, field, +/- button
	});
	// Callback on get request failure
	get_request.fail(function() {
		window.location.assign("./mapviz.html");
	});
}

// ------------ Update stock ---------------- //
function add_stock(type, amount) {
	// TODO insert/add to db
}

function use_stock(type, amount) {
	// TODO remove from db
}

// ------------ Utils ---------------- //
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}