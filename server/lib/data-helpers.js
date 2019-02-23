"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to Db
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Deletes tweet in 'db'
    deleteTweet: function(id) {
      let idDel = id;
      db.collection("tweets").remove({ id: idDel });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets")
        .find()
        .toArray(callback);
    }
  };
};
