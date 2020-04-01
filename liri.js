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

//arguments variable "band name", "song", etc.
var query = "";

// fs
var fs = require("fs");



//controls if spotify command is entered
function songInfo() {
  for (let i = 3; i < process.argv.length; i++) {
    query += process.argv[i] + " ";
  }
  //if song title is blank, defaults to The Sign by Ace of Base
  if (query == "") {
    spotify.search({ type: "track", query: "The Sign", limit: 1 }, function (err, data) {
      if (err) {
        return console.log("No Song Found");
      }
      let obj = data.tracks.items[0];
      console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\nAlbum: " + obj.album.name, "\nTrack Name: " + obj.name, "\nArtist: " + obj.artists[0].name, "\nPreview URL (if avail): " + obj.preview_url, '\n>>>>>>>>>>>>>>>>>>>>>>>>>', "\n");


    });
  } else {
    spotify.search({ type: "track", query: query, limit: 1 }, function (err, data) {
      if (err) {
        return console.log("No Song Found! Check Song Title.");
      }
      let obj = data.tracks.items[0];
      console.log("\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\nAlbum: " + obj.album.name, "\nTrack Name: " + obj.name, "\nArtist: " + obj.artists[0].name, "\nPreview URL (if avail): " + obj.preview_url, '\n>>>>>>>>>>>>>>>>>>>>>>>>>', "\n");




    });
  }
}

// controls if concert command is entered
function bandInfo() {
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
        console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\nVenue: " + obj.venue.name, "\nLocation: " + obj.venue.city + ", " + obj.venue.country, "\nDate: " + moment(obj.datetime).format("MM/DD/YYYY"), "\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\n");
      }
    }).catch(function (err) { console.log("Couldn't find what you are looking for---->" + err) });
  }
}

// controls if movie command is entered
function movieInfo() {
  for (let i = 3; i < process.argv.length; i++) {
    query += process.argv[i] + " ";
  }

  // if query is blank, sets default to "Mr. Nobody" per instructions
  if (query == "") {
    axios.get("https://www.omdbapi.com/?t=Mr.+nobody&y=&plot=short&apikey=trilogy").then(function (response) {


      let obj = response.data;

      console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\nMovie Title: " + response.data.Title, "\nYear: " + obj.Year, "\nIMDB rating: " + obj.imdbRating, "\nRotten Tomatoes rating: " + obj.Ratings[1].Value, "\n Country of Origin: " + obj.Country, "\nLanguage: + " + obj.Language, "\nPlot: " + obj.Plot, "\nCast: " + obj.Actors, "\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\n\n");

    })
  }
  // filled out movie query 
  else {
    axios.get("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy").then(
      function (response) {
        let obj = response.data;
        console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\nMovie Title: " + response.data.Title, "\nYear: " + obj.Year, "\nIMDB rating: " + obj.imdbRating, "\nRotten Tomatoes rating: " + obj.Ratings[1].Value, "\n Country of Origin: " + obj.Country, "\nLanguage: + " + obj.Language, "\nPlot: " + obj.Plot, "\nCast: " + obj.Actors, "\n>>>>>>>>>>>>>>>>>>>>>>>>>", "\n\n");
      }
    ).catch(function (err) { console.log("Couldn't find what you are looking for---->" + err) });
  }
}

// controls do what it says command - does whatever  command line is on the random.txt file
function whatItSays() {

  var data = fs.readFileSync("./random.txt", "utf8");
  // split parts of random.txt file up so could insert properly into each function
  input = data.substring(0, data.indexOf(","));
  query = data.substring(data.indexOf(","), data.length);
  // re runs the command function with above params
  command();



}

// logging each command entered to a log.txt file
function logText() {
  let logged = input + ", '" + query + "'";
  fs.appendFile("log.txt", "\n" + logged, function (err) {
    if (err) { }
    else { }
  })
}
// command function that defines what input does based on command input (first argument in command line)
function command() {
  // if spotify command is entered, then access spotify api and get album, title of track searched, artist of track, and a Preview Url for a 30secon preview if there is one
  if (input == "spotify-this-song") {
    songInfo();
  }
  // concert command accessing Band In Town API and gathering: name of the venue,venue location, date of the event "MM/DD/YYYY" format
  else if (input == "concert-this") {
    bandInfo();
  }
  //movie command gets info about movie
  else if (input == "movie-this") {
    movieInfo();
  }
  else if (input == "do-what-it-says") {
    whatItSays();
  }
  // probably unncessary but it will be for me when testing
  else { console.log("That is not a proper command. => 'spotify-this-song' / 'concert-this' / 'movie-this' / 'do-what-it-says ") }

  // logging each command entered to a log.txt file
  logText();

}

// calling command function to take command and run functions based on it
command();

