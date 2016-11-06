var focus, map;

window.supplyCircles = [];
window.patientCircles = [];

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
    marker.addListener("click", function() {
      infowindow.open(map, marker);
      //    alert(feature.position);

    });

    var supplyCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: feature.position,
      radius: 80 // TO DO
    });
    window.supplyCircles.push(supplyCircle);

    var patientCircle = new google.maps.Circle({
      strokeColor: '#6199d8',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#6199d8',
      fillOpacity: 0.35,
      map: map,
      center: feature.position,
      radius: 100 // TO DO
    });
    window.patientCircles.push(patientCircle);
  }

  var features = [{
    position: new google.maps.LatLng(38.649502, -90.311161),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.648215, -90.311407),
    type: 'tent'
  },{
    position: new google.maps.LatLng(38.640215, -90.313407),
    type: 'tent'
  },{
    position: new google.maps.LatLng(38.647215, -90.311607),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.647215, -90.312007),
    type: 'tent'
  },{
    position: new google.maps.LatLng(38.649808, -90.309035),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.649096, -90.309445),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.649541, -90.311933),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.648756, -90.311326),
    type: 'tent'
  }, {
    position: new google.maps.LatLng(38.650215, -90.311411),
    type: 'tent'
  }];

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }
}


function toggleSupplyCircle() {
  window.supplyCircles.forEach(function(supplyCircle) {
    supplyCircle.setMap(supplyCircle.getMap() ? null : map);
  });
}

function togglePatientCircle() {
  window.patientCircles.forEach(function(patientCircle) {
    patientCircle.setMap(patientCircle.getMap() ? null : map);
  });

}

