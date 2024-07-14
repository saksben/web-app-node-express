import express from "express";
import passport from "passport";
import { MongoClient, ObjectId } from "mongodb";

const authRouter = express.Router()

authRouter.route('/signUp').post((req, res, next) => {
    // res.json(req.body)
    // TODO create user
    const {username, password} = req.body
    const url =
    "mongodb+srv://saksben2:3Na1MoIQu4fE6fQB@globomantics.3v6qzpv.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics";
  const dbName = "globomantics";

  (async function addUser() {
    let client;
    try {
        client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const user = {username, password}
        const results = await db.collection('users').insertOne(user)
        console.log(results)
        req.login(results.ops[0], () => {
            res.redirect('/auth/profile')
        })
    } catch (error) {
        console.log(error)
    }
    client.close()
  })
    // req.login(user, (err) => {
    //     if (err) {return next(err)}
    //     res.redirect('/auth/profile')
    // })
    req.login(req.body, () => {
        res.redirect('/auth/profile')
    })
})

authRouter.route('/signIn').get((req, res) => {
    res.render('signIn')
}).post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/',
}))

authRouter.route('/profile').get((req, res) => {
    res.json(req.user)
})

export default authRouter