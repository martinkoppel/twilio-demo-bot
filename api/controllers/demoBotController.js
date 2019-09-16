'use strict';

var request = require("request");

exports.list_all_dangers = async function(req, res) {
    // any incidents within last 3 hours?
    var periodHours = 2;

    var endDateTime = new Date().toISOString();
    var startDateTime = new Date(Date.now() - 1000 * 60 * 60 * periodHours).toISOString();
    
    var fdnswsBaseUrl = "https://earthquake.usgs.gov/";
    var fdnswsQueryEndpoint = "fdsnws/event/1/query";
    
    var fdnswsQueryParameters = {
        "format": "geojson",
        "starttime": startDateTime,
        "endtime": endDateTime,
        "latitude": 37.341199,
        "longitude": -122.111324,
        "maxradiuskm": 50
    };

    // default state is "safe"
    var situation = {"actions": [
        { "say": "You are safe!" }
    ]};

    request.get({url: fdnswsBaseUrl + fdnswsQueryEndpoint, qs: fdnswsQueryParameters}, function(err, response, body) {
        console.log("URL: " + this.url.href)
    
        var parsedData = JSON.parse(body)

        if (parsedData.metadata.count > 0){
            for (var int in parsedData.features){
                console.log(parsedData.features[int].properties.title)
            }
            situation = {"actions": [
                { "say": "Can't say for sure!" }
            ]};
        }
        res.send(situation)
    })
   
};

