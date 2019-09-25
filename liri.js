require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":
    //If user has not specified a song, use default
    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie, use default
    if (value === "") {
      value = defaultMovie;
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

function getBands(artist) {

  var artistUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(artistUrl)
    .then(function (response) {

      var artistResult = response.data
      var eventDate = moment(artistResult[0].datetime).format('MM/DD/YYYY');

      console.log("Venue name:", artistResult[0].venue.name);
      console.log("Location:", artistResult[0].venue.city);
      console.log("Date:", eventDate);
    })
    .catch(function () {
      console.log("Please enter a valid artist/band name...");
    });
}

function getSongs(songName) {

  //If user has not specified a song, default to "The Sign" by Ace of Bass
  if (songName === "") {
    songName = "The Sign";
  }

  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    //Artist(s)
    console.log("Artist/Band: ", data.tracks.items[0].album.artists[0].name)
    //Song name

    //A preview URL of the song from Spotify
    console.log("Preview URL: ", data.tracks.items[0].preview_url)
    //The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name)
  });
}

function getMovies(movieName) {

  var movieUrl = "http://www.omdbapi.com/?apikey=42518777&t=" + movieName;

  axios.get(movieUrl).then(function (response) {

    var movieResult = response.data;

    console.log("Title: ", movieResult.Title);
    console.log("Year: ", movieResult.Year);
    console.log("IMDb Rating: ", movieResult.Rated);
    console.log("Rotten Tomatoes Rating: ", movieResult.Ratings[1].Value);
    console.log("Country: ", movieResult.Country);
    console.log("Language: ", movieResult.Language);
    console.log("Plot: ", movieResult.Plot);
    console.log("Actors: ", movieResult.Actors);

  })
    .catch(function () {
      console.log("Please enter a valid movie title...");
    });
  //Response if user does not type in a movie title
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (data) {
    data = data.split(",");
    var action = data[0]
    var value = data[1]
    switch (action) {
      case "concert-this":
        getBands(value)
        break;
      case "spotify-this-song":
        getSongs(value)
        break;
      case "movie-this":
        getMovies(value)
        break;
      default:
        break;
    }
  });
}