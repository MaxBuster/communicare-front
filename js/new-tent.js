var services = [];
var servicesUpper = [];
var cLoc;

function submit() {
    var orgId = '69b00a4fff6cb87b';
    var name = $('#name').val();
    var type = $('#type').val();
    var lat = cLoc.latitude;
    var long = cLoc.longitude;

    if(orgId.length && name.length && type.length) {
        var payload = {
            // TODO: Fix orgId!?!?!
            orgId: orgId,
            name: name,
            type: type,
            services: services,
            latitude: lat,
            longitude: long
        };
        console.log(payload);

        var post_request = $.post(
            "https://archhack2016.herokuapp.com/tents", // Url to post org details to
            payload
        );
        // Callback on post request success
        post_request.done(function() {
            alert("New tent added!");
        });
        // Callback on post request failure
        post_request.fail(function() {
            alert("New tent failed to add.");
        });
    }
}

function addService() {
    var service = $('#service').val();
    $('#service').val('');

    if(service.length > 0 && servicesUpper.indexOf(service.toUpperCase()) == -1) {
        services.push(service);
        servicesUpper.push(service.toUpperCase());
    }

    var servicesString = "";
    for (var i = 0; i < services.length; i++) {
        servicesString += services[i] + '\n';
    }
    $('#services').val(servicesString);
}

var locationPicker = $('#somecomponent').locationpicker({
    zoom:17,
    location: {
        latitude: 38.648434,
        longitude: -90.311079
    },
    radius: 10,
    inputBinding: {
        latitudeInput: $('#us6-lat'),
        longitudeInput: $('#us6-lon'),
        radiusInput: $('#us6-radius'),
        locationNameInput: $('#us6-address')
    },
    mapTypeId: 'satellite',
    markerInCenter: true,
    enableAutocomplete: true,
    onchanged: function(currentLocation, radius, isMarkerDropped) {
        cLoc = currentLocation;
    }
});