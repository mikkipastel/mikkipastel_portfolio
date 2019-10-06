// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const builderFunction = functions.region('asia-east2').https;

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

let rtdb = admin.database();
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
let firestore = admin.firestore();
let limit = 20;
// let pageLimit = 10;
exports.blog = builderFunction.onRequest(async (request, response) => {
    var data = {};
    const result = [];
    const blogCollection = firestore.collection('blog');

    let query;
    let isGetBlogContent = false;
    if (request.query.id != null) {
        query = blogCollection.where("id", "==", request.query.id)
        isGetBlogContent = true;
        //query = blogCollection.doc(request.query.id)
    } else if (request.query.tag != null) {
        query = blogCollection.where("label", "array-contains", request.query.tag).orderBy("published", "desc").limit(limit);
    } else if (request.query.q != null) {
        query = blogCollection.where("content", ">", request.query.q).where("content", "<", request.query.q).limit(limit);
    // } else if (request.query.page != null) {
    //     query = query.startAfter(lastId);
    } else {
        query = blogCollection.orderBy("published", "desc").limit(limit);
    }

    query.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return response.status(404).send();
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

                if (isGetBlogContent) {
                    blogElement.published = blog.published;
                    blogElement.content = blog.content;
                    data = blogElement;
                } else {
                    blogElement.shortDescription = blog.shortDescription;
                    result.push(blogElement);
                }
            });

            response.contentType('application/json');   
            if (!isGetBlogContent) {
                data.items = result;
            }
            response.send(data);

            //paging for lazy load
            // let last = snapshot.docs[snapshot.docs.length - 1];
            // let next = query.startAfter(last.data().id).limit(pageLimit);
            // next.get().then((snapshot) => {
            //     console.log('Num results:', snapshot.docs.length);
            //     console.log(snapshot.docs);
            // });
        })    
        .catch((err) => {        
            console.log('Error getting documents', err);
        });
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