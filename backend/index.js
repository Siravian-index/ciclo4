const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware

// DB connection
const dbURI =
  'mongodb+srv://projectAdmin:vTysu4B1l3k3r26X@oauth.d8qbt.mongodb.net/projectAdmin';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(5000, () => {
      console.log(`localhost: 5000`);
    })
  )
  .catch((err) => console.log(err));
// routes
app.get('/', (req, res) => res.send('set up'));
