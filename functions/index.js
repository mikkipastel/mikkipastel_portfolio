// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const builderFunction = functions.region('asia-east2').https;

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const rtdb = admin.database();

const express = require('express');
const cors = require('cors')({origin: true});

const appHello = express();
appHello.get('/', function (request, response) {
    response.send('Hello World!')
 });
exports.hello = builderFunction.onRequest(appHello);

const appMusic = express();
appMusic.get('/', function (request, response) {
    var ref = rtdb.ref("music");
    ref.once("value", function(snapshot) {
        response.contentType('application/json');
        response.send(JSON.stringify(snapshot.val()));
    });
    return response;
})
exports.musiclist = builderFunction.onRequest(appMusic);

//TODO: Billing account not configured. External network is not accessible and quotas are severely limited.
const firestore = admin.firestore();
let limit = 20;

const appBlog = express();
appBlog.get('/', function (request, response) {
    var data = {};
    const result = [];
    const blogCollection = firestore.collection('blog');

    let lastPublished;
    let query = blogCollection.orderBy("published", "desc");

    if (request.query.published) {
        query = query.startAfter(request.query.published)
    }

    query.limit(limit).get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return response.status(404).send('No matching documents.');
        }
                
        snapshot.forEach(doc => {   
            var blogElement = {};
            var blog = doc.data();
            console.log(blog);  
                    
            blogElement.id = blog.id;
            blogElement.url = blog.url;
            blogElement.title = blog.title;
            blogElement.label = blog.label;
            blogElement.coverUrl = blog.coverUrl;
            blogElement.shortDescription = blog.shortDescription;
            result.push(blogElement);
            lastPublished = blog.published;
        });

        response.contentType('application/json');   
        data.items = result;
        data.lastPublished = lastPublished;
        response.send(data);
        return response;
    })    
    .catch((err) => {        
        console.log('Error getting documents', err);
        return response.status(404).send('Error getting documents.');
    });
})

appBlog.get('/tag/:tag', function (request, response) {
    var data = {};
    const result = [];
    const blogCollection = firestore.collection('blog');

    let lastPublished;
    let query = blogCollection.where("label", "array-contains", request.params.tag).orderBy("published", "desc");

    if (request.query.published) {
        query = query.startAfter(request.query.published)
    }

    query.limit(limit).get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return response.status(404).send('No matching documents.');
        }
                
        snapshot.forEach(doc => {   
            var blogElement = {};
            var blog = doc.data();
            console.log(blog);  
                    
            blogElement.id = blog.id;
            blogElement.url = blog.url;
            blogElement.title = blog.title;
            blogElement.label = blog.label;
            blogElement.coverUrl = blog.coverUrl;
            blogElement.shortDescription = blog.shortDescription;
            result.push(blogElement);
            lastPublished = blog.published;
        });

        response.contentType('application/json');   
        data.items = result;
        data.lastPublished = lastPublished;
        response.send(data);
        return response;
    })    
    .catch((err) => {        
        console.log('Error getting documents', err);
        return response.status(404).send('Error getting documents.');
    });
})

appBlog.get('/id/:id', function (request, response) {
    var data = {};
    var blogElement = {};

    console.log(request.params.id);
    firestore.collection('blog').where("id", "==", request.params.id).get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return response.status(404).send();
        }
                
        snapshot.forEach(doc => {   
            var blog = doc.data();
            console.log(blog);  
                    
            blogElement.id = blog.id;
            blogElement.url = blog.url;
            blogElement.title = blog.title;
            blogElement.label = blog.label;
            blogElement.coverUrl = blog.coverUrl;
            blogElement.published = blog.published;
            blogElement.content = blog.content;
        });

        response.contentType('application/json');
        data.data = blogElement;
        response.send(data);
        return response;
    })    
    .catch((err) => {        
        console.log('Error getting documents', err);
        return response.status(404).send('Error getting documents.');
    });
})
exports.blog = builderFunction.onRequest(appBlog);

exports.activity = builderFunction.onRequest(async (request, response) => {
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
});