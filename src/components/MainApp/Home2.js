import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import './Home.css';




const Home = () => {
    const [ question, setQuestion ] = useState('');
    const [ recipes, setRecipes ] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const API_KEY_1 = '26763bea1bd2420aa675ab058bc3d558'
        const API_KEY_2 = '00603cab25754afca510b64fbdb1709f'
      
        try{
            console.log('clicked')
            const response = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${API_KEY_2}&query=${question}
            `);
            const data = await response.json();
            console.log(data.results);

            setRecipes(data.results.slice(0,3));
       
            console.log(recipes[0]);


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
                recipes.map(recipe => (
                <Recipe  className="recipeItem" 
                    key={recipe.id}
                    title={recipe.title} 
                    servings={recipe.servings} 
                    readyInMinutes={recipe.readyInMinutes} 
                    image={recipe.image}
                    id={recipe.id} onClick/>
            ))
         }
           </div>
        </div>
    )
}


export default Home;