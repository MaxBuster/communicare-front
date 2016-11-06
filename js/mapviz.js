var focus, map;

window.circles = {};
window.markers = {};

function initMap() {
  var post_request = $.get(
    "https://archhack2016.herokuapp.com/tents"
  );
  // Callback on post request success
  post_request.done(function(data) {
    console.log("Received Data");
    console.log(data[0]);
    makeMap(data);
  });
  // Callback on post request failure
  post_request.fail(function() {
    console.log("Request failed");
  });
}

function makeMap(data) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: focus = new google.maps.LatLng(38.648763, -90.310618),
    mapTypeId: 'satellite'
  });

  for (var i = 0, feature; feature = data[i]; i++) {
    addMarker(feature);
  }
}

function toggleMarker(service) {
  var post_request = $.get(
    "https://archhack2016.herokuapp.com/tents",
    {
      services:{$regex:service,$options:"i"}
    }
  );
  // Callback on post request success
  post_request.done(function(data) {
    console.log("Received Data");
    console.log(data);
    for(var key in data) {
      markers[data[key].id].setMap(!document.getElementById(service + "_box").checked ? null : map);
    }
  });
  // Callback on post request failure
  post_request.fail(function() {
    console.log("Request failed");
  });
}

function toggleCircle(name) {
   var post_request = $.get(
    "https://archhack2016.herokuapp.com/stock",
    {name:name}
  );
  // Callback on post request success
  post_request.done(function(data) {
    console.log("Received Data");
    console.log(data[0]);
    for (var i = 0, feature; feature = data[i]; i++) {
      if(!window.circles[feature.id]){
        var colors = {painkiller:"red", water:"blue", diaper:"green", icepack:"purple", food:"orange"};
        var circle = new google.maps.Circle({
          strokeColor: colors[name],
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: colors[name],
          fillOpacity: 0.35,
          map: null,
          center: markers[feature.tentId].position,
          radius: feature.quantity // TO DO
        });
        window.circles[feature.id] = circle;
      }
      console.log(!$("#" + name + "_box").checked);
      window.circles[feature.id].setMap(!document.getElementById(name + "_box").checked ? null : map);
    }
  });
  // Callback on post request failure
  post_request.fail(function() {
    console.log("Request failed");
  });
}

function addMarker(feature) {
  var iconBase = 'http://maps.google.com/mapfiles/kml/pal3/';
  var icons = {
    tent: {
      icon: iconBase + 'icon31.png'
    },
    hospital: {
      icon: iconBase + 'icon46.png'
    },
    info: {
      icon: iconBase + 'icon43.png'
    }
  };

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(feature.latitude, feature.longitude),
    icon: icons[feature.type].icon,
    map: map
  });
  
  var service_list = "";
  for (var child in feature.services) {
    service_list += '<p>' + feature.services[child] + '</p>';
  }
  var contentString = 
    '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">' + feature.name + '</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Services:</b></p>' + service_list +
      '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener("click", function() {
    infowindow.open(map, marker);
    // TODO open new window instead of opening popup?
  });

  window.markers[feature.id] = marker;
}