let autocomplete;
let apiKeyForWeather = "eefe7d57de8f5f2e9189fc0ee2bae964";

let map;
var globalDate;
var globalData;
var globalIter;
var iter;

var celsii = true;
var latD;
var lngD;

$('.img_cond').hide();
$('.wind').hide();
$('.item_cloth').hide();


$("#farengheight").on('click', function(e) {
    $("#celsii").removeClass("active");
    $(this).addClass('active');
    $(this).css({
        "background": "#4A868E",
        "color": "white"
    });
    $("#celsii").css({
        "background": "#a3cdd3",
        "color": "white"
    });
    celsii = false;
    fillForecastForFarengheight(latD, lngD);
})
$("#celsii").on('click', function(e) {
    $("#farengheight").removeClass("active");
    $(this).addClass('active');
    $(this).css({
        "background": "#4A868E",
        "color": "white"
    });
    $("#farengheight").css({
        "background": "#a3cdd3",
        "color": "white"
    });
    celsii = true;
    fillForecastForCelsii(latD, lngD);
})


function fillForecastForCelsii(lat, lng) {
    var curentDate = new Date();
    console.log(new Date());
    console.log(curentDate.getHours());
    globalIter = defineWhatHoursShow(curentDate.getHours());
    console.log(globalIter);

    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&cnt=' + globalIter + '&units=metric&appid=' + apiKeyForWeather, function (data) {

        iter = globalIter % 8;
        if (globalIter === 40)
            iter = 8;

        globalData = data;

        var k = 0;
        if (curentDate.getHours() >= 21)
            k = 1;

        $.getJSON('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=minutely,hourly,current&units=metric&appid=' + apiKeyForWeather, function (dataD) {
            var date = new Date((dataD["daily"][0]["dt"]) * 1000);

            const tempSplit = date.toString().split(" ", 4);
            var dayOfWeek = tempSplit[0];
            var numberOfDate = tempSplit[2];
            var Month = tempSplit[1];
            $("#today-forecast").find(".Date").html(numberOfDate + " " + Month);
            $("#today-forecast").find(".city").html(data["city"]["name"]);
            $("#today-forecast").find(".temp").html(Math.round(dataD["daily"][0]["temp"]["day"]) + "°C");
            $("#today-forecast").find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (dataD["daily"][0]["weather"][0]["icon"]) + '@2x.png');
            $('.img_cond').show();
            $("#today-forecast").find(".wind").html('<img src="img/wind.svg" alt="">' + '<br>' + (dataD["daily"][0]["wind_speed"]) + "m/s");
            $('.wind').show();

            suggestOutlook(Math.round(dataD["daily"][0]["temp"]["day"]), dataD["daily"][0]["weather"][0]["icon"]);
            
            console.log(dayOfWeek + numberOfDate + Month);
            console.log("Date: " + date.toString());
        });

        iter = globalIter % 8;
        if (globalIter == 40)
            iter = 8;

        globalIter = defineWhatHoursShow(new Date().getHours());

        for (var i = 0; i < iter; i++) {
            $("#time" + (8 - iter + i) * 3).find(".temp").html(Math.round(globalData["list"][i]["main"]["temp"]) + "°C");
            // $("#time" + (8 - modIter + i) * 3).find(".pop").html("<img  src='images/icon-umberella.png' width=25>" + +Math.round(100 * (globalData["list"][i]["pop"])) + "%");
            $("#time" + (8 - iter + i) * 3).find(".wind").html('<img src="img/wind.svg" style="width: 45px; height: 45px" alt="">' + (globalData["list"][i]["wind"]["speed"]) + "m/s");
            $("#time" + (8 - iter + i) * 3).find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (globalData["list"][i]["weather"]["0"]["icon"]) + '@2x.png');
            console.log("This: " + i)
        }
    });
}


