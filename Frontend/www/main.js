let autocomplete;


let map;
var globalDate;
var globalData;
var globalI;
var modI;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 50.464379,
            lng: 30.519131
        },
        zoom: 15,
    });
    var startPoint = new google.maps.LatLng(50.464379, 30.519131);

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    homeMarker.setPosition(pos);
                    homeMarker.setVisible(true);
                    console.log(pos);
                    map.setCenter(pos);

                    var ad = document.getElementById('input_address');
                    new google.maps.Geocoder().geocode({
                        'latLng': new google.maps.LatLng(pos)
                    }, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results[0]);
                            ad.value = results[0].formatted_address;
                        }
                    });

                    getNfillForecast(pos.lat, pos.lng);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }


    });

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('input_address'), {
            types: ["geocode"],

        }
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener("place_changed", onPlaceChanged);

    document.getElementById("input_address").addEventListener("change", onPlaceChanged);

    var homeMarker = new google.maps.Marker({
        position: startPoint,
        map: map,
    });
    homeMarker.setVisible(false);

    function onPlaceChanged() {
        const place = autocomplete.getPlace();
        homeMarker.setPosition(place.geometry.location);
        homeMarker.setVisible(true);
        console.log(place);
        if (place.geometry && place.geometry.location) {
            map.panTo(place.geometry.location);
            map.setZoom(15);
            directionsDisplay.setMap(map);

            const latlngStr = JSON.parse(JSON.stringify(place.geometry.location));

            const lat = latlngStr.lat;
            const lng = latlngStr.lng;


            console.log(JSON.stringify(place.geometry.location));
            console.log(lat);
            console.log(lng);

            getNfillForecast(lat, lng);

        } else {}

    }


    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    google.maps.event.addListener(map, 'click', function (me) {

        var coordinates = me.latLng;
        var ad = document.getElementById('input_address');
        geocodeLatLng(coordinates, function (err, adress) {
            if (!err) {
                var point = coordinates;
                homeMarker.setPosition(point);
                homeMarker.setVisible(true);
                ad.value = adress;
                console.log(adress);

                directionsDisplay.setMap(map);

                const latlngStr = JSON.parse(JSON.stringify(coordinates));

                const lat = latlngStr.lat;
                const lng = latlngStr.lng;


                console.log(JSON.stringify(coordinates));
                console.log(lat);
                console.log(lng);

                getNfillForecast(lat, lng);

            } else {
                console.log("Немає адреси")
            }
        })



        function geocodeAddress(adress, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    var coordinates = results[0].geometry.location;
                    callback(null, coordinates);
                } else {
                    callback(new Error("Can not find the adress"));
                }
            });
        }
    });

    function geocodeLatLng(latlng, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[1]) {
                var adress = results[1].formatted_address;
                callback(null, adress);
            } else {
                callback(new Error("Can't find adress"));
            }
        });
    }
}
