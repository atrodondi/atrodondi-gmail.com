//read and set any environment variables with the dotenv package
require("dotenv").config();

// gets my spotify keys from keys.js and stores in Keys
var keys = require("./keys.js");

// getting access to node spotify api and sets to variable
var Spotify = require("node-spotify-api");

//Spotify object constructor
function Spotify(artists, name, link, album) {
  this.artists = artists,
    this.name = name,
    this.link = link,
    this.album = album;
}

// creates the spotify object that can be searched
var spotify = new Spotify(keys.spotify);

var query = "";

var input = process.argv[2];

//query take in as many arg as user enters after command arg
for (let i = 3; i < process.argv.length; i++) {
  query += process.argv[i] + " ";
}

// command function that defines what input does based on command input (first argument in command line)

function command() {
  if (input == "spotify-this-song") {
    spotify.search({ type: "track", query: query, limit: 1 }, function (err, data) {
      if (err) {
        return console.log("error occurred: " + err);
      }
      // album
      console.log("Album: " + data.tracks.items[0].album.name);

      // name of Track Searched
      console.log("Track Name: " + data.tracks.items[0].name);

      // artist of Track Searched
      console.log("Artist: " + data.tracks.items[0].artists[0].name);

      // preview URL to listen to 30 second preview (if avail)
      console.log("Preview URL (if avail): " + data.tracks.items[0].preview_url);


    });
  }
  // concert command accessing Band In Town API
  else if (input == "concert-this") { console.log("concert? Is " + query + "on the set list?") }
  else if (input == "movie-this") { console.log(query + " is a great movie!") }
  else { console.log("That is not a proper command. => 'spotify-this-song' / 'concert-this' / 'movie-this' ") }
}

command();

