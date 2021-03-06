require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

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
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

function getBands(artist) {

  var artistUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(artistUrl)
    .then(function (response, err) {

      var artistResult = response.data;
      var eventDate = moment(artistResult[0].datetime).format('MM/DD/YYYY');

      console.log("=============================== RESULT ===============================");
      console.log("\nVenue name:", artistResult[0].venue.name);
      console.log("Location:", artistResult[0].venue.city + ", " + artistResult[0].venue.country);
      console.log("Date:", eventDate);
      console.log("\n============================== END RESULT ============================");
    })
    .catch(function () {
      console.log("Please enter a valid artist/band name...")
    });
}

function getSongs(songName) {

  //If user has not specified a song, default to "Intergalactic" by The Beastie Boys
  if (songName === "") {
    songName = "Intergalactic";
  }

  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    var songResult = data.tracks.items;

    console.log("=============================== RESULT ===============================");
    console.log("\nArtist/Band:", songResult[0].album.artists[0].name);
    console.log("Song Name:", songResult[0].name);
    console.log("Preview URL:", songResult[0].preview_url);
    console.log("Album Name:", songResult[0].album.name);
    console.log("\n============================== END RESULT ============================");
  });
}

function getMovies(movieName) {

  //Response if user does not type in a movie title
  if (movieName === "") {
    movieName = "Mr. Nobody";
  }

  var movieUrl = "http://www.omdbapi.com/?apikey=42518777&t=" + movieName;

  axios.get(movieUrl).then(function (response) {

    var movieResult = response.data;

    console.log("=============================== RESULT ===============================");
    console.log("\nTitle:", movieResult.Title);
    console.log("Year:", movieResult.Year);
    console.log("IMDb Rating:", movieResult.Rated);
    console.log("Rotten Tomatoes Rating:", movieResult.Ratings[1].Value);
    console.log("Country:", movieResult.Country);
    console.log("Language:", movieResult.Language);
    console.log("Plot:", movieResult.Plot);
    console.log("Actors:", movieResult.Actors);
    console.log("\n============================== END RESULT ============================");

  })
    .catch(function () {
      console.log("Please enter a valid movie title...");
    })
}

//Response for user input of "do-what-it-says" to be imported from random.txt

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {

    var randomTxt = data.split(",");
    var action = randomTxt[0];
    var value = randomTxt[1];

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
      case "do-what-it-says":
        doWhatItSays()
        break;
      default:
        break;
    }
  })
}