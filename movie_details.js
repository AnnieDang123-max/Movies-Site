const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=d2821eff1517b1cd92deed4b166ec08f`;

const VIDEOAPI = `https://api.themoviedb.org/3/movie/${movieId}/videos?&api_key=d2821eff1517b1cd92deed4b166ec08f`;

console.log(VIDEOAPI);

fetch(VIDEOAPI)
    .then(response => response.json())
    .then(response => {
        console.log(response.results)
        const vid_div = document.getElementById('vid_div');
        const trailer = document.createElement("iframe");
        trailer.setAttribute('id', 'trailer');

        trailer.src = `https://www.youtube.com/embed/${response.results[0].key}`;
        trailer.width = "900";
        trailer.height = "600";
        vid_div.appendChild(trailer);

    })

const title = document.getElementById("title");
title.innerText = movieTitle;

fetch(APILINK)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const overview = document.getElementById("overview");
        overview.innerText = res.overview;
        // const overview = document.getElementById("overview");
        // overview.innerText = res.overview;
    })

