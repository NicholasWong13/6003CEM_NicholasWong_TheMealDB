const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Web_API_Nicholas:Web_API_Nicholas@gettingstarted.ne19ozt.mongodb.net/Web_API';

const apiKey = '1';

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const mealsSchema = new mongoose.Schema({
  mealsId: String,
  mealsName: String,
  mealsCategory: String,
});

const Meal = mongoose.model('Meal', mealsSchema);

module.exports = Meal; 


// Set up HTML layout with CSS styling
const htmlLayout = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Meal Time - RESTful API</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #9A7B4F;
      }

      h1 {
        color: #652A0E;
        font-family: verdana;
        font-size: 200%;
        text-align: center
      }

      h2 {
        margin-top: 30px;
      }

      form {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 10px;
      }

      input[type="text"] {
        width: 300px;
        padding: 5px;
        margin-bottom: 10px;
      }

      input[type="submit"] {
        padding: 5px 10px;
      }

      .back-button {
        background-color: #424ef5;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }

      .meals-section {
        margin-top: 30px;
        border: 1px solid #ccc;
        padding: 10px;
      }

      .meals-section p {
        margin-bottom: 10px;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #f0f0f0;
        border-radius: 5px;
        padding: 20px;
      }

      .meals-item {
        margin-bottom: 20px;
      }

      .meals-item h3 {
        margin-top: 0;
        margin-bottom: 5px;
      }

      .meals-item p {
        margin-top: 0;
        margin-bottom: 10px;
      }

      .meals-item a {
        color: #0066cc;
        text-decoration: none;
      }
      .button {
        background-color: #652A0E;
        border: none;
        color: white;
        padding: 30px 52px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    </style>
    <script>
      function goBack() {
        window.history.back();
      }
    </script>
  </head>
  <body>
    <div class="container">
      <h1>Meal Time - RESTful API</h1>
      <div class="meals-section">
        <h2>Add Meals</h2>
        <form action="/addMeals" method="POST">
          <label for="id">Meal ID:</label>
          <input type="text" name="id" id="id" required><br>
          <label for="title">Name:</label>
          <input type="text" name="title" id="title" required><br>
          <label for="url">Category:</label>
          <input type="text" name="category" id="category" required><br>
          <input type="submit" class="button" value="Add Meals">
        </form>
      </div>

      <div class="meals-section">
        <h2>Delete Meals</h2>
        <form action="/deleteMeals" method="POST">
          <label for="title">Name:</label>
          <input type="text" name="title" id="title" required><br>
          <input type="submit" class="button" value="Delete Meals">
        </form>
      </div>

      <div class="meals-section">
        <h2>Display All Meals</h2>
        <form action="/getMeals" method="GET">
          <input type="submit" class="button" value="Display All Meals">
        </form>
        <div id="meals-result"></div>
      </div>
    </div>
  </body>
  </html>
`;

// GET Meals
app.get('/getMeals', (req, res) => {
  Meal.find()
    .then(meals => {
      res.json(meals);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching meals' });
    });
});

// POST Meals
app.post('/addMeals', (req, res) => {
  const { id, title, category } = req.body;

  const meal = new Meal({
    mealsId: id,
    mealsName: title,
    mealsCategory: category,
  });

  meal.save()
    .then(result => {
      console.log("Success" + result);
      res.send(`
        <h1>Meals added successfully & saved to database</h1>
        <button onclick="goBack()">Go Back</button>
        <script>
          function goBack() {
            window.history.back();
          }
        </script>
      `);
    })
    .catch(error => {
      console.error("Error" + error);
      res.send(`
        <h1>An error occurred while adding meals</h1>
        <button onclick="goBack()">Go Back</button>
        <script>
          function goBack() {
            window.history.back();
          }
        </script>
      `);
    });
});

// Delete Meals
app.post('/deleteMeals', (req, res) => {
  const title = req.body.title;
  console.log(title);
  Record.deleteOne({ mealsStrMeal: title }, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while deleting the meal.");
    }
    res.send(`${title} deleted<br><br><button onclick="goBack()">Go Back</button>
    <script>
      function goBack() {
        window.history.back();
      }
    </script>`);
  });
});

// Render HTML layout
app.get('/', (req, res) => {
  res.send(htmlLayout);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});