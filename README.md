# Tweeter Project

Tweeter single-page Twitter clone that allows users to post a tweet-like comment within the app feed.

## Features

- Responsive Web App (Using CSS media queries for an optimum performance across all devices)
- Persistent database (MongoDb)
- Delete button
- Toogle Compose button
- Elements micro-animation

## Screenshots

![alt text](screenshot1.png "Homepage")

![alt text](screenshot2.png "Compose")

![alt text](screenshot3 "Tweets")

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.
5. Use the "Compose" button to toogle the text area
6. Write your 'Tweet'
7. Share it through the 'Tweet' button

## Functionality

Single-page app that allows users post a tweet-like comment. User names and tags generated randomly as of now. Tweets are persistent through MongoDB. Login and register functionalities to be added soon.

## Dependencies

- Node.js
- Express
- Body Parser
- MongoDB
- Chance
- Md5
- escapeHTML

### Dev Dependencies

- Nodemon
