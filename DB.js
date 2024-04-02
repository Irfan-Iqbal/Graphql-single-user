const mongoose = require("mongoose");
const db =
  "mongodb+srv://bhattiirfaniqbal:LOfDOE794KvpITbL@cluster0.eqi5aoi.mongodb.net/";
mongoose.set("strictQuery", true);
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log("MongoDb is not connected", error);
    process.exit(-1);
  });
