import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import './Home.css';





const Home = () => {
    const [ question, setQuestion ] = useState('');
    const [ recipes, setRecipes ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const APP_ID_EDAMAM="e072e49d";
        const API_KEY_EDAMAM="e3852e6c947a233321e2a9604b8b22a3";
    
      
        try{
            console.log('clicked')
            const response = await fetch(`https://api.edamam.com/search?q=${question}?&app_id=e072e49d&app_key=e3852e6c947a233321e2a9604b8b22a3&from=0&to=3&calories=591-722&health=alcohol-free
            `);
            const data = await response.json();
            console.log(data.hits)
            setRecipes(data.hits);         

        }catch(error){
            console.log(error)
        }
    }



    return(
        <div>
        <div className="homepageMain">
        <h1>Stay healthy and happy with tips and inspiration.</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

        <div className="searchContainer">
        <input placeholder="Enter an ingredient" name="question"  
        value={question} 
        onChange={(event)=> setQuestion(event.target.value)}
        onKeyPress={(e) => e.key === "Enter" ? handleSubmit(e) : null} />
        <button onClick={handleSubmit}>Search</button>   
 
        </div>
        </div>
        <div className="recipeContainer">
        {
             recipes.map((recipe, i) => (
             <Recipe  className="recipeItem" 
                key={recipe[i]}
                label={recipe.recipe.label}               
                image={recipe.recipe.image}
                totalTime={recipe.recipe.totalTime}
                ingredients={recipe.recipe.ingredientLines}
                uri={recipe.recipe.uri}
                calories={recipe.recipe.calories}
                />
         ))
      }
        </div>


        </div>
    )
}


export default Home;