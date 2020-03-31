

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

// moment.js
var moment = require("moment");

// command input
var input = process.argv[2];



// command function that defines what input does based on command input (first argument in command line)

function command() {
  // if spotify command is entered, then access spotify api and get album, title of track searched, artist of track, and a Preview Url for a 30secon preview if there is one
  if (input == "spotify-this-song") {
    var query = "";
    for (let i = 3; i < process.argv.length; i++) {
      query += process.argv[i] + " ";
    }
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
    //query takes in as many arg as user enters after command arg
    var query = "";
    for (let i = 3; i < process.argv.length; i++) {
      query += process.argv[i];
    }

    if (query == "") {
      console.log("Type in the name of a Band or Artist !")
    }
    else {
      axios.get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(function (response) {
        for (i in response.data) {
          let obj = response.data[i];
          console.log("\n\nVenue: " + obj.venue.name, "\nLocation: " + obj.venue.city + ", " + obj.venue.country, "\nDate: " + moment(obj.datetime).format("MM/DD/YYYY"));

        }
      });

    }

  }

  // had to put a separate query definer for movie because he needs to have a space between each arguement, where as Band/Spotify did not need spaces added. kept getting errors when trying to access band api with spaces in bewteen arguments
  else if (input == "movie-this") {
    let query = "";
    for (let i = 3; i < process.argv.length; i++) {
      query += process.argv[i] + " ";
    }



    // if query is blank, sets default to "Mr. Nobody" per instructions
    if (query == "") {
      axios.get("https://www.omdbapi.com/?t=Mr.+nobody&y=&plot=short&apikey=trilogy").then(function (response) {



        console.log("Movie Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("This movie's IMDB rating is: " + response.data.imdbRating);
        console.log("This movie's Rotten Tomates rating is: " + response.data.Ratings[1].Value);
        console.log("This movie was produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);

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

