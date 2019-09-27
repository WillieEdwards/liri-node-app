# **LIRI-BOT** (a Language Interpretation and Recognition Interface) #

# Overview #

**LIRI** is a command line node app that takes in parameters and gives you back data based off the following parameters:

* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

# Applied Technologies #

**GitHub** - file repository

**Visual Studio Code** - text editor

**Node.js**

**APIs:**

* Spotify (https://developer.spotify.com/)
* OMDB (http://www.omdbapi.com)
* Bands In Town (http://www.artists.bandsintown.com/bandsintown-api)

**NPM Packages:**

* Node-Spotify-API (https://www.npmjs.com/package/node-spotify-api)
* Axios (https://www.npmjs.com/package/axios)
* Moment (https://www.npmjs.com/package/moment)
* DotEnv (https://www.npmjs.com/package/dotenv)

# Prerequisites #

1. Node.js - download the latest version of Node (https://nodejs.org/en/).

1. Make a new GitHub repository called liri-node-app and clone it to your computer.

1. Send requests using the axios package to the Bands in Town, Spotify and OMDB APIs.

# concert-this #

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

* Name of the venue
* Venue location
* Date of the event (MM/DD/YYYY)

**Example:** node .\liri.js concert-this "input band name here"
![concert-this](/images/concert-this.png)

# spotify-this-song #

This will show the following information about the song in your terminal/bash window

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

**Example:** node .\liri.js spotify-this-song "input song name here"
![spotify-this-song](/images/spotify-this-song.png)

# movie-this #

This will output the following information to your terminal/bash window:

* Title of the movie
* Year the movie was released
* IMDb Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language(s) of the movie
* Plot of the movie
* Actors in the movie

**Example:** node .\liri.js movie-this "input movie name here"
![movie-this](/images/movie-this.png)

# do-what-it-says #

Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

Example:
![do-what-it-says](/images/do-what-it-says.png)