import React, { useState, useEffect } from 'react';
import './Forms.css';

export default function Signup(){

 
    
const [formData, setFormData ] = useState({
    msgfirstName:'Enter your firstName',
    lastName:'',
    email:'',
    password:'',
    password2:''

});


const [ msgfirstName, setmsgfirstName ] = useState('');
const [ msglastName, setmsglastName ] = useState('');
const [ msgEmail, setmsgEmail ] = useState('');
const [ msgPassword, setmsgPassword ] = useState('');
const [ msgPassword2, setmsgPassword2 ] = useState('');
const [ msgSuccess, setmsgSuccess ] = useState('');

const { firstName, lastName, email, phone, password, password2 } = formData;



//update value of form data
const handleChange = (e) => {
    //...copies all the key:value pairs and spreads them into the new objectfrom the form data
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
    if(firstName){setmsgfirstName('')}
    if(lastName){setmsglastName('')}
    if(email){setmsgEmail('')}
    if(!password){ setmsgPassword('')}
    if(!password2){setmsgPassword2('')}

  

}







const signup = async () => {
    if(!firstName){setmsgfirstName('Enter a first name')}
    if(!lastName){setmsglastName('Enter a last name')}
    if(!email){setmsgEmail('Enter a valid email address')}
    if(!password){ setmsgPassword('Enter a password')}
    if(!password2){ setmsgPassword2('Enter a confirmation password')}
    if(password !== password2){setmsgPassword2('Passwords must match')}

    
    const rememberMe = localStorage.getItem('rememberMe');
    console.log({ rememberMe })

    const result = await fetch('/api/signup', {
        method:'post',
        body:JSON.stringify({firstName, lastName, email, password, password2, phone }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const data = await result.json();
    console.log(data)
    if(result.status === 200){
        //window.location = `/login`
        setmsgSuccess(`Success! You have signed up.`)
    }



console.log(data);




   
}

    return(
        <div className="formPage">

     
        
     
        <div id="signup-form" className="form">
            <div className="form-header">
            <p className="success-notification">{msgSuccess ? msgSuccess+' Login to see your profile.' : null}</p> 
            <h1 className="form-title">Signup</h1>
        </div>
            <div className="name-input">
                <div className="name">
                    <label htmlFor="signup-email">First Name</label>
                    <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={handleChange}/> 
                    <span className="error-notification">{msgfirstName ? msgfirstName : null}</span>   
                </div>  
                <div className="name"> 
                <label htmlFor="signup-email">Last Name</label>
                <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={handleChange}/>
                <span className="error-notification">{msglastName ? msglastName : null}</span>   

                </div>
                </div>
            <label htmlFor="signup-email">Email</label>
            <input id="signup-email"type="text" name="email" placeholder="Email" value={email} onChange={handleChange}/>
            <span className="error-notification">{msgEmail ? msgEmail : null}</span>   

            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" name="password" placeholder="Password" value={password} onChange={handleChange}/>
            <span className="error-notification">{msgPassword ? msgPassword : null}</span> 
            <label htmlFor="signup-password">Confirm Password</label>
            <input id="signup-password2" type="password" name="password2" placeholder="Confirm password" value={password2} onChange={handleChange}/>
            <span className="error-notification">{msgPassword2 ? msgPassword2 : null}</span> 
            <button onClick={signup}>Signup</button>
            <p className="form-notification">Already have an account? <a href ="/login">Login here</a></p>

            </div>
        </div>
    )
  

}