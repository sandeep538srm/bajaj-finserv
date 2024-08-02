const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (
      typeof item === "string" &&
      item.length === 1 &&
      /^[A-Za-z]$/.test(item)
    ) {
      alphabets.push(item);
    }
  });

  const highestAlphabet = alphabets.length
    ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
    : [];

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet,
  });
});

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
