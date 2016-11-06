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
	var actions = add_actions(data);
	get_stock(actions);
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
	for (i=0; i<data["services"].length-1; i++) {
		all_services += data["services"][i] + ", ";
	}
	all_services += data["services"][data["services"].length-1];
	$("#service_list").text(all_services);
}

// ------------ Add actions if correct user ---------------- //
function add_actions(data) {
	var user_id = localStorage.getItem("uid");
	if (user_id === data["orgId"]) {
		document.getElementById("add_new_stock").innerHTML = '<h3>Add New Stock</h3>Name: <input type="text" class="form-control" id="stock_name" /> Initial Quantity: <input type="text" class="form-control" id="initial_quantity" /><br> <input type="submit" class="form-control" value="Submit" onclick="add_new_stock();">';
		return true;
	} else {
		return false;
	}
}

// ------------ Get tent stock ---------------- //
function get_stock(actions) {
	var get_request = $.get(
		"https://archhack2016.herokuapp.com/stock", 
		{
			tentId: tent_id
		}
	);
	// Callback on get request success
	get_request.done(function(data) {
		var stock = "<h3>Supplies</h3>";
		for (i=0; i<data.length; i++) {
			stock += "<p>"+data[i]["name"]+": "+data[i]["quantity"]+"</p>";
			if (actions) {
				stock += '<input type="text" id="' + data[i]["id"] + '">';
				stock += '<input type="submit" value="-" onclick="use_stock(\'' + data[i]["id"] + '\', ' + data[i]["quantity"]+');">'; 
				stock += '<input type="submit" value="+" onclick="add_stock(\'' + data[i]["id"] + '\', ' + data[i]["quantity"]+');"><br>';
			} else {
				stock += "<br>";
			}
		}
		console.log(stock);
		document.getElementById("stock_list").innerHTML = stock;
	});
	// Callback on get request failure
	get_request.fail(function() {
		window.location.assign("./mapviz.html");
	});
}

// ------------ Update stock ---------------- //
function add_stock(stock_id, quantity) {
	var amount = document.getElementById(stock_id).value;
	var total = quantity+amount;
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/stock", // Url to post org details to
		{
			id: stock_id,
			quantity: total
		}
	);
	// Callback on post request success
	post_request.done(function() {
		location.reload();
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Stock change failed");
	});
}

function use_stock(stock_id, quantity) {
	var amount = document.getElementById(stock_id).value;
	var total = quantity-amount;
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/stock", // Url to post org details to
		{
			id: stock_id,
			quantity: total
		}
	);
	// Callback on post request success
	post_request.done(function() {
		location.reload();
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Stock change failed");
	});
}

function add_new_stock() {
	var stock_name = document.getElementById("stock_name").value;
	var quantity = document.getElementById("initial_quantity").value;
	var team_id = getURLParameter("id");
	var org_id = localStorage.getItem("uid");
	var post_request = $.post(
		"https://archhack2016.herokuapp.com/stock", // Url to post org details to
		{
			orgId: org_id,
			tentId: team_id,
			name: stock_name,
			quantity: quantity
		}
	);
	// Callback on post request success
	post_request.done(function() {
		location.reload();
	});
	// Callback on post request failure
	post_request.fail(function() {
		alert("Stock add failed");
	});
}

// ------------ Utils ---------------- //
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}