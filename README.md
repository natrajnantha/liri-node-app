# liri-node-app
LIRIBOT - LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRIBOT LIRI.JS uses the below node packages 
* node-spotify-api - This is a SPOTIFY NPMJS package that gets album information
* request - This package is used by imdb API call for getting movie information and bands-in-town API for concerts in town
* moments - To reformat date and time
* fs - to perform file opterations

All the above package dependencies are in package.json and npm install would automatically install these packages in user machine. 

LIRIBOT LIRI.js would perform the following commands. The results of these commands will be displayed on the console as well as appended to the log.txt file.

* concert-this
    The syntax is "node liri.js concert-this <artist/band name here>. The program will call the bands-in-town API for matching information and the same would be 
    displayed on the console as well as the results will be appended to the log.txt file as well. 
    If no artist information is provided, then the program will default to "Shawn Mendes". 
    If no matching inforation is retured by the API, the program will display "No matching Concerts found in Bandsintown". 

* spotify-this-song
    The syntax is "node liri.js spotify-this-song <song name here>". 

* movie-this

* do-what-it-says

