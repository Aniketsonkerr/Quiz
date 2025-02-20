import { app } from "../server/app.js";
import connectDB from "../server/db/index.js";
import dotevn from "dotenv";

dotevn.config({
  path: "../.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
  });
