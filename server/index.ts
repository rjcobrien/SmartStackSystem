import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Basic route
app.get("/", (req, res) => {
  res.send("✅ It works! SmartStackSystem server is live.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
