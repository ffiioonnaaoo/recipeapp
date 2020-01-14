import React, { useEffect, useState } from 'react';
import './FullRecipe.css';

const FullRecipe = () => {

     const [ recipe, setRecipe ] = useState({
    
        title: '',
        instructions:'',
        dishTypes: '',
        diets: [],
        image:'',
        ingredients:[]

    });

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    console.log(id)

    useEffect(() => {
        getData();
    
    },[]);

    const getData= async () => {
        const API_KEY_1 = '26763bea1bd2420aa675ab058bc3d558'
        const API_KEY_2 = '00603cab25754afca510b64fbdb1709f'
        
            const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_1}`);
            const data = await response.json();
            
            setRecipe({
                title: data.title,
                instructions:data.instructions,
                dishTypes:data.dishTypes,
                diets: data.diets,
                image:data.image,
                ingredients:data.extendedIngredients

                
            })  
    }






    return(
        
            <div className="full-recipe-page">
            <div className="title">
            <h3>{recipe.title}</h3>

            </div>
            <div className="full-recipe-header">
                <img className="recipeimg" src={`https://spoonacular.com/recipeImages/${id}-636x393.jpg`} alt="food"></img>
              </div> 
              <aside>
              <h3>Ingredients</h3> 
                <ul>{ recipe.ingredients && recipe.ingredients.map(ingredient => (
                    <li className="ingred">{ingredient.original}</li>
                ))}</ul>
                </aside>
                   
                <article>
                <div>
                <h3>Instructions</h3>
                <p className="instruction">{recipe.instructions}</p>
                </div>
                </article>

                <button> SAVE TO FAVOURITES</button>
              
            
              
       
      
            
            </div>
       
    )
}


export default FullRecipe;