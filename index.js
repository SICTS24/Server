const express = require('express');
const readline = require('readline');

const app = express();

// Middleware to parse JSON bodies
let data = {};

app.use(express.json());

// Middleware for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Utility function to get the current time with hour, minute, second, and millisecond
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  return `${hours}h:${minutes}m:${seconds}s:${milliseconds}ms`;
};

app.post('/', (req, res) => {
  const requestTime = getCurrentTime();
  let schoolName = req.body.school;
  Object.assign(data, { [schoolName]: requestTime });
  console.log(schoolName, requestTime);
  res.json({ schoolName, requestTime });
});

app.get("/", (req, res) => {
  console.log("cat");
  res.send("Hello World");
});

app.get("/data", (req, res) => {
  res.send(data);
});

app.get("/delete", (req, res) =>{
  data = {};
  console.log('Data cleared.');
  res.send("data cleared");
});

//const PORT = process.env.PORT || 4000;
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Setup readline interface for capturing key presses
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Listen for 'a' key press to clear data
rl.on('line', (input) => {
  if (input === 'a') {
    data = {};
    console.log('Data cleared.');
  }
});

export default app