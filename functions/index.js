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

// set regions
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ region: 'asia-east2' });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.hello = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send('Hello World!');
});

// Get firestore to create API
const firestore = getFirestore();
const express = require('express');
const appPortfolio = express();
const cors = require("cors");
appPortfolio.use(cors());

// Portfolio:: activity
appPortfolio.get('/activites', function (request, response) {
    var data = {};
    const result = [];

    firestore.collection('activity').orderBy("time", "desc").get()
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

    firestore.collection("portfolioWebApp").orderBy("year", "desc").get()
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