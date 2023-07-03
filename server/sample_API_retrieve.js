// Run command below in browser to Get news and store to MongoDB
// Save API Date to MongoDB: http://localhost:3000/getNews?title=<your-news-title> 
// Test sample "http://localhost:3000/getNews?title=technology"

const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require('axios');

const apikey = '1';

// Get Meals
app.get('/getMeals', async (req, res) => {
    const title = req.query.title;
    const querystr = `https://www.themealdb.com/api/json/v1/${apiKey}/random.php=${title}`;
  
    try {
      const response = await axios.get(querystr);
      const meals = response.data.meals;
  
      if (!meals || meals.length === 0) {
        res.status(404).json({ message: 'No meals found' });
      } else {
        res.json(meals);
      }
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).json({ message: 'An error occurred while fetching meals' });
    }
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
