const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
fs = require('fs');
const util = require('util');
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
// Get pushSubscription object
  const subscription = req.body;
 //fs.writeFile('sub.json',util.inspect(req.body, {depth: //null}), function(err){
 //if(err) return console.log(err);
 //console.log('Hello World > helloworld.txt');
//});

// Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({title: "50% off all i-phones", body:"Today only for all our loyal customers enjoy 50% off on out top i-phones"});

  // Pass object into sendNotification
webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

 // const payload = JSON.stringify({ title: "50% off all awesome web designers" });
//let rawdata = fs.readFileSync('sub.json');
//let sub = JSON.parse(rawdata);
//webpush
  //  .sendNotification(sub, payload)
    //.catch(err => console.error(err));

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
