const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/stepwise', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// API route
app.post('/api/signup', async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered." });

    const user = new User({ email });
    await user.save();
    res.status(201).json({ message: "User email saved successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://<YOUR-IP>:${PORT}`);
});
