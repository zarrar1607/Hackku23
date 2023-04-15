const express = require("express");
const mongoose = require("mongoose");
const Resume = require("./models/resumemodel");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.get("/", (req, res) => {
  res.send("Hello NODE API");
});

app.get("/info", async (req, res) => {
  try {
    const resumedata = await Resume.find({});
    res.status(200).json(resumedata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/form", async (req, res) => {
  const resumedata = req.body;
  const data = new Resume(resumedata);
  try {
    await data.save();
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post("/info", async (req, res) => {
  try {
    const res = await Resume.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://mab:temp1234@nodelearn.ttlxgol.mongodb.net/form?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
