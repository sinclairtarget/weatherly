showLoading = function() {
    $(".loading-indicator").show();
    $(".results").hide();
}

showResults = function(periods) {
    $(".loading-indicator").hide();
    $(".results").show();
    console.log(periods);
}

fetchWeather = function() {
    url = "http://api.aerisapi.com/forecasts/11101?client_id=7YerZwAFYOYbaKl59822u&client_secret=qgBnkFBZbBC4LtTs5qtuM46G6khNfH6e7QODCFyD"
    $.ajax({
        url: url,
        method: "GET"
    }).done(function(result) {
        if (result["success"] != true)
            console.log(result["error"]);

        showResults(result["response"][0]["periods"]);
    }).fail(function(err) {
        throw err;
    });
}

$(function() {
    fetchWeather();
});
