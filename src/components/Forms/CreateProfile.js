import React, {useState, useEffect } from 'react';




 const CreateProfile = () => {


const [ profileData, setProfileData ] = useState({
    firstName:'',
    lastName:'',
    email:'',
    bio:'',
    dietReqs:[]

});

const { firstName, lastName, email, bio, dietReqs } = profileData;    
const saveProfile = async () => {
console.log('clicked')
    //get the id from the url
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    console.log(id)

   const token = localStorage.getItem('rememberMe')
   console.log('the token isssss: '+token)

   try {
    const result = await fetch(`/api/profile`, {
        method:'post',
        body:JSON.stringify({ bio, dietReqs, }),
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
    })
    const data = await result.json();
    console.log(data);

    
   
} catch(error){
    console.log(error)
}
}



    return (
        
        <div>
        <h2>Hi {profileData.firstName}</h2>
      
      
        <textarea type="text" name="bio" placeholder="bio" value={bio} placeholer="enter a bio" onChange={(e)=> setProfileData(e.target.value)}></textarea>
        <input type="text" name="diets" placeholder="diets" value={dietReqs} onChange={(e)=> setProfileData(e.target.value)}/>
     
        <button onClick={saveProfile}>SUBMIT</button>
        </div>
     
    )
}

export default CreateProfile

