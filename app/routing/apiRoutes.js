// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information
// ===============================================================================

var friendsData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // friendsData.push(req.body);

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Parse the user submitted form
    var userData  = req.body;
    var userName  = userData.name;
    var userPhoto   = userData.photo;
    var userScores  = userData.scores;

    var totalDifference = 0;

    // Loop through all the friends
    for  (var i=0; i< friendsData.length; i++) {

      // Loop through the scores of each friend
      for (var j=0; j< friendsData[i].scores[j]; j++){

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]);

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference){

          // Reset the bestMatch to be the new friend. 
          bestMatch.name = friendsData[i].name;
          bestMatch.photo = friendsData[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    friendsData.push(userData);

    res.json(bestMatch);
      
  });

};