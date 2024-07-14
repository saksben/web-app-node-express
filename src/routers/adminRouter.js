import express from "express";
import { MongoClient } from "mongodb";
import sessions from "../data/sessions.json" assert { type: "json" };

const adminRouter = express.Router();

adminRouter.route("/").get(async (req, res) => {
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
    const sessionData = await db.collection("sessions").find().toArray();
      res.json(sessionData);
    } catch (error) {
      console.log(error);
    } finally {
      if (client) {
        await client.close();
      }
    }
//   })();
});

export default adminRouter;
