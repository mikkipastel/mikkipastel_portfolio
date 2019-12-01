// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const builderFunction = functions.region('asia-east2').https;

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const cors = require('cors')({origin: true});

const rtdb = admin.database();
exports.musiclist = builderFunction.onRequest(async (request, response) => {
  if (request.method == 'GET') {
     var ref = rtdb.ref("music");
     ref.once("value", function(snapshot) {
       response.contentType('application/json');
       response.send(JSON.stringify(snapshot.val()));
     });
  }
});

//TODO: Billing account not configured. External network is not accessible and quotas are severely limited.
const firestore = admin.firestore();
let limit = 20;
exports.blog = builderFunction.onRequest(async (request, response) => {
    cors(request, response, () => {
        var data = {};
        const result = [];
        const blogCollection = firestore.collection('blog');

        let lastPublished;
        let query;
        if (request.query.tag && request.query.tag != "all") {
            query = blogCollection.where("label", "array-contains", request.query.tag).orderBy("published", "desc");
        } else {
            query = blogCollection.orderBy("published", "desc");
        }

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
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        });
    })
});

exports.content = builderFunction.onRequest(async (request, response) => {
    cors(request, response, () => {
        var data = {};
        var blogElement = {};

        firestore.collection('blog').where("id", "==", request.query.id).get().then(snapshot => {
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
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        });
    })
});

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
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        });
});