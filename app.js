const baseUrlMovies = "	http://stapi.co/api/v1/rest/movie/search"
const baseUrlSeries = "	http://stapi.co/api/v1/rest/season/search"

fetchSeriesData()

function fetchSeriesData() {
    fetch(baseUrlSeries)
        .then(response => response.json())
        .then(createSeriesDropdown)
}

function createSeriesDropdown(response) {
    console.log(response);
    let drop = document.getElementById("dropSeries")
    response.seasons.forEach(function(series) {
        // console.log(series);
        // console.log(response);
        let option = document.createElement("option")
        option.innerHTML = series.series.title + " Season " + series.seasonNumber
        // console.log();
        drop.appendChild(option)
        option.addEventListener("click", populateSeriesInfo)
    })
}

function populateSeriesInfo(series) {
    let div = document.querySelector("#seriesInfo")
    
}
