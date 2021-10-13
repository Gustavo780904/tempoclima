$(document).ready(function () {
    insertGoogleScript();
})
var latitude;
var longitude;
var local;


//Requisição do clima
function requestDarksky() {

    var api_call = `https://api.darksky.net/forecast/8eeafa93fa171bb970bfac9b03caa3a3/${latitude},${longitude}?exclude=minutely,hourly,daily,flags,alerts`;
    console.log("==>sky")

    $.get(api_call, function (data) {
        console.log(data);
        exibeTabela(data);
        trocaIcon(data);
    })
}

// PARTE DO GOOGLE:
function insertGoogleScript() {

    console.log("==>script")

    var google_api = document.createElement('script'),
        api_key = 'CHAVECHAVECHAVECHAVECHAVECHAVECHAVECHAVE';
    // Inject the script for Google's API and reference the initGoogleAPI
    // function as a callback.
    google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
    document.body.appendChild(google_api);
}

// SearchBox Method
function initGoogleAPI() {
    console.log("==>teste")
    var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));
    autocomplete.addListener('places_changed', function () {
        var place = autocomplete.getPlaces()[0];
        latitude = place.geometry.location.lat();
        console.log("A= " + latitude);
        longitude = place.geometry.location.lng();
        console.log("A= " + longitude);
        local = $('#city-search').val()
        console.log($('#city-search').val());

    });
}
function trocaIcon(data) {
    $("#icon").removeClass();

    switch (data.currently.icon) {

        case "clear-day":
            $("#icon").addClass("wi wi-day-sunny icons")
            break;
        case "clear-night":
            $("#icon").addClass("wi wi-night-clear icons")
            break;
        case "cloudy":
            $("#icon").addClass("wi wi-cloudy icons")
            break;
        case "fog":
            $("#icon").addClass("wi wi-fog icons")
            break;
        case "partly-cloudy-day":
            $("#icon").addClass("wi wi-day-cloudy icons")
            break;
        case "partly-cloudy-night":
            $("#icon").addClass("wi wi-night-alt-cloudy icons")
            break;
        case "rain":
            $("#icon").addClass("wi wi-rain icons")
            break;
        case "sleet":
            $("#icon").addClass("wi wi-sleet icons")
            break;
        case "snow":
            $("#icon").addClass("wi wi-snow icons")
            break;
        case "wind":
            $("#icon").addClass("wi wi-windy icons")
            break;
        default:
            break;
    }
}
function exibeTabela(data) {

    $("#local").html(local);
    $("#lat").html(data.latitude);
    $("#long").html(data.longitude);
    $("#hora").html(data.currently.time);
    $("#resumo").html(data.currently.summary);
    $("#intensi").html(data.currently.precipIntensity);
    $("#probabi").html(data.currently.precipProbability);
    $("#temp").html(data.currently.temperature);
    $("#sensaTerm").html(data.currently.apparentTemperature);
    $("#pontoOrv").html(data.currently.dewPoint);
    $("#umid").html(data.currently.humidity);
    $("#press").html(data.currently.pressure);
    $("#velocid").html(data.currently.windSpeed);
    $("#rajada").html(data.currently.windGust);
    $("#direc").html(data.currently.windBearing);
    $("#cobertura").html(data.currently.cloudCover);
    $("#uv").html(data.currently.uvIndex);
    $("#visib").html(data.currently.visibility);
    $("#oz").html(data.currently.ozone);
    $("#desloc").html(data.offset);

}
function limpar() {
    $("#local").html("");
    $("#lat").html("");
    $("#long").html("");
    $("#hora").html("");
    $("#resumo").html("");
    $("#intensi").html("");
    $("#probabi").html("");
    $("#temp").html("");
    $("#sensaTerm").html("");
    $("#pontoOrv").html("");
    $("#umid").html("");
    $("#press").html("");
    $("#velocid").html("");
    $("#rajada").html("");
    $("#direc").html("");
    $("#cobertura").html("");
    $("#uv").html("");
    $("#visib").html("");
    $("#oz").html("");
    $("#desloc").html(""); 
    $('#city-search').val("");
    $("#icon").removeClass();
    longitude = "";
    latitude = "";
}

