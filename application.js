// Adds a new cell to the table row identified by the given class.
// New cells are added by cloning the hidden prototype cell.
addRowCell = function(rowClass) {
    return $(rowClass + " .prototype").clone()
                                      .removeClass("prototype")
                                      .appendTo(rowClass);
}

displayTemp = function(temp, prefix, symbol) {
    return prefix + temp + "˚" + symbol;
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
        highF = displayTemp(period["maxTempF"], "High: ", "F");
        highC = displayTemp(period["maxTempC"], "High: ", "C");
        addRowCell(".highs-row").text(highF)
                                .data("temp-f", highF)
                                .data("temp-c", highC);

        // Lows
        lowF = displayTemp(period["minTempF"], "Low: ", "F");
        lowC = displayTemp(period["minTempC"], "Low: ", "C");
        addRowCell(".lows-row").text(lowF)
                               .data("temp-f", lowF)
                               .data("temp-c", lowC);
    });
}

toggleTemp = function($toggleButton) {
    $cells = $(".highs-row td:not(.prototype), .lows-row td:not(.prototype)");

    if ($toggleButton.data("using-f")) {
        $cells.each(function(index, cell) {
            $cell = $(cell);
            $cell.text($cell.data("temp-c"));
        });
        $toggleButton.data("using-f", false);
    }
    else {
        $cells.each(function(index, cell) {
            $cell = $(cell);
            $cell.text($cell.data("temp-f"));
        });
        $toggleButton.data("using-f", true);
    }
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

$(document).on("click", ".temp-toggle", function(event) {
    event.preventDefault();
    toggleTemp($(this));
});

$(function() {
    fetchWeather();
});
