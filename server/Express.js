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
    <title>Meals - RESTful API</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      h1 {
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
        color: #4CAF50;
        text-shadow: 2px 2px 5px #30d5c8;
      }

      h2 {
        margin-top: 30px;
        text-shadow: 2px 2px 5px red;
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
        background-color: #424ef5;
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
      <h1>Meals - RESTful API</h1>

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
        <h2>Update Meals</h2>
        <form action="/updateMeals" method="GET">
        <label for="id">Meal ID:</label>
        <input type="text" name="id" id="id" required><br>
        <label for="title">Name:</label>
        <input type="text" name="title" id="title" required><br>
        <label for="url">Category:</label>
        <input type="text" name="category" id="category" required><br>
        <input type="submit" class="button" value="Update Meals">
        </form>
      </div>

          <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Example meal row -->
        <tr>
          <td>Meal Title</td>
          <td>Meal Description</td>
          <td>Meal URL</td>
          <td>
            <button onclick="editMeal('mealId')">Edit</button>
          </td>
        </tr>
        <!-- Add more meal rows dynamically -->
      </tbody>
    </table>

    <!-- Update form -->
    <form id="updateForm" style="display: none;">
      <input type="text" id="updateTitle" placeholder="Title">
      <input type="text" id="updateDescription" placeholder="Description">
      <input type="text" id="updateUrl" placeholder="URL">
      <button type="submit">Update</button>
      <button type="button" onclick="cancelUpdate()">Cancel</button>
    </form>

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

// Update Meals
app.put('/meals/:id', (req, res) => {
  const mealId = req.params.id;
  const { title, description, url } = req.body;

  // Find the meal in the database by its ID and update its fields
  Meal.findByIdAndUpdate(
    mealId,
    { title, description, url },
    { new: true }
  )
    .then(updatedMeal => {
      if (!updatedMeal) {
        // If the meal with the specified ID doesn't exist, return an error response
        return res.status(404).json({ error: 'Meal not found' });
      }

      // Return a success response with the updated meal
      res.json(updatedMeal);
    })
    .catch(error => {
      // If an error occurs, return an error response
      res.status(500).json({ error: 'An error occurred while updating the meal' });
    });
});

// Delete Meals
app.post('/deleteMeals', (req, res) => {
  const { mealId } = req.body;

  Meal.findByIdAndDelete(mealId)
    .then(() => {
      res.send(`
        <h1>Meal deleted successfully</h1>
        <button onclick="goBack()">Go Back</button>
        <script>
          function goBack() {
            window.history.back();
          }
        </script>
      `);
    })
    .catch(error => {
      console.error("Error: ", error);
      res.send(`
        <h1>An error occurred while deleting the meal</h1>
        <button onclick="goBack()">Go Back</button>
        <script>
          function goBack() {
            window.history.back();
          }
        </script>
      `);
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