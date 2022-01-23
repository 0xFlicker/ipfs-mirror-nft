import dotenv from "dotenv";
import "./ipfs.js";
import app from "./app.js";

dotenv.config();

app().then(
  () => {
    console.log("🚀 Done!");
  },
  (err) => {
    console.error(err);
  }
);