function fillForecastForFarengheight(lat, lng) {
    var curentDate = new Date();
    console.log(new Date());
    console.log(curentDate.getHours());
    globalIter = defineWhatHoursShow(curentDate.getHours());
    console.log(globalIter);

    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&cnt=' + globalIter + '&units=imperial&appid=' + apiKeyForWeather, function (data) {

        iter = globalIter % 8;
        if (globalIter === 40)
            iter = 8;

        globalData = data;

        var k = 0;
        if (curentDate.getHours() >= 21)
            k = 1;

        $.getJSON('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=minutely,hourly,current&units=imperial&appid=' + apiKeyForWeather, function (dataD) {
            var date = new Date((dataD["daily"][0]["dt"]) * 1000);

            const tempSplit = date.toString().split(" ", 4);
            var dayOfWeek = tempSplit[0];
            var numberOfDate = tempSplit[2];
            var Month = tempSplit[1];
            $("#today-forecast").find(".Date").html(numberOfDate + " " + Month);
            $("#today-forecast").find(".city").html(data["city"]["name"]);
            $("#today-forecast").find(".temp").html(Math.round(dataD["daily"][0]["temp"]["day"]) + "°F");
            $("#today-forecast").find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (dataD["daily"][0]["weather"][0]["icon"]) + '@2x.png');
            $('.img_cond').show();
            $("#today-forecast").find(".wind").html('<img src="img/wind.svg" alt="">' + '<br>' + (dataD["daily"][0]["wind_speed"]) + "mph");
            $('.wind').show();

            suggestOutlook((Math.round(dataD["daily"][0]["temp"]["day"])-32)/1.8, dataD["daily"][0]["weather"][0]["icon"]);

            console.log(dayOfWeek + numberOfDate + Month);
            console.log("Date: " + date.toString());
        });

        iter = globalIter % 8;
        if (globalIter === 40)
            iter = 8;

        globalIter = defineWhatHoursShow(new Date().getHours());

        for (var i = 0; i < iter; i++) {
            $("#time" + (8 - iter + i) * 3).find(".temp").html(Math.round(globalData["list"][i]["main"]["temp"]) + "°F");
            // $("#time" + (8 - modIter + i) * 3).find(".pop").html("<img  src='images/icon-umberella.png' width=25>" + +Math.round(100 * (globalData["list"][i]["pop"])) + "%");
            $("#time" + (8 - iter + i) * 3).find(".wind").html('<img src="img/wind.svg" style="width: 45px; height: 45px" alt="">' + (globalData["list"][i]["wind"]["speed"]) + "mph");
            $("#time" + (8 - iter + i) * 3).find(".img_cond").attr("src", 'http://openweathermap.org/img/wn/' + (globalData["list"][i]["weather"]["0"]["icon"]) + '@2x.png');
            console.log("This: " + i)
        }
    });
}


