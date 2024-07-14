import passport from "passport";
import { Strategy } from "passport-local";
import { MongoClient } from "mongodb";

export default function localStrategy(passport) {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        const url =
    "mongodb+srv://saksben2:3Na1MoIQu4fE6fQB@globomantics.3v6qzpv.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics";
  const dbName = "globomantics";

  (async function validateUser() {
    let client;
    try {
        client = await MongoClient.connect(url)
        console.log('Connected to the mongo db!')
        const db = client.db(dbName)
        const user = await db.collection('users').findOne({username})
        if (user && user.password === password) {
            done(null, user)
        } else {
            done(null, false)
        }
    } catch (error) {
        console.log(error)
    }
    client.close()
  })

        // const user = { username, password, name: "Benjamin" };
        // return done(null, user);
      }
    )
  );
}
