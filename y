rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true; // Allow read access to all documents
      allow write: if request.auth != null; // Allow write access only if the user is authenticated
    }
  }
}
