/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

const express = require('express');
//var functions = firebase.app().functions('asia-east2');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.hello = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send('Hello World!');
});

const firestore = getFirestore();
let limit = 20;

const appPortfolio = express();

// Portfolio:: activity
appPortfolio.get('/activites', function (request, response) {
    var data = {};
    const result = [];

    firestore.collection('activity').orderBy("published", "desc").limit(limit).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return response.status(404).send();
            }
            
            snapshot.forEach(doc => {    
                console.log(doc.data());
                result.push(doc.data());
            });
            data.items = result;
            response.contentType('application/json');
            response.send(data);
            return response;
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        })
})

// Portfolio:: Publish Application
appPortfolio.get('/android-apps', function (request, response) {
    var data = {};
    const result = [];

    firestore.collection('portfolioAndroidApp').orderBy("year", "desc").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return response.status(404).send();
            }
            
            snapshot.forEach(doc => {    
                console.log(doc.data());
                result.push(doc.data());
            });
            data.items = result;
            response.contentType('application/json');
            response.send(data);
            return response;
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        })
})

// Portfolio:: // Portfolio:: Publish Application
appPortfolio.get('/android-projects', function (request, response) {
    var data = {};
    const result = [];

    firestore.collection('portfolioAndroidProject').orderBy("year", "desc").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return response.status(404).send();
            }
            
            snapshot.forEach(doc => {    
                console.log(doc.data());
                result.push(doc.data());
            });
            data.items = result;
            response.contentType('application/json');
            response.send(data);
            return response;
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        })
})

// Portfolio:: Web Application / Chatbot
appPortfolio.get('/web-apps', function (request, response) {
    var data = {};
    const result = [];

    firestore.collection('portfolioWebApp').orderBy("year", "desc").limit(limit).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return response.status(404).send();
            }
            
            snapshot.forEach(doc => {    
                console.log(doc.data());
                result.push(doc.data());
            });
            data.items = result;
            response.contentType('application/json');
            response.send(data);
            return response;
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        })
})
exports.portfolio = onRequest(appPortfolio);