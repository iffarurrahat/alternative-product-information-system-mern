const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: [
    // "http://localhost:5173",
    "https://alternative-product-info-b80e6.web.app",
    "https://alternative-product-info-b80e6.firebaseapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//verify jwt middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).send({ message: "unauthorized access" });

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      req.user = decoded;
      next();
    });
  }
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9u7odmy.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const queriesCollections = client.db("apiSystem").collection("allQueries");
    const recommendationCollections = client
      .db("apiSystem")
      .collection("recommendation");

    //jwt generate
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //Clear token on logout
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    //Get all queries data from db
    app.get("/queries", async (req, res) => {
      const limit = parseInt(req.query.limit) || 6;
      const result = await queriesCollections.find().limit(limit).toArray();
      res.send(result);
    });

    //get all queries posted by a specific user
    app.get("/queries/:email", verifyToken, async (req, res) => {
      const tokenEmail = req.user?.email;
      const email = req.params.email;

      if (tokenEmail !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { "post.email": email };
      const result = await queriesCollections.find(query).toArray();
      res.send(result);
    });

    //Get a single query data from db using job id
    app.get("/query/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: new ObjectId(id) };
      const result = await queriesCollections.findOne(cursor);
      res.send(result);
    });

    //Save a query data in db
    app.post("/queries", async (req, res) => {
      const myQuery = req.body;
      const result = await queriesCollections.insertOne(myQuery);
      res.send(result);
    });

    //update a query in db
    app.put("/query/:id", async (req, res) => {
      const id = req.params.id;
      const queryData = req.body;
      const query = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          ...queryData,
        },
      };
      const result = await queriesCollections.updateOne(
        query,
        updateDoc,
        option
      );
      res.send(result);
    });

    //delete a job data from db
    app.delete("/query/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await queriesCollections.deleteOne(query);
      res.send(result);
    });

    //<-!----Recommendation PART-->
    //Get all recommend data from db and pagination
    // <-!  Recommendation For Me Page  ->
    app.get("/recommendation", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;

      const result = await recommendationCollections
        .find()
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    //Get all recommend data count from db for pagination
    app.get("/recommendation-count", async (req, res) => {
      const count = await recommendationCollections.countDocuments();
      res.send({ count });
    });

    // Get recommendations by queryId
    app.get("/recommendation/:queryId", async (req, res) => {
      const queryId = req.params.queryId;
      const query = { queryId: queryId };
      const result = await recommendationCollections.find(query).toArray();
      res.send(result);
    });

    // Save a recommend data in db
    app.post("/recommendation", async (req, res) => {
      const recData = req.body;
      const result = await recommendationCollections.insertOne(recData);

      //update recommendation_count in recommendationCollection
      const updateDoc = {
        $inc: { recommendation_count: 1 },
      };
      const recommendQuery = { _id: new ObjectId(recData.queryId) };
      const updatedRecommendCount = await queriesCollections.updateOne(
        recommendQuery,
        updateDoc
      );

      res.send(result);
    });

    //get all recommendation posted comments by a specific user
    app.get("/recommender/:email", async (req, res) => {
      const email = req.params.email;
      const query = { recommender_email: email };
      const result = await recommendationCollections.find(query).toArray();
      res.send(result);
    });

    //delete a recommendation data from db
    app.delete("/recommendation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      // Get the recommendation to find the related queryId
      const recommendation = await recommendationCollections.findOne(query);

      const result = await recommendationCollections.deleteOne(query);

      // Decrease recommendation_count in queriesCollection
      const updateDoc = {
        $inc: { recommendation_count: -1 },
      };
      const recommendQuery = { _id: new ObjectId(recommendation.queryId) };
      const updatedRecommendCount = await queriesCollections.updateOne(
        recommendQuery,
        updateDoc
      );

      res.send(result);
    });

    //Get all queries data from db for pagination <-!  Queries Page  ->
    app.get("/all-queries", async (req, res) => {
      const size = parseInt(req.query.size);
      const page = parseInt(req.query.page) - 1;
      const sort = req.query.sort;
      const search = req.query.search;

      let options = {};
      if (sort) options = { post_time: sort === "asc" ? 1 : -1 };

      let query = {
        product_name: { $regex: search, $options: "i" },
      };

      const result = await queriesCollections
        .find(query)
        .sort(options)
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    //Get all queries data count from db
    app.get("/queries-count", async (req, res) => {
      const search = req.query.search;

      let query = {
        product_name: { $regex: search, $options: "i" },
      };

      const count = await queriesCollections.countDocuments(query);
      res.send({ count });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("API System is running");
});

app.listen(port, () => {
  console.log(`API System server is running on PORT: ${port}`);
});