function defineWhatHoursShow(hours) {
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


    window.onload = function () {
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

                    var cur = document.getElementById('currentPlace');
                    new google.maps.Geocoder().geocode({
                        'latLng': new google.maps.LatLng(pos)
                    }, function (results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            console.log(results[0]);
                            cur.innerText = results[0].formatted_address;
                        }
                    });
                    if(celsii === true){
                        latD = pos.lat;
                        lngD = pos.lng;
                        fillForecastForCelsii(pos.lat, pos.lng);
                    }

                    else{
                        latD = pos.lat;
                        lngD = pos.lng;
                        fillForecastForFarengheight(pos.lat, pos.lng);
                    }
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }


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

                    if(celsii === true){
                        latD = pos.lat;
                        lngD = pos.lng;
                        fillForecastForCelsii(pos.lat, pos.lng);
                    }

                    else{
                        latD = pos.lat;
                        lngD = pos.lng;
                        fillForecastForFarengheight(pos.lat, pos.lng);
                    }
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
    autocomplete.addListener("place_changed", whenPlaceChanged);

    document.getElementById("input_address").addEventListener("change", whenPlaceChanged);

    var homeMarker = new google.maps.Marker({
        position: startPoint,
        map: map,
    });
    homeMarker.setVisible(false);

    function whenPlaceChanged() {
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

            if(celsii === true){
                latD = lat;
                lngD = lng;
                fillForecastForCelsii(lat, lng);
            }

            else{
                latD = lat;
                lngD = lng;
                fillForecastForFarengheight(lat, lng);
            }

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

                if(celsii === true){
                    latD = lat;
                    lngD = lng;
                    fillForecastForCelsii(lat, lng);
                }

                else{
                    latD = lat;
                    lngD = lng;
                    fillForecastForFarengheight(lat, lng);
                }

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


function suggestOutlook(degree, weather_cond) {
    var dress = Math.floor(Math.random() * 5);
    var t_shirt = Math.floor(Math.random() * 5);
    var jeans = Math.floor(Math.random() * 3);
    var trousers = Math.floor(Math.random() * 4);
    var shorts = Math.floor(Math.random() * 4);
    var hudi = Math.floor(Math.random() * 6);
    var outwear = Math.floor(Math.random() * 4);
    var shirt = Math.floor(Math.random() * 3);

    if (degree <= -10) {
        $('.item_cloth').show();

        $(".clothes-box-boy").find("#item_cloth_hat_M").attr("src", "clothes/Accessories/hat M1.3.jpg");
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/winter M1.1.jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/hudi M1." + hudi + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/trousers M1." + trousers + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.4.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.3.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/winter F1.1.jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/hudi F1." + hudi + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/trousers F1." + trousers + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.6.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= -5 && degree > -10) {
        $('.item_cloth').show();

        $(".clothes-box-boy").find("#item_cloth_hat_M").attr("src", "clothes/Accessories/hat M1.3.jpg");
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/winter M1.2.jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/hudi M1." + hudi + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/jeans M1." + jeans + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.4.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.3.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/winter F1.2.jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/hudi F1." + hudi + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/trousers F1." + trousers + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.6.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= 0 && degree > -5) {
        $('.item_cloth').show();

        $(".clothes-box-boy").find("#item_cloth_hat_M").attr("src", "clothes/Accessories/hat M1.3.jpg");
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/winter M1.3.jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/hudi M1." + hudi + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/jeans M1." + jeans + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.4.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.3.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/winter F1.3.jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/hudi F1." + hudi + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/trousers F1." + trousers + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.6.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= 5 && degree > 0) {
        $('.item_cloth').show();

        $("#item_cloth_hat_M").hide();
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/winter M1.3.jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/hudi M1." + hudi + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/trousers M1." + trousers + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.4.jpg");
        $("#weather_cond_M").hide();

        $("#item_cloth_hat_F").hide();
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/winter F1.3.jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/hudi F1." + hudi + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/jeans F1." + jeans + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.3.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= 10 && degree > 5) {
        $('.item_cloth').show();

        $("#item_cloth_hat_M").hide();
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/motojacket M.jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/shirt M1." + shirt + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/trousers M1." + trousers + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.1.jpg");
        $("#weather_cond_M").hide();

        $("#item_cloth_hat_F").hide();
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/motojacket F.jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/shirt F1." + shirt + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/jeans F1." + jeans + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.1.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= 15 && degree > 10) {
        $('.item_cloth').show();

        $("#item_cloth_hat_M").hide();
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/outwear M1." + outwear + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/shirt M1." + shirt + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/jeans M1." + jeans + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.1.jpg");
        $("#weather_cond_M").hide();

        $("#item_cloth_hat_F").hide();
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/outwear F1." + outwear + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/shirt F1." + shirt + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/jeans F1." + jeans + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.2.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree <= 20 && degree > 15) {
        $('.item_cloth').show();

        $("#item_cloth_hat_M").hide();
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/outwear M1." + outwear + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/t-shirt M1." + t_shirt + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/trousers M1." + trousers + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.2.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.2.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/outwear F1." + outwear + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/t-shirt F1." + t_shirt + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/jeans F1." + jeans + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.2.jpg");
        $("#weather_cond_F").hide();
    }
    if (degree <= 25 && degree > 20) {
        $('.item_cloth').show();

        $(".clothes-box-boy").find("#item_cloth_hat_M").attr("src", "clothes/Accessories/hat M1.1.jpg");
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/outwear M1." + outwear + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/t-shirt M1." + t_shirt + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/shirts M1." + shorts + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.3.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.1.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/outwear F1." + outwear + ".jpg")
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/t-shirt F1." + t_shirt + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_bottom_F").attr("src", "clothes/Trousers/shirts F1." + shorts + ".jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.4.jpg");
        $("#weather_cond_F").hide();

    }
    if (degree > 25) {

        $('.item_cloth').show();

        $(".clothes-box-boy").find("#item_cloth_hat_M").attr("src", "clothes/Accessories/hat M1.2.jpg");
        $("#item_cloth_outerwear_M").hide();
        $(".clothes-box-boy").find("#item_cloth_top_M").attr("src", "clothes/Undercoats/t-shirt M1." + t_shirt + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_bottom_M").attr("src", "clothes/Trousers/shirts M1." + shorts + ".jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/shoes M1.3.jpg");
        $("#weather_cond_M").hide();

        $(".clothes-box-girl").find("#item_cloth_hat_F").attr("src", "clothes/Accessories/hat F1.1.jpg");
        $("#item_cloth_outerwear_F").hide();
        $(".clothes-box-girl").find("#item_cloth_top_F").attr("src", "clothes/Undercoats/dress F1." + dress + ".jpg");
        $("#item_cloth_bottom_F").hide();
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/shoes F1.5.jpg");
        $("#weather_cond_F").hide();

    }

    rainny(weather_cond);
    sunny(degree, weather_cond);

}

