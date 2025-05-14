// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));  // Static folder for image uploads

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// User Schema and Model (for registration and login)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },  // Password is optional for profile update
});

const User = mongoose.model('User', userSchema);

// Profile Schema and Model (for storing profile data)
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  age: { type: Number },
  study: { type: String },
  dob: { type: Date },
  profilePicture: { type: String },
});

const Profile = mongoose.model('Profile', profileSchema);

// Set up Multer for file uploads (profile picture)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save the file in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  }
});

const upload = multer({ storage: storage });

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ success: true, message: 'Registration successful' });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, message: 'Login successful', token, user: { name: user.name } });
});

// Profile Route - Handle profile creation and image upload (No token required)
app.post('/profile', upload.single('profilePicture'), async (req, res) => {
  const { name, phone, age, study, dob } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    // Create a new profile (no need for user validation)
    const newProfile = new Profile({
      name,
      phone,
      age,
      study,
      dob,
      profilePicture,
    });

    await newProfile.save();

    res.status(200).json({ success: true, message: 'Profile created successfully', profile: newProfile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating profile', error: err.message });
  }
});

// Serve Profile Page (HTML)
app.get("/profile.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

// Serve the Homepage (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
