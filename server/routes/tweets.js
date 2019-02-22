"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require("express");
const escapeHTML = require("escape-html");
const tweetsRoutes = express.Router();

//Generates new id for each tweet created
function generateRandomString() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = function(DataHelpers) {
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  // Get the id of the tweet as a parameter
  tweetsRoutes.delete("/:id", function(req, res) {
    let id = req.params.id;
    DataHelpers.deleteTweet(id);
    res.sendStatus(202);
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: "invalid request: no data in POST body" });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: escapeHTML(req.body.text)
      },
      created_at: Date.now(),
      id: generateRandomString()
    };

    DataHelpers.saveTweet(tweet, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;
};
