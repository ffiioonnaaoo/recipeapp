import React, {useState, useEffect } from 'react';




   


 const Profile = () => {


const [ profileData, setProfileData ] = useState({
    firstName:'',
    lastName:'',
    email:'',
    favouriteRecipes:[]

});

   
const getProfileData = async () => {

    //get the id from the url
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    console.log('id is: '+id)

   const token = localStorage.getItem('rememberMe')
   console.log('the token isssss: '+token)
 

   try {
    const result = await fetch(`/api/profile/user`, {
        method:'get',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
    })
    const data = await result.json();
    console.log(data);
  
     console.log(data);
 
    setProfileData({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email
    })

    
   
} catch(error){
    console.log(error)
}
}



useEffect(()=> {
    getProfileData();
 },[])


    return (
        
        <div class="profilePage">       
            <div class="profileCard">
                <div class="profileCardHeader">
                    <h3>My details</h3>
                </div>   
        
                <p>First name:  {profileData.firstName} {profileData.lastName}</p>
                <p>Last name:  {profileData.lastName}</p>
                <p>Email address: {profileData.email}</p>

                <ul>{profileData.favouriteRecipes ? profileData.favouriteRecipes.map(favouriteRecipe => (
                    <li>{favouriteRecipe}</li>
                )) : null}</ul>
            </div>
       </div>
     
    )
}

export default Profile

