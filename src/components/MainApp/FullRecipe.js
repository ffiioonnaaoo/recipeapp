import React, { useEffect, useState } from 'react';
import './FullRecipe.css';



const token = localStorage.getItem('rememberMe')
console.log('the token isssss: '+token)


const FullRecipe = () => {

     const [ recipe, setRecipe ] = useState({
        label: '',
        ingred:[],
        instructions:[],  
        image:'',
        diets:[]
     }  );
    
      



    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    console.log(id)

        useEffect(() => {
            getData();
        
        },[]);

    const getData= async () => {
    //     const API_KEY_1 = '26763bea1bd2420aa675ab058bc3d558'
    //     const API_KEY_2 = '00603cab25754afca510b64fbdb1709f'

    const setInstructions = ['Combine all ingredients, excluding turkey, in a mixing bowl. Whisk to combine. Set aside ½ cup of marinade for basting.',
'Marinade entire turkey, by brushing or rubbing onto turkey. Once turkey is evenly coated, place in a baking dish and wrap tightly with plastic wrap. Refrigerate and marinate for 4-6 hours.', 'Preheat oven to 325ºF. Remove turkey from marinade and brush off excess. Truss turkey with twine and place on a roasting rackin a clean, deep baking dish.', 'Place turkey in oven and bake for 3-3 ½ hours, or until internal temperature of turkey thigh or leg has reached 165ºF. During cook time, use a heat-proof brush to baste turkey every 30 minutes with remaining marinade.']
        
            const response = await fetch(`https://api.edamam.com/search?q=${id}&app_id=e072e49d&app_key=e3852e6c947a233321e2a9604b8b22a3`);
            const data = await response.json();
            const recipeData = data.hits[0].recipe;
            
            console.log(recipeData.dietLabels)

            setRecipe({
                label: recipeData.label,
                ingred:recipeData.ingredients,
                diets:recipeData.dietLabels,
                instructions: setInstructions,
                image:recipeData.image
            
             });   
    }

    const saveRecipe = async (e) => {
        e.preventDefault()
        console.log('clicked');
        console.log('id for saving is'+id)
        const recipeId = id;
        try {
            const result = await fetch('/api/profile/save-recipes', {
                method:'post',
                body:JSON.stringify({ token, recipeId }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await result.json();
         
      
            if(!token){
              localStorage.setItem('rememberMe', token);
              console.log('Sign in to save recipes');
            } 
        } catch(error){
            console.log(error)
        } 
        }
      
      
    //console.log(recipe.diets)
    return(
        
            <div className="full-recipe-page">  
            <div className="title">
            <h1 >{recipe.label}</h1>
            <ul>
            {
              recipe.diets ? recipe.diets.map(diet => (
              <p className="diet">{diet}</p>
          ))

           : null}
          </ul>
            </div>
                <div className="full-recipe-header">
                   
                    <img className="recipeimg" src={recipe. image} alt="food"></img>

              
                </div>
            
              
                <article>
                <div>
                <h3>Instructions</h3>
               
                {
              recipe.instructions.map((instruction, i) => (
                 <p key={instruction[i]} className="instruction"><span className="number">{i+1}</span>{instruction}</p>
              ))

               }
              </div>
                
                </article>
                <aside>
                <h3>Ingredients</h3>
                <ul> {
                   
                recipe.ingred.map((ingredient, i) => (
                    <li className="ingred">{ingredient.text}</li>
                ))
               
                 } </ul>
                </aside>
      
            <button onClick={saveRecipe}>SAVE TO FAVOURITES</button>
            </div>
       
    )
}


export default FullRecipe;