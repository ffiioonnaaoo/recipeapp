import React, { useState, useEffect } from 'react';
import './Home.css';
import Join from '../Forms/Join'




const CalorieSearch = () => {

    const [ query, setQuery ] = useState('');
    const [ nutritionData, setNutritionData ] = useState({
        'calories':'',
        'healthLabels':[]
    });

    useEffect(() => {
        handleClick();
    },[]);

const handleClick =  async (e) => {
    const APP_ID = '0716f59a';
    const API_KEY = '757cdf3ed75053ea0d64f2307241bc1f';

    try{
        const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${query}`);
        const data = await response.json();
        console.log(data)
        setNutritionData({
            calories:data.calories,
            'healthLabels':data.healthLabels
        })
        console.log('nutrition data is '+ nutritionData.calories)
    } catch(error){
        console.log(error.message)
    }
}



console.log(query)

    return (
        <div id="caloriePage">
            <h3>Find our how many calories are in your food</h3>
        <div className="searchContainer">
            <input type="text" name="query"  
            value={query} 
            onChange={(event)=> setQuery(event.target.value)}   
            onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
            <button  onClick={handleClick}>SUBMIT</button>
            
        </div>
        <div className="calorieResult">
            {nutritionData.calories ? <p>{nutritionData.calories} calories</p> : null }
            </div>
     <div className="under">
     <Join />
     </div> 
     <div className="under">
     <Join />
     </div>      
        </div>
    );
}

export default CalorieSearch;
