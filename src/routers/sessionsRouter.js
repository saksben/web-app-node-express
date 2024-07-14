import express from "express";
import sessions from "../data/sessions.json" assert { type: "json" };
import { MongoClient, ObjectId } from "mongodb";
import speakerService from "../services/speakerService.js";

const sessionsRouter = express.Router(); // Creates a router for endpoints

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

// At the sessionsRouter '/' endpoint (i.e. '/sessions/'), render the {sessions} data json object
sessionsRouter.route("/").get(async (req, res) => {
  const url =
    "mongodb+srv://saksben2:3Na1MoIQu4fE6fQB@globomantics.3v6qzpv.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics";
  const dbName = "globomantics";

  //   (async function mongo() {
  let client;
  try {
    client = await MongoClient.connect(url);
    console.log("Connected to the mongo db!");

    const db = client.db(dbName);

    //   Insert the sessions data if not already inserted
    const sessionCount = await db.collection("sessions").countDocuments();
    if (sessionCount === 0) {
      await db.collection("sessions").insertMany(sessions);
    }

    //   Fetch the sessions data
    const sessions = await db.collection("sessions").find().toArray();
    res.render("sessions", { sessions });
  } catch (error) {
    console.log(error);
  } finally {
    if (client) {
      await client.close();
    }
  }
  // res.render("sessions", { sessions }); // For using with hard coded json file
});

// At the sessionsRouter '/1' endpoint (i.e. '/sessions/1'), render the json data at session[id]
sessionsRouter.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  const url =
    "mongodb+srv://saksben2:3Na1MoIQu4fE6fQB@globomantics.3v6qzpv.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics";
  const dbName = "globomantics";

  //   (async function mongo() {
  let client;
  try {
    client = await MongoClient.connect(url);
    console.log("Connected to the mongo db!");

    const db = client.db(dbName);

    //   Insert the sessions data if not already inserted
    const sessionCount = await db.collection("sessions").countDocuments();
    if (sessionCount === 0) {
      await db.collection("sessions").insertMany(sessions);
    }

    //   Fetch the sessions data
    const session = await db
      .collection("sessions")
      .findOne({ _id: new ObjectId(id) });

    const speaker = await speakerService.getSpeakerById(session.speakers[0].id);
    session.speaker = speaker.data;

    res.render("session", {
      session,
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (client) {
      await client.close();
    }
  }

  // For use with hard coded json file
  // res.render('session', {
  //   session: sessions[id],
  // });
});

export default sessionsRouter;
