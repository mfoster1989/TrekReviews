const baseUrlMovies = "	http://stapi.co/api/v1/rest/movie/search"
const baseUrlSeries = "	http://stapi.co/api/v1/rest/season/search"

fetchSeriesData()
fetchMovieData()

document.getElementById("selectedMedia").addEventListener("change", populateSeriesInfo)

function fetchSeriesData() {
    return fetch(baseUrlSeries)
        .then(response => response.json())
        .then(createSeriesDropdown)
}

function fetchMovieData() {
    return fetch(baseUrlMovies)
        .then(response => response.json())
        .then(createMoviesDropdown)
}

function createSeriesDropdown(response) {
    let drop = document.getElementById("shows")
    response.seasons.forEach(function(seasons) {
        let option = document.createElement("option")
        option.innerHTML = seasons.series.title + " Season " + seasons.seasonNumber
        drop.appendChild(option)
    })
}

function createMoviesDropdown(movies) {
    let drop = document.getElementById("movies")
    movies.movies.forEach(function(movies) {
        let option = document.createElement("option")
        option.innerHTML = movies.title
        drop.appendChild(option)
    })
}

function populateSeriesInfo(series) {
    let form = document.querySelector("#seriesInfo")
    form.innerHTML = ""
    let text = document.createElement("textarea")
    text.type = "text"
    text.name = "comments"
    text.placeholder = "Write your comments here!"
    form.appendChild(text)
    let submit = document.createElement("input")
    submit.type = "submit"
    submit.name = "save"
    submit.value = "Submit Review!"
    form.appendChild(submit)
}

function getFormData() {
    const data = new FormData(document.querySelector("form"));
    return {
        comments: data.get("comments"),
    };  
}

function saveReview() {
    return fetch(`${baseUrlMovies}`, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(getFormData())
    }).then(response => response.json())
        .then(response => response.message)
        .catch(console.error);
}