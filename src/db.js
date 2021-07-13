const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    auto_reconnect:true
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch(error => {
    console.log("Failed to connect to database!!!");
    console.log(error);
  });
