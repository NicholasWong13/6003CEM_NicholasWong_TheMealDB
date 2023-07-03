const axios = require('axios');

const apikey = '1';
const title = 'lamb';

const querystr = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${title}`;

axios.get(querystr).then( (response) =>{


console.log(response.data.meals[2].strMeal);
console.log(response.data.meals[2].strArea);


}
);