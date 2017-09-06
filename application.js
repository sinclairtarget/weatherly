// Adds a new cell to the table row identified by the given class.
// New cells are added by cloning the hidden prototype cell.
addRowCell = function(rowClass) {
    return $(rowClass + " .prototype").clone()
                                      .removeClass("prototype")
                                      .appendTo(rowClass);
}

showResults = function(periods) {
    $(".loading-indicator").hide();
    $(".results").show();

    periods.forEach(function(period) {
        console.log(period);

        // Dates
        dateTimeISO = period["dateTimeISO"];
        date = new Date(Date.parse(dateTimeISO));
        displayDate = date.toDateString();
        addRowCell(".dates-row").text(displayDate);

        // Icons
        icon = period["icon"];
        addRowCell(".icons-row").children("img")
                                .attr("src", "icons/" + icon);

        // Highs
        highF = period["maxTempF"];
        highC = period["maxTempC"];
        addRowCell(".highs-row").text("High: " + highF + "˚F");

        // Lows
        lowF = period["minTempF"];
        lowC = period["minTempC"];
        addRowCell(".lows-row").text("Low: " + lowF + "˚F");
    });
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