function rainny(weather_cond) {
    if (weather_cond === "09d" || weather_cond === "10d" || weather_cond === "09n" || weather_cond === "10n") {
        $("#weather_cond_F").show();
        $(".clothes-box-girl").find("#weather_cond_F").attr("src", "clothes/Accessories/umbrella.jpg");
        
        $("#weather_cond_M").show();
        $(".clothes-box-boy").find("#weather_cond_M").attr("src", "clothes/Accessories/umbrella.jpg");
        
    } if (weather_cond === "11d" || weather_cond === "11n") {
        
        $("#weather_cond_M").show();
        $(".clothes-box-boy").find("#weather_cond_M").attr("src", "clothes/Accessories/umbrella.jpg");
        $(".clothes-box-boy").find("#item_cloth_outerwear_M").attr("src", "clothes/Outerwear/raincoat M.jpg");
        $(".clothes-box-boy").find("#item_cloth_shoes_M").attr("src", "clothes/Shoes/boots M.jpg");
        
        $("#weather_cond_F").show();
        $(".clothes-box-girl").find("#weather_cond_F").attr("src", "clothes/Accessories/umbrella.jpg");
        $(".clothes-box-girl").find("#item_cloth_outerwear_F").attr("src", "clothes/Outerwear/raincoat F.jpg");
        $(".clothes-box-girl").find("#item_cloth_shoes_F").attr("src", "clothes/Shoes/boots F.jpg");

    }
}

function sunny(degree, weather_cond) {
    if (weather_cond === "01d") {
        if (degree >= 15) {
            $("#weather_cond_M").show();
            $(".clothes-box-boy").find("#weather_cond_M").attr("src", "clothes/Accessories/sunglasses M.jpg");

            $("#weather_cond_F").show();
            $(".clothes-box-girl").find("#weather_cond_F").attr("src", "clothes/Accessories/sunglasses F.jpg");
        }
    }
}
