# Liri Node App
The Liri Node App is a simple Node.js program that takes in four different commands and depending on which command and the parameters that follow gives the user information:

1. spotify-this-song "Any song title" *this command will give the user information about the song, i.e. artist, song title, album, and a link to a 30sec preview of the song (if avail)*

2. concert-this "Band/Artist name" *this command will give the user information about upcoming shows of the chosen band/artist, i.e. Venue, location of venue, date*

3. movie-this "Movie Title" *this command will give the user all kinds of information about the first movie found matching the title searched*

4. do-what-it-says *this command will do whatever is typed in the random.txt file*

# How To Instructions:

1. Check to make sure you have Node.js installed, if you do not, this application will not work.

2. Get the dependecies : type *npm install* after opening the program in the terminal

3. Now you are ready to go! If you have never used Node programs before, syntax for this program is:

 *node 'file_name.js' 'command' 'argument(can be multiple words with spaces in between words)'*

4. User should be able to enter any command followed by any number of words to get the corresponding information. If commands or querys are left blank or there is an error, there are default sets or informative logs that will tell you what went wrong.

 # Why is this useful?

 This application is a simple yet effective way to access information. It uses multiple APIs to funnel information to the user. APIs and technologies included in this application:
 1. [Node-Spotify-Api] (https://www.npmjs.com/package/node-spotify-api)
 2. [Axios] (https://www.npmjs.com/package/axios) - to access [OMDB](http://www.omdbapi.com/) and [Bands in Town](https://www.artists.bandsintown.com/support/api-installation) APIs
 3. [Moment](https://www.npmjs.com/package/moment)
 4. [dotenv](https://www.npmjs.com/package/dotenv)

 # 