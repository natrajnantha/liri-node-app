require("dotenv").config();
var moment = require("moment");
var spotify = require('node-spotify-api');
var request = require("request");
var lirikeys = require("./keys.js");
var fs = require("fs");

var spotify = new spotify(lirikeys.spotify);
var userinput = "";

var arg1 = process.argv[2];
var arg2 = process.argv[3];

if (arg1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            var errTxt = ("\nRandom.txt file read error");
            console.log(errTxt);
            writeToLog(errTxt);
        } else {

            var randomTextFromFile = data.split(",");
            arg1 = randomTextFromFile[0];
            userinput = randomTextFromFile[1];
            var currentTime = moment().format("MM ddd, YYYY hh:mm:ss a")
            var userCommand = "\n\n*******************************************************\nLog time : " + currentTime + "\nUser Command in random.txt file is " + arg1 + " " + userinput + "\n";
            console.log(userCommand);
            writeToLog(userCommand);
            processLiriCommand();
        }
    });
} else {
    processUserinput();
    processLiriCommand();
};

function processLiriCommand() {
    switch (arg1) {
        case "movie-this":
            if (userinput === undefined) {
                movietitle = "Mr.+Nobody";
                errTxt = "No movie name provided by user. Default movie being used : " + movietitle;
                console.log(errTxt);
                writeToLog(errTxt);
            } else {
                temptitle = userinput.split(" ");
                movietitle = temptitle.join("+");
                errTxt = "User Movie string being used for search : " + movietitle;
                console.log(errTxt);
                writeToLog(errTxt);
            };

            processimdbreq();
            break;
        case "concert-this":

            if (userinput === undefined) {
                bandtitle = "Shawn%20Mendes";
                errTxt = "No band name provided by user. Default band being used : " + bandtitle;
                console.log(errTxt);
                writeToLog(errTxt);
            } else {
                temptitle = userinput.split(" ");
                bandtitle = temptitle.join("%20");
                bandtitle = bandtitle.substring(0, bandtitle.length - 3);
                errTxt = "User band search string being used for search : " + bandtitle;
                console.log(errTxt);
                writeToLog(errTxt);
            };
            processbandreq();
            break;
        case "spotify-this-song":

            if (userinput === undefined) {
                songtitle = "The Sign by Ace of Base";
                errTxt = "No title provided by user. Default title being used : " + songtitle;
                console.log(errTxt);
                writeToLog(errTxt);

            } else {
                temptitle = userinput.split(" ");
                songtitle = temptitle.join("%20");
                errTxt = "User title being used for search : " + songtitle;
                console.log(errTxt);
                writeToLog(errTxt);
            };

            processSpotifyReq();
            break;

        default:
            var errTxt  = "\n*****Critical Error****\nCommand " + arg1 + " not recognized by LIRIBOT. Please fix and retry.\nRecognized commands are movie-this, concert-this, spotify-this-song and do-what-it-says";
            console.log(errTxt)
            writeToLog(errTxt);
            break;
    }
};


function processSpotifyReq() {

    spotify
        .search({ type: 'track', query: songtitle, limit: 1 })
        .then(function (response) {
            var obj = response.tracks.items;
            if (obj[0] != undefined) {
                var parsedata = "\nSpofity this song info\nAlbum Artist : " + obj[0].artists[0].name +
                    "\nThe song's name : " + obj[0].name +
                    "\nThe album that song is from : " + obj[0].album.name +
                    "\nThe preview link : " + obj[0].preview_url;
                console.log(parsedata);
                writeToLog(parsedata);
            }
            else {
                console.log("Spotify Album not found matching to the search string : " + songtitle);
                writeToLog("Spotify Album not found matching to the search string : " + songtitle);
            }
        })
        .catch(function (err) {
            console.log("Spofity error encounted : " + err);
            writeToLog("Spofity error encounted : " + err);
        });
}


function processbandreq() {
    var bandLink = "https://rest.bandsintown.com/artists/" + bandtitle + "/events?app_id=" + lirikeys.bandapikey;
    request(bandLink, function (error, response, body) {

        if (response.statusCode === 200) {

            if ((body.toLowerCase().includes("not found")) || (body.toLowerCase().includes("undefined")) || (body == "[]\n")) {
                console.log("No matching Concerts found in Bandsintown. Search string used is : " + bandtitle);
                writeToLog("\nNo matching Concerts found in Bandsintown. Search string used is : " + bandtitle);
                // console.log("Band link used is " + bandLink);
                // writeToLog("Band link used is " + bandLink);
            } else {

                var obj = JSON.parse(body);
                for (let i = 0; i < obj.length; i++) {

                    var parsedata = "\nBands in town info \nVenue name : " + obj[i].venue.name +
                        "\nVenue city : " + obj[i].venue.city + "\nVenue Region : " + obj[i].venue.region +
                        "\nEvent Date : " + moment(obj[i].datetime).format('LLLL');

                    console.log(parsedata);
                    writeToLog(parsedata);
                }
            }
        } else 
        {
            var errTxt  = "\n*****Critical Error in bandsintown****\nError " + response.statusCode ;
            console.log(errTxt)
            writeToLog(errTxt);
        }
    });
}

function processimdbreq() {
    var request = require("request");
    movieLink = "http://www.omdbapi.com/?t=" + movietitle + "&y=&plot=short&apikey=" + lirikeys.imdbapikey;

    request(movieLink, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var obj = JSON.parse(body);
            if (obj.Response === "True") {
                var parsedata = "\nIMDB Moive information \nTitle of the movie: " + obj.Title +
                    "\nYear the movie came out: " + obj.Year +
                    "\nIMDB Rating of the movie: " + obj.imdbRating +
                    "\nCountry where the movie was produced: " + obj.Country +
                    "\nLanguage of the movie: " + obj.Language +
                    "\nPlot of the movie: " + obj.Plot +
                    "\nActors in the movie: " + obj.Actors;
                console.log(parsedata);
                writeToLog(parsedata);
            } else {
                console.log(obj.Error);
                writeToLog("\nIMDB Moive error " + obj.Error);

            }
        } else if (error) {
            console.log("OMDB Api link error encountered. Linke used is " + movieLink);
            writeToLog("OMDB Api link error encountered. Linke used is " + movieLink);
        }
    });
};


function processUserinput() {
    if (process.argv[3] == undefined) {
        userinput = process.argv[3];
    } else {
        for (let i = 3; i < process.argv.length; i++) {
            userinput += process.argv[i] + " ";

        }
    }
    var currentTime = moment().format("MM ddd, YYYY hh:mm:ss a")
    var userCommand = "\n\n*******************************************************\nLog time : " + currentTime + "\nUser Command is liri.js " + arg1 + " " + userinput + "\n";
    console.log(userCommand);
    writeToLog(userCommand);
}


function writeToLog(fileText) {
    fs.appendFile("log.txt", fileText, function (fileerr) {
        if (fileerr) {
            console.log("Critical Error writing to the log.txt file");
        };
    });
}



