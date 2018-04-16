const baseUrlMovies = "	http://stapi.co/api/v1/rest/movie/search"
const baseUrlSeries = "	http://stapi.co/api/v1/rest/season/search"
const reviewDbURL = "https://trekreviewsserver.herokuapp.com/comments"


fetchSeriesData()
fetchMovieData()
fetchReviews()
// saveReview()

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

function fetchReviews() {
    return fetch(reviewDbURL)
        .then(response => response.json())
        .then(populateReviews)
}

function createSeriesDropdown(response) {
    let drop = document.getElementById("shows")
    response.seasons.forEach(function (seasons) {
        let option = document.createElement("option")
        option.innerHTML = seasons.series.title + " Season " + seasons.seasonNumber
        drop.appendChild(option)
    })
}

function createMoviesDropdown(movies) {
    let drop = document.getElementById("movies")
    movies.movies.forEach(function (movies) {
        let option = document.createElement("option")
        option.innerHTML = movies.title
        drop.appendChild(option)
    })
}

function populateReviews(reviews) {
    let reviewsDiv = document.getElementById("submittedReviews")
    reviews.comments.forEach((reviews) => {
        let h2 = document.createElement("h2")
        h2.innerHTML = reviews.media
        reviewsDiv.appendChild(h2)
        let p = document.createElement("p")
        p.innerHTML = reviews.comments
        reviewsDiv.appendChild(p)
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
    form.addEventListener("submit", saveReview)
}

function saveReview(event) {
    event.preventDefault()
    let formData = new FormData(document.querySelector("form"))
    let data = {
        // media: formData.get(select.value)
        media: select.value,
        comments: formData.get("comments")
    }
    fetch(reviewDbURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        // .then(response => {
        //     showReview(response, data)
        // })
        .catch(console.error)
}

// function showReview(response, data) {
//     document.querySelector("#media").innerHTML = data.media
//     document.querySelector("#review").innerHTML = data.comments
// }
