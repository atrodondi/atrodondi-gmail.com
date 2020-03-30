require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
function Spotify(artists, name, link, album) {
  this.artists = artists,
    this.name = name,
    this.link = link,
    this.album = album;
}
var spotify = new Spotify(keys.spotify);
var query = "";
for (let i = 3; i < process.argv.length; i++) {
  query += process.argv[i]

}
spotify.search({ type: "track", query: query, limit: 1 }, function (err, data) {
  if (err) {
    return console.log("error occurred: " + err);
  }
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].artists[0].name);
  console.log(data.tracks.items[0].preview_url);


});
