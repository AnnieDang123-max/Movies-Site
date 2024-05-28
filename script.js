const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d2821eff1517b1cd92deed4b166ec08f&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=d2821eff1517b1cd92deed4b166ec08f&query=';
// &api_key=d2821eff1517b1cd92deed4b166ec08f




const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)
function returnMovies(url) {
    fetch(url).then(res => res.json())
        .then(function (data) {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');

                const imageHover = document.createElement('a');

                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                const center = document.createElement('center');

                const overview = document.createElement('div');
                // overview.setAttribute('id', 'overview');

                title.innerHTML = `<h4>${element.title}   <span class="${getColor(element.vote_average)}">${Math.round(element.vote_average * 100) / 100}</span></h4>
                
                <p class="release_date">${element.release_date.substring(0, 4)}</p>
                <br><a href=movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
                image.src = IMG_PATH + element.poster_path;

                // overview.innerHTML = `${getOverview(element.overview)}`;

                imageHover.href = `movie_details.html?id=${element.id}&title=${element.title}`;
                imageHover.appendChild(image);
                // center.appendChild(imageHover);
                // center.appendChild(image);
                div_card.appendChild(imageHover);
                div_card.appendChild(title);
                div_card.appendChild(overview);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                main.appendChild(div_row);
            });
        });
}

function getColor(average_vote) {
    if (average_vote > 7) {
        console.log("More than 7");
        return "green";
    }
    else if (average_vote > 5 && average_vote < 7) {
        return "orange";
    }
    else if (average_vote < 5) {
        return "red";
    }
}

function getOverview(overview) {
    if (overview == "") {
        return "No overview available";
    }
    else {
        return overview;
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});

