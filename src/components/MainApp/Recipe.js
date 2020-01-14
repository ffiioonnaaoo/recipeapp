import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Recipe = ({ label, image, totalTime, uri, calories }) => {

    useEffect(() => {
        handleClick();
    },[]);
    const caloreieContent = Math.floor(calories);
    const[id, urlDiscared] = uri.split('_')[1].split('/');
    console.log(id)


    const handleClick = async (e) => {
        console.log('hello');
    }
    
    return(
   
        <Link to={`/fullrecipe?id=${id}`}> <div className="recipeItem"> 
        
                <img className="recipeImg" src={image} alt="food"></img>
                <h3>{label}</h3>
                <p>Cooking time:{totalTime} minutes</p>
                <p>Calories:{caloreieContent} kCal/serving</p>
                    
        </div></Link>
  
    );
}

export default Recipe;