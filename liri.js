

//read and set any environment variables with the dotenv package( spotify keys)
require("dotenv").config();

// globals
// gets my spotify keys from keys.js and stores in Keys
var keys = require("./keys.js");

// getting access to node spotify api and sets to variable
var Spotify = require("node-spotify-api");

// creates the spotify object that can be searched
var spotify = new Spotify(keys.spotify);

// axios package
var axios = require("axios");
// omdb package...am i going to use? not sure yet.
var omdb = require('omdb');


var input = process.argv[2];

//query takes in as many arg as user enters after command arg
var query = "";
for (let i = 3; i < process.argv.length; i++) {
  query += process.argv[i] + " ";
}



// command function that defines what input does based on command input (first argument in command line)

function command() {
  // if spotify command is entered, then access spotify api and get album, title of track searched, artist of track, and a Preview Url for a 30secon preview if there is one
  if (input == "spotify-this-song") {
    //if song title is blank, defaults to The Sign by Ace of Base
    if (query == "") {
      spotify.search({ type: "track", query: "The Sign", limit: 1 }, function (err, data) {
        if (err) {
          return console.log("No Song Found");
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
    } else {
      spotify.search({ type: "track", query: query, limit: 1 }, function (err, data) {
        if (err) {
          return console.log("No Song Found! Check Song Title.");
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

  }
  // concert command accessing Band In Town API and gathering: name of the venue,venue location, date of the event "MM/DD/YYYY" format
  else if (input == "concert-this") {
    console.log("concert? Is " + query + "on the set list?");
    if ("") {
      console.log("Band/Artist argument is blank!")
    }
    else {
      axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp");
      console.log(response);

    }

  }

  // movie command accessing omdb api getting: movie title, year it came out, IMDB rating, rotten tomatoes rating, country where produced, language, plot, and actors in movie.
  else if (input == "movie-this") {


    // if query is blank, sets default to "Mr. Nobody" per instructions
    if (query == "") {
      axios.get("http://www.omdbapi.com/?t=Mr.+nobody&y=&plot=short&apikey=trilogy").then(function (err, response) {
        if (err) {
          return console.log("There was an error: " + err)
        }
        else {
          console.log("Movie Title: " + response.data.title);
          console.log("Year: " + response.data.year);
          console.log("This movie's IMDB rating is: " + response.data.imdbRating);
          console.log("This movie's Rotten Tomates rating is: " + response.data.Ratings[1].Value);
          console.log("This movie was produced in: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        }
      })
    }
    // filled out movie query 
    else {

      axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
        function (response) {


          console.log("Movie Title: " + response.data.Title);
          console.log("Year: " + response.data.Year);
          console.log("This movie's IMDB rating is: " + response.data.imdbRating);
          console.log("This movie's Rotten Tomates rating is: " + response.data.Ratings[1].Value);
          console.log("This movie was produced in: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors)

        }
      );
    }

  }
  // probably unncessary but it will be for me when testing
  else { console.log("That is not a proper command. => 'spotify-this-song' / 'concert-this' / 'movie-this' ") }
}

command();

