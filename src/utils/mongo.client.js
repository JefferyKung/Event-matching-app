import * as Realm from 'realm-web';

export const app = new Realm.App({ id: import.meta.env.VITE_REALM_APP_ID })

const credentials = Realm.Credentials.anonymous()

// export const user = async () => {
//       await app.logIn(credentials);
//      };

export const user =  await app.logIn(credentials);


//connect to the database
const mongo = app.currentUser.mongoClient("mongodb-atlas")
export const collectionEvent = mongo.db("node-final-project-db").collection("node-final-project-event")
export const collectionUser = mongo.db("node-final-project-db").collection("node-final-project-user")