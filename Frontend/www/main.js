let autocomplete;
let apiKey = "eefe7d57de8f5f2e9189fc0ee2bae964";

let map;
var globalDate;
var globalData;
var globalIter;
var modIter;

$('.img_cond').hide();
$('.wind').hide();


function fillForecast(lat, lng) {
    var curentDate = new Date();
    console.log(new Date());
    console.log(curentDate.getHours());
    globalIter = defineIter(curentDate.getHours());
    console.log(globalIter);

    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&cnt=' + globalIter + '&units=metric&appid=' + apiKey, function (data) {

        modIter = globalIter % 8;
        if (globalIter === 40)
            modIter = 8;

        globalData = data;

        var k = 0;
        if (curentDate.getHours() >= 21)
            k = 1;

        $.getJSON('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=minutely,hourly,current&units=metric&appid=' + apiKey, function (dataD) {
            var date = new Date((dataD["daily"][0]["dt"]) * 1000);

            const tempSplit = date.toString().split(" ", 4);
            var dayOfWeek = tempSplit[0];
            var numberOfDate = tempSplit[2];
            var Month = tempSplit[1];
            $("#today-forecast").find(".Date").html(numberOfDate + " " + Month);
            $("#today-forecast").find(".city").html(data["city"]["name"]);
            $("#today-forecast").find(".temp").html(Math.round(dataD["daily"][0]["temp"]["day"]) + "<sup>o</sup>C");
            $("#today-forecast").find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (dataD["daily"][0]["weather"][0]["icon"]) + '@2x.png');
            $('.img_cond').show();
            // $("#day" + (i + 1)).find(".pop").html('<img src="images/icon-umberella.png" alt="">' + Math.round(100 * (dataD["daily"][i + k]["pop"])) + "%");
            $("#today-forecast").find(".wind").html('<img src="img/wind.svg" alt="">' + (dataD["daily"][0]["wind_speed"]) + "m/s");
            $('.wind').show();
            console.log(dayOfWeek + numberOfDate + Month);
            console.log("Date: " + date.toString());
        });

        modIter = globalIter % 8;
        if (globalIter == 40)
            modIter = 8;

        globalIter = defineIter(new Date().getHours());

        for (var i = 0; i < modIter; i++) {
            $("#time" + (8 - modIter + i) * 3).find(".temp").html(Math.round(globalData["list"][i]["main"]["temp"]) + "<sup>o</sup>C");
            // $("#time" + (8 - modIter + i) * 3).find(".pop").html("<img  src='images/icon-umberella.png' width=25>" + +Math.round(100 * (globalData["list"][i]["pop"])) + "%");
            $("#time" + (8 - modIter + i) * 3).find(".wind").html('<img src="images/icon-wind.png" alt="">' + (globalData["list"][i]["wind"]["speed"]) + "m/s");
            $("#time" + (8 - modIter + i) * 3).find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (globalData["list"][i]["weather"]["0"]["icon"]) + '@2x.png');
            console.log("This: " + i)

        }
    });
}


    // function currentPos() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const pos = {
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude,
    //                 };
    //
    //                 homeMarker.setPosition(pos);
    //                 homeMarker.setVisible(true);
    //                 console.log(pos);
    //                 map.setCenter(pos);
    //
    //                 var cur = document.getElementById('currentPlace');
    //                 new google.maps.Geocoder().geocode({
    //                     'latLng': new google.maps.LatLng(pos)
    //                 }, function (results, status) {
    //                     if (status === google.maps.GeocoderStatus.OK) {
    //                         console.log(results[0]);
    //                         cur.innerText = results[0].formatted_address;
    //                     }
    //                 });
    //
    //             },
    //             () => {
    //                 handleLocationError(true, infoWindow, map.getCenter());
    //             }
    //         );
    //     } else {
    //         // Browser doesn't support Geolocation
    //         handleLocationError(false, infoWindow, map.getCenter());
    //     }
    // }

function defineIter(hours) {
    if (hours < 3) {
        document.getElementById("time0").classList.add('d-none');
        return 39;
    }
    if (hours < 6 && hours >= 3) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        return 38;
    }
    if (hours < 9 && hours >= 6) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        document.getElementById("time6").classList.add('d-none');
        return 37;
    }
    if (hours < 12 && hours >= 9) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        document.getElementById("time6").classList.add('d-none');
        document.getElementById("time9").classList.add('d-none');
        return 36;
    }
    if (hours < 15 && hours >= 12) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        document.getElementById("time6").classList.add('d-none');
        document.getElementById("time9").classList.add('d-none');
        document.getElementById("time12").classList.add('d-none');
        return 35;
    }
    if (hours < 18 && hours >= 15) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        document.getElementById("time6").classList.add('d-none');
        document.getElementById("time9").classList.add('d-none');
        document.getElementById("time12").classList.add('d-none');
        document.getElementById("time15").classList.add('d-none');
        return 34;
    }
    if (hours < 21 && hours >= 18) {
        document.getElementById("time0").classList.add('d-none');
        document.getElementById("time3").classList.add('d-none');
        document.getElementById("time6").classList.add('d-none');
        document.getElementById("time9").classList.add('d-none');
        document.getElementById("time12").classList.add('d-none');
        document.getElementById("time15").classList.add('d-none');
        document.getElementById("time18").classList.add('d-none');
        return 33;
    }
    if (hours <= 24) {
        return 40;
    }

}


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
                        var cur = document.getElementById('currentPlace');
                        new google.maps.Geocoder().geocode({
                            'latLng': new google.maps.LatLng(pos)
                        }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                console.log(results[0]);
                                ad.value = results[0].formatted_address;
                                cur.innerText = results[0].formatted_address;
                            }
                        });

                        fillForecast(pos.lat, pos.lng);
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

                fillForecast(lat, lng);

            } else {
            }

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

                    fillForecast(lat, lng);

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




