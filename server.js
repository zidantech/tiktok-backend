import express from 'express';
import mongoose from 'mongoose';

import data from './data.js';
import Videos from './dbModel.js';


//app config
const app = express();
const port = 9000;

//middlewares
app.use(express.json());
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next();
});

//DB config
const connection_url = 'mongodb+srv://zidan:My1xptsozRDxR94J@cluster0.bd2jh.mongodb.net/tiktok?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(connection_url, {
    // useNewUrlParser: true,      // Parses MongoDB connection string properly
    // useUnifiedTopology: true,  // Uses new MongoDB driver topology
});

//api endpoints
app.get ('/', (req, res) => res.status(200).send("helloworld"));

app.get('/v1/posts', (req, res) => res.status(200).send(data));

app.get('/v2/posts', (req, res) => {
    Videos.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post('/v2/posts', async (req, res) => {
    // POST request to add data to the database
    // const dbVideos = req.body;

    try {
      const createVideo = await Videos.create(dbVideos); // Use async/await here
      res.status(201).send(createVideo);
    } catch (err) {
      console.error("Error creating video:", err);
      res.status(500).send(err);
    }
  })

//listen
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));
