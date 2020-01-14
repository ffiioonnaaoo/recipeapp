import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'



const RecipeByNutrition = ({id, title, protein, calories, fat, carbs}) => {
    return(
        <Link to = {`/fullrecipe-by-nutrition?id=${id}`}>
        <div id="recipe-by-nitrition-result-container">
        <div>
            <h2>{title}</h2>
            <img className="recipeImg" src={`https://spoonacular.com/recipeImages/${id}-240x150.jpg`} alt="food"></img>
        </div>
        <div>
            <p className="nutritional-value-label">Calories per 100g:  <span className="nutritional-value"> {calories} kCal</span> </p>
            <p className="nutritional-value-label">Carbohydrates per 100g: <span className="nutritional-value">  {carbs}</span> </p>
            <p className="nutritional-value-label">Fat per 100g: <span className="nutritional-value">  {fat}</span> </p>
            <p className="nutritional-value-label">Protein per 100g:<span className="nutritional-value">   {protein}</span> </p>
        </div>
        </div>
        </Link>
    );
}

export default RecipeByNutrition;