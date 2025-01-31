var admin = require("firebase-admin");

var serviceAccount = require("../key/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const AdminAuth = admin.auth();

export { AdminAuth };
