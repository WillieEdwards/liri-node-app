require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});

var defaultMovie = "Blade";


var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "concert-this":
        getBands(value);
        break;
    case "spotify-this-song":
        getSongs(value);
        break;
    case "movie-this":
        if (value === "") {
            value = defaultMovie;
        }
        getMovies(value);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        break;
}

function getBand(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=")
        .then(function (response) {
            console.log("Venue: " response.data[0].venue.name);
            console.log("Location: ", response.data[0].venue.city);
            var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        });
        .catch (function (error) {
        console.log(error)
    })
}

function getSongs(songName) {
    if (songName === "") {
        songName "Panama";
    }

spotify.search({
    type: "track",
    query: songName
}, function (err, data) {
    if (err) {
        return console.log("Error occurred: " + err);
    }

    console.log("Artists: ", data.tracks.items[0].album.artists[0].name);
    console.log("Preview Link: ", data.tracks.items[0].preview_url);
    console.log("Album Name: ", data.tracks.items[0].album.name);
})


var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

function getMovies(movieName) {
    axios.get(queryUrl).then(function (response) {
        var results = `
        Title of the movie: ${response.data.Title}
        Year the movie came out: ${response.data.Year}
        IMDB Rating of the movie: ${response.data.Rated}
        Rotten Tomatoes Rating of the movie: ${response.data.Ratings[1].Value}
        Country where the movie was produced: ${response.data.Country}
        Language of the movie: ${response.data.Language}
        Plot of the movie: ${response.data.Plot}
        Actors in the movie: ${response.data.Actors}`;
        console.log(results)
    });

    .catch (function (error) {
        console.log(error);
    });
    if (movieName === "Blade") {
        console.log("----------------");
        console.log("If you haven't seen 'Blade,' then you should: https://www.imdb.com/title/tt0120611/");
        console.log("It's on Netflix on 10/01/2019!");
    };
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        data = data.split(",");
        var action = data[0];
        var value = data[1];
        switch (action) {
            case "concert-this":
                getBands(value);
                break;
            case "spotify-this-song":
                getSongs(value);
                break;
            case "movie-this":
                getMovies(value)
                break;
            default:
                break;
        }
    })
}
