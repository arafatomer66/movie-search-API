$(document).ready(() => {
    $('#searchForm').on('keyup', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?apikey=67d91022&page=1&s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <a href="#" onclick="movieSelected('${movie.imdbID}')"><img src="${movie.Poster}"></a>
                            <h6>${movie.Title}</h6>
                            <p>${movie.Year}</p>
                            <a href="#" class="btn btn-outline-primary" onclick="movieSelected('${movie.imdbID}')">Movie Details</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?apikey=67d91022&page=1&i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-8">
                        <h3>${movie.Title}</h3>
                        <ul class="list-group">
                            <li class="list-group-item">${movie.Plot}</li>
                            <li class="list-group-item"><strong>Genre:  </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:  </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:  </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>Imdb Rating:  </strong><span class="badge badge-pill badge-primary">${movie.imdbRating}</span></li>
                            <li class="list-group-item"><strong>Rotten Tomatos Rating:  </strong>N/A</li>
                            <li class="list-group-item"><strong>Director:  </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:  </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:  </strong>${movie.Actors}</li>
                            <li class="list-group-item">
                                <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary">Imdb</a>
                                <a href="index.html" class="btn btn-success">Home</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                            <img src="${movie.Poster}" alt="" class="thumbnail">
                        </div>
                </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}