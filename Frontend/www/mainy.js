let autocomplete;


let map;
var globalDate;
var globalData;
var globalI;
var modI;

function getNfillForecast(lat, lng) {
    var curentDate = new Date();
    console.log(new Date());
    console.log(curentDate.getHours());
    globalI = defineIter(curentDate.getHours());
    console.log(globalI);




    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&cnt=' + globalI + '&units=metric&appid=f1c4ea79129faeebfbac6455394d7b12', function (data) {

        modI = globalI % 8;
        if (globalI == 40)
            modI = 8;


        globalData = data;


        var k = 0;
        if (curentDate.getHours() >= 21)
            k = 1;

        $.getJSON('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lng + '&exclude=minutely,hourly,current&units=metric&appid=f1c4ea79129faeebfbac6455394d7b12', function (dataD) {
            for (var i = 0; i < 5; i++) {
                var date = new Date((dataD["daily"][i + k]["dt"]) * 1000);

                const tempSplit = date.toString().split(" ", 4);
                var dayOfWeek = tempSplit[0];
                var numberOfDate = tempSplit[2];
                var Month = tempSplit[1];
                $("#day" + (i + 1)).find(".day").html(dayOfWeek);
                $("#day" + (i + 1)).find(".date").html(numberOfDate + " " + Month);
                $("#day" + (i + 1)).find(".location").html(data["city"]["name"]);
                $("#day" + (i + 1)).find(".num").html(Math.round(dataD["daily"][i + k]["temp"]["day"]) + "<sup>o</sup>C");
                $("#day" + (i + 1)).find(".condition").attr("src", 'http://openweathermap.org/img/wn/' + (dataD["daily"][i + k]["weather"]["0"]["icon"]) + '@2x.png');
                $("#day" + (i + 1)).find(".pop").html('<img src="images/icon-umberella.png" alt="">' + Math.round(100 * (dataD["daily"][i + k]["pop"])) + "%");
                $("#day" + (i + 1)).find(".wind").html('<img src="images/icon-wind.png" alt="">' + (dataD["daily"][i + k]["wind_speed"]) + "m/s");
                console.log(dayOfWeek + numberOfDate + Month);
                console.log("Date: " + date.toString());

            };

        });

        $("#day1").trigger("click");
        var x = document.querySelector(".forecast-table");
        const style = getComputedStyle(x).display;

        console.log(style);
        if (style == "none") {
            $(".forecast-table").slideToggle("slow", function () {
                // Animation complete.
            });
            $(".time-for").slideToggle("slow", function () {
                // Animation complete.
            });
        }



    });

}



$(".forecast").click(function () {
    var ID = $(this).attr("id");
    var prev = $(".forecast-container").find(".today").attr("id");

    $("#" + prev).removeClass("today");
    $("#" + prev).find("span").addClass("invisible");
    $("#" + prev).find(".day").addClass("d-none");
    $("#" + prev).find(".location").addClass("invisible");
    $(this).find("span").removeClass("invisible");
    $(this).find(".day").removeClass("d-none");
    $(this).find(".location").removeClass("invisible");
    $(this).addClass("today");
    const tempSplit = (ID).split("day", 2);
    var numberOfDay = tempSplit[1];



    modI = globalI % 8;
    if (globalI == 40)
        modI = 8;

    globalI = defineIter(new Date().getHours());
    if (numberOfDay == 1)
        for (var i = 0; i < modI; i++) {
            $("#time" + (8 - modI + i) * 3).find(".temp").html("<img  src='images/icons/temp.svg' width=25>" + Math.round(globalData["list"][i]["main"]["temp"]) + "<sup>o</sup>C");
            $("#time" + (8 - modI + i) * 3).find(".pop").html("<img  src='images/icon-umberella.png' width=25>" + +Math.round(100 * (globalData["list"][i]["pop"])) + "%");
            $("#time" + (8 - modI + i) * 3).find(".wind").html('<img src="images/icon-wind.png" alt="">' + (globalData["list"][i]["wind"]["speed"]) + "m/s");
            $("#time" + (8 - modI + i) * 3).find(".description").html((globalData["list"][i]["weather"]["0"]["description"]));
            $("#time" + (8 - modI + i) * 3).find(".condition").attr("src", 'http://openweathermap.org/img/wn/' + (globalData["list"][i]["weather"]["0"]["icon"]) + '@2x.png');
            console.log("This: " + i)

        }
    else {
        $("#time0, #time3, #time6, #time9, #time12, #time15, #time18, #time21").removeClass('d-none');

        for (var i = modI + 8 * (numberOfDay - 2); i < modI + 8 * (numberOfDay - 1); i++) {
            $("#time" + (i - modI - 8 * (numberOfDay - 2)) * 3).find(".temp").html("<img  src='images/icons/temp.svg' width=25>" + Math.round(globalData["list"][i]["main"]["temp"]) + "<sup>o</sup>C");
            $("#time" + (i - modI - 8 * (numberOfDay - 2)) * 3).find(".pop").html("<img  src='images/icon-umberella.png' width=25>" + +Math.round(100 * (globalData["list"][i]["pop"])) + "%");
            $("#time" + (i - modI - 8 * (numberOfDay - 2)) * 3).find(".wind").html('<img src="images/icon-wind.png" alt="">' + (globalData["list"][i]["wind"]["speed"]) + "m/s");
            $("#time" + (i - modI - 8 * (numberOfDay - 2)) * 3).find(".description").html((globalData["list"][i]["weather"]["0"]["description"]));
            $("#time" + (i - modI - 8 * (numberOfDay - 2)) * 3).find(".condition").attr("src", 'http://openweathermap.org/img/wn/' + (globalData["list"][i]["weather"]["0"]["icon"]) + '@2x.png');
            console.log("This: " + i)

        }

    }
});
document.getElementById("time0").classList.remove('d-none');
document.getElementById("time3").classList.remove('d-none');
document.getElementById("time6").classList.remove('d-none');
document.getElementById("time9").classList.remove('d-none');
document.getElementById("time12").classList.remove('d-none');
document.getElementById("time15").classList.remove('d-none');
document.getElementById("time18").classList.remove('d-none');

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



    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('inputAddress'), {
            types: ["geocode"],

        }
    );
    places = new google.maps.places.PlacesService(map);
    autocomplete.addListener("place_changed", onPlaceChanged);

    document.getElementById("inputAddress").addEventListener("change", onPlaceChanged);

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
        var ad = document.getElementById('inputAddress');
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
                console.log("РќРµРјР°С”Р°РґСЂРµСЃРё")
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
