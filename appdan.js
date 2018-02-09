const baseUrlMovies = "	http://stapi.co/api/v1/rest/movie/search"
const baseUrlSeries = "	http://stapi.co/api/v1/rest/season/search"
fetchMovieAndSeriesData()


function fetchMovieAndSeriesData() {
    var movies = {}
    var series = {}
    return Promise.all([fetchMovieData(), fetchSeriesData()])
    .then(([movies, seasons]) => {
        createMoviesDropdown(movies)
        createSeriesDropdown(seasons)
    })
    //
    // fetch(baseUrlMovies)
    //     .then(response => response.json())
    //     .then(movies => {
    //         movies = movies
    //     })
    //     .then()
}

function fetchSeriesData() {
    return fetch(baseUrlSeries)
        .then(response => response.json())
        .then(data => data.seasons)
        // .then(createSeriesDropdown)
}

function fetchMovieData() {
    return fetch(baseUrlMovies)
        .then(response => response.json())
        // .then(createSeriesDropdown)
}

// function createSeriesDropdown(response) {
//
//     response.seasons.pop()
// }

// TODO: Look into <optgroup>
function createSeriesDropdown(seasons) {
    // console.log(response);
    let drop = document.getElementById("dropSeries")
    seasons.forEach(function(series) {
        let option = document.createElement("option")
        option.innerHTML = seasons.series.title + " Season " + series.seasonNumber
        option.innerHTML =
        // console.log();
        drop.appendChild(option)
        option.addEventListener("click", populateSeriesInfo)
    })
}

function createMoviesDropdown(movies) {
    let drop = document.getElementById("dropMovies")
    movies.forEach(function(movies) {
        let option = document.createElement("option")
        option.innerHTML = movies.title
        drop.appendChild(option)
        option.addEventListener("click", populateMovieInfo)
    })
}

function populateSeriesInfo(series) {
    let form = document.querySelector("#seriesInfo")
    let text = document.createElement("input")
    text.type = "text"
    text.name = "comments"
    text.value = "comments"
    form.appendChild(text)
    let submit = document.createElement("input")
    submit.type = "submit"
    submit.name = "save"
    submit.value = "Submit Review!"
    form.appendChild(submit)
}

function populateMovieInfo(movies) {
    let form = document.querySelector("#movieInfo")
    let text = document.createElement("input")
    text.type = "text"
    text.name = "comments"
    text.value = "comments"
    form.appendChild(text)
    let submit = document.createElement("input")
    submit.type = "submit"
    submit.name = "save"
    submit.value = "Submit Review!"
    form.appendChild(submit)
}

fetchSeriesData()
fetchMovieData()
