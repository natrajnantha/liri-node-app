# liri-node-app
LIRIBOT - LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRIBOT LIRI.JS uses the below node packages 
* node-spotify-api - This is a SPOTIFY NPMJS package that gets album information
* request - This package is used by imdb API call for getting movie information and bands-in-town API for concerts in town
* moments - To reformat date and time
* fs - to perform file opterations

All the above package dependencies are in package.json and npm install would automatically install these packages in user machine. 

* API KEY INFO

    The program needs API keys for spotify, imdb and bandsintown. The user can supply the API keys in the .env file in the below format and the program would automatically use it thru the
    keys.js file.
    SPOTIFY_ID=<>
    SPOTIFY_SECRET=<>
    IMDBKEY=<>
    BANDKEY=<>


LIRIBOT LIRI.js would perform the following commands. The results of these commands will be displayed on the console as well as appended to the log.txt file. 

* concert-this
    
    The syntax is "node liri.js concert-this <artist/band name here>. The program will call the bands-in-town API for matching information and the same would be 
    displayed on the console as well as the results will be appended to the log.txt file as well. 
    If no artist information is provided, then the program will default to "Shawn Mendes". 
    If no matching inforation is retured by the API, the program will display "No matching Concerts found in Bandsintown". 
    Below are the information that would be displayed from the bands in town API result
        
        * Name of the venue
        * Venue location
        * Date of the Event (use moment to format this as "MM/DD/YYYY")

* spotify-this-song
    
    The syntax is "node liri.js spotify-this-song <song name here>". The program will call the node-spotify-api to retrieve song information from the SPOTIFY API. 
    If song name is not given by user, then the program will default to "The Sign by Ace of Base". 
    If a matching album is not returned by SPOTIFY, then the program will display "Album not found matching to the search string".
    Below are the information that would be displayed fromt he spoitfy api.

        * Artist(s)
        * The song's name
        * A preview link of the song from Spotify
        * The album that the song is from

* movie-this

    The syntax is "node liri.js movie-this <movie name here>". The program will call the OMDB API with the supplied keys to get the movie information. 
    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 
    If no matching movie is retured by the API, then the program will display "IMDB Moive error Movie not found!". 
    Below information are retured for matching movies

        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.

* do-what-it-says

    Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. The user can give any valid liribot commands in the
    random.txt file and the program will execute the command and provide the same results as the commands described above. 

liribot demonstration video can be watched with this video link

https://drive.google.com/file/d/1Wgvb0RY2enctfTMRHNr8oAMP2RSfbvXm/view

