const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://mayurimadar47:bgA0ZXvQnPqzpmoD@cluster0.fp8b3mw.mongodb.net/", {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define Mongoose schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  msg: String
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Assuming your HTML files are in a 'public' directory

// Route to handle form submission
app.post("/register", (req, res) => {
  const { name, email, pass, c_pass } = req.body;

  // Check if passwords match
  if (pass !== c_pass) {
    return res.status(400).send("Passwords do not match");
  }

  // Create a new user instance
  const newUser = new User({
    name,
    email,
    password: pass
  });

  // Save the user to the database
  newUser
    .save()
    .then(() => res.send("User registered successfully"))
    .catch((err) => res.status(500).send(err));
});

app.post('/submit-form', (req, res) => {
  const { name, email, number, msg } = req.body;

  // Create a new contact object
  const newContact = new Contact({
    name,
    email,
    number,
    msg
  });

  // Save the contact object to the database
  newContact.save()
    .then(() => {
      console.log('Contact form data saved successfully');
      res.send('Form submitted successfully');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error saving form data');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
