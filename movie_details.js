const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const APILINK = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=d2821eff1517b1cd92deed4b166ec08f`;

const VIDEOAPI = `https://api.themoviedb.org/3/movie/${movieId}/videos?&api_key=d2821eff1517b1cd92deed4b166ec08f`;

const SIMILAR_MOVIES_APILINK = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1?&api_key=d2821eff1517b1cd92deed4b166ec08f`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

// console.log(SIMILAR_MOVIES_APILINK);

// Get trailers from VIDEOAPI using ID of the movie
fetch(VIDEOAPI)
    .then(response => response.json())
    .then(response => {
        // console.log(response.results)
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

// Get overviews from APILINK using id of the movie
fetch(APILINK)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        const overview = document.getElementById("overview");
        overview.innerText = res.overview;
        // const overview = document.getElementById("overview");
        // overview.innerText = res.overview;
    })


// Image Slider
const initSlider = () => {
    const image_list = document.querySelector(".slider-wrapper #image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .material-symbols-outlined");
    // console.log(slideButtons);
    // entire scroll width - div width because we don't count the first block
    const maxScrollLeft = image_list.scrollWidth - image_list.clientWidth;
    console.log("scrollWidth ", image_list.scrollWidth);
    console.log("clientWidth ", image_list.clientWidth);
    console.log("maxscrollLeft", maxScrollLeft);
    //slide image once the respective button is clicked.
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // console.log(button);
            const direction = button.id === "prev-slide" ? -1 : 1;
            //clienWidth is getting the width of the container.
            //multiply the width of image-list with -1 or 1
            const width = image_list.clientWidth * direction;
            console.log("Client width: ", image_list.clientWidth);
            //scroll the browser horizontally by width.
            image_list.scrollBy({ left: width, behavior: "smooth" });
        });
    });
    const handleSlideButtons = () => {
        slideButtons[0].style.display = image_list.scrollLeft <= 0 ? "none" : "block";

        slideButtons[1].style.display = Math.round(image_list.scrollLeft) >= maxScrollLeft ? "none" : "block";

        console.log("Scroll left: ", Math.round(image_list.scrollLeft));
        // console.log(slideButtons[1].style.display);
    };

    image_list.addEventListener("scroll", () => {
        handleSlideButtons();

    });
}

window.addEventListener("load", initSlider); // once the page has fully loaded, then call initSlider().
//The reason why using window.addEventListener("load",function) is because sometimes if the script is included in the head, it will be loaded before being able to grab the html elements.
//Another way is to include the script at the bottom. But safer way is to use window.addEventListener("load",function).

// Similar movies using current movie's Id.
const image_list = document.getElementById("image-list");

fetch(SIMILAR_MOVIES_APILINK)
    .then(response => response.json())
    .then(response =>
        response.results.forEach(movie => {
            console.log("Movie: " + movie.title);

            const movie_div = document.createElement('div');

            const movie_img = document.createElement('img');
            movie_img.setAttribute('class', 'image-item');
            movie_img.src = IMG_PATH + movie.poster_path;

            const movie_title = document.createElement('h4');
            movie_title.setAttribute('class', 'image-content');
            movie_title.innerHTML = movie.title;

            movie_div.appendChild(movie_img);
            movie_div.appendChild(movie_title);
            image_list.appendChild(movie_div);

        })
    );
