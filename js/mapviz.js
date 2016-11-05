var focus, map;

window.cityCircles = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: focus = new google.maps.LatLng(38.648763, -90.310618),
    mapTypeId: 'satellite'
  });

  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Tent A</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Supplies:</b></p>' + '<p>Water: 200</p>' + '<p>Blankets: 50</p>' +
    '<p>Antibiotics: 20</p>' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

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

  function addMarker(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
    marker.addListener("click", function(){ 
    infowindow.open(map, marker);
//    alert(feature.position);
    
    });
    
    var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: feature.position,
        radius: 100 // TO DO
      });
    window.cityCircles.push(cityCircle);
  }

  var features = [{
    position: new google.maps.LatLng(38.649502, -90.311161),
    type: 'info'
  }, {
    position: new google.maps.LatLng(38.648215, -90.311407),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.648208, -90.309035),
    type: 'hospital'
  }, {
    position: new google.maps.LatLng(38.649096, -90.309445),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.649541, -90.311933),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.648756, -90.311326),
    type: 'tent'
  }];

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }
  

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  
}

function toggleCityCircle() {
	window.cityCircles.forEach(function(cityCircle){
  	cityCircle.setMap(cityCircle.getMap() ? null : map);
  });
}


// figure out a way to pull data points for these??
function getPoints() {
  return [
    new google.maps.LatLng(38.642551, -90.315368),

  ];
}
