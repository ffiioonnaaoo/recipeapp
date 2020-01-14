import React, { useState, useEffect } from 'react';
import './Home.css';
import RecipeByNutrition from '../MainApp/RecipeByNutrition';




//`https://api.spoonacular.com/recipes/findByNutrients?apiKey=26763bea1bd2420aa675ab058bc3d558&maxCalories=${sliderValue.calories}&maxCarbs=${sliderValue.carbs}&maxFat=${sliderValue.fat}&maxProtein=${sliderValue.protein}&number=2`
const FoodByNutrition = () => {

    //const API_KEY_1 = '26763bea1bd2420aa675ab058bc3d558'
    const API_KEY_2 = '00603cab25754afca510b64fbdb1709f'

    const [ sliderValue, setSliderValue ] = useState({
        calories:0,
        carbs:0,
        fat:0,
        protein:0
    });

    const [ recipes, setRecipes ] = useState([]);


   
    
    const handleChange = (e) => {
        e.preventDefault();
        setSliderValue({
            ...sliderValue, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        handleClick();
      
    },[]);
    const API_KEY_1 = '26763bea1bd2420aa675ab058bc3d558'

    const handleClick = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=${API_KEY_1}&maxCalories=${sliderValue.calories}&maxCarbs=${sliderValue.carbs}&maxFat=${sliderValue.fat}&maxProtein=${sliderValue.protein}&number=4`);
        const data = await response.json();
        console.log(data)
        setRecipes(data)
  

    } 

    return (
        <div id="sliderPage">
        <h1>Choose healthy recipes and get control of your diet.</h1>   
            <div className="slideContainer">
          
                <div className="slider-div">
                    <p>Calories: {sliderValue.calories} kCal</p>
                    <input id="cal" type="range" min="1" max="1000" className="slider" name="calories" 
                    value={sliderValue.calories} 
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
                </div>
                <div  className="slider-div">
                    <p>Carbohyrates: {sliderValue.carbs}g</p>
                    <input id="carbs" type="range" min="1" max="500" className="slider" name="carbs" 
                    value={sliderValue.carbs} 
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
                </div>
                <div  className="slider-div">
                    <p>Select fat: {sliderValue.fat}g</p>
                    <input id="fat" type="range" min="1" max="500" className="slider" name="fat" 
                    value={sliderValue.fat} 
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
                </div>
                    <div  className="slider-div">
                    <p>Select protein: {sliderValue.protein}g</p>
                    <input id="protein" type="range" min="1" max="500" className="slider" name="protein" 
                    value={sliderValue.protein} 
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
                </div>
                    <button onClick ={handleClick}>SELECT</button>
                  
            </div>
        <div id="recipe-by-nutrition-main">
  {
      recipes.map(recipe => (
          <RecipeByNutrition 
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          calories={recipe.calories}
          fat={recipe.fat}
          carbs={recipe.carbs}
          protein={recipe.protein}
          />
      ))
    
  }
  
  
  </div>
    
   
        </div>
    );
}

export default FoodByNutrition;
