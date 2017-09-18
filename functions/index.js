const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countEntriesChange = functions.database.ref('/entries/{entryId}').onWrite(event => {
  const itemRef = event.data.ref;
  const parentRef = itemRef.parent;
  const countRef = admin.database().ref('/entryCount')

  // Return the promise from countRef.transaction() so our function 
  // waits for this async event to complete before it exits.
  return countRef.transaction(current => {
    if (event.data.exists() && !event.data.previous.exists()) {
        var newValue = (current || 0) + 1;
        itemRef.child('id').set(newValue - 1);
        itemRef.child('created').set(event.timestamp);
        admin.database().ref('/lastentry').set(event.timestamp);

        return newValue;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
        var newValue = (current || 0) - 1;

        parentRef.once('value').then(snapshot => {
            let childCount = 0;
            snapshot.forEach(function(child) {
                //child.child('id').set(childCount++);
                console.log("Updating child", child);
            });
        });

        return newValue;
    }
  }).then(() => {
    console.log('Counter updated.');
  });
});