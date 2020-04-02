# Liri Node App
The Liri Node App is a simple Node.js program that takes in four different commands and depending on which command and the parameters that follow gives the user information:

1. **spotify-this-song "Any song title"** *this command will give the user information about the song, i.e. artist, song title, album, and a link to a 30sec preview of the song (if avail)*

2. **concert-this "Band/Artist name"** *this command will give the user information about upcoming shows of the chosen band/artist, i.e. Venue, location of venue, date*

3. **movie-this "Movie Title"** *this command will give the user all kinds of information about the first movie found matching the title searched*

4. **do-what-it-says** *this command will do whatever is typed in the random.txt file*

# How To Instructions:

1. Check to make sure you have Node.js installed, if you do not, this application will not work.

2. Get the dependecies : type ***npm install*** after opening the root file in the terminal.

3. Now you are ready to go! If you have never used Node programs before, syntax for this program is:

    **node file_name.js command argument**

4. User should be able to enter any command followed by any number of words to get the corresponding information. If a wrong command is entered, nothing will happen except the command will be logged and the command line will await a proper command with or without params. Simply retry trping command.

 # Why is this useful?

 This application is a simple yet effective way to access information. It a very smooth and seamless way to access multiple APIs( and/or databases in future?) on the back end that  funnel information to the user, but for now to the console. APIs and technologies used in this application include:
 1. [Node-Spotify-Api](https://www.npmjs.com/package/node-spotify-api)
 2. [Axios](https://www.npmjs.com/package/axios) used to access [OMDB](http://www.omdbapi.com/) and [Bands in Town](https://www.artists.bandsintown.com/support/api-installation) APIs
 3. [Moment](https://www.npmjs.com/package/moment)
 4. [dotenv](https://www.npmjs.com/package/dotenv)


# App orgnization
I started out by first declaring all of the global variables and the getting the packages declared before anything else starts to get going.

Each potential command that can be entered is handled by its own function. The appropriate function triggers depending on what the command input is. I chose to set it up so that the user did not need to put their search item in quotes on the command line.

Once the user enters the command they enter whatever their search params are (unless you are using the do-what-it-says command):

for example: ***node .\liri.js concert-this blink 182*** entered into the command line would give you a the venue names, locations and dates of some upcoming Blink 182 shows!

Each command line that is passed through to the terminal is logged on the text file, followed shortly by the data that was requested and hopefully retrieved. If no data was found, only the command line is logged in the text file. so we can even leave a trail letting us know what kind of commands do not produce data/sucessful requests. (As far as catch functions, didn't go into to much depth, perhaps later I can incorporate inquirer and use that instead of command line and reprompt questions with the catch functions later on).

There are probably a lot of other ways to do this, but this way seemed to work for me and provides a seemlingly intuitive for a user to quickly enter in commands and get results



# App in action
Here are some Gifs of the App in action!!!: 

1. [Spotify, Movie, Concert Commands](https://recordit.co/whkWMW1Xeo) 
2. [Do-What-it-Says Command with Random.txt](https://recordit.co/z9SSVs12UE)



 # Questions?
Developed and Maintained by Me, [A. Rodondi](https://github.com/atrodondi)
 