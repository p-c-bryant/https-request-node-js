// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');

function printMessage(name, badges, points) {
  const message = `${name} has ${badges} badge(s) and ${points} points!`;
  console.log(message);
}

function get(username) {
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      // Read the data
      let body = "";
      response.on('data', data => {
        body += data.toString();
      });
      
      response.on('end', () => {
        // Parse the data
        const profile = JSON.parse(body);
        // Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript);
      });
    
    });
  
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports.get = get;