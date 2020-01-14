import React, { useState } from 'react';


export default function LoginForm() {
  const [formData, setFormData ] = useState({
    email:'',
    password:''
  });

  const [ msgEmail, setmsgEmail ] = useState('');
  const [ msgPassword, setmsgPassword ] = useState('');

  const { email,  password } = formData;
  const [ auth, setAuth] = useState(false);
  const [ userId, setUserId ] = useState(false);




const onChange = (e) => {
  e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(email){setmsgEmail('')}
    if(!password){ setmsgPassword('')}
}

const login = async (e) => {

  if(!email){setmsgEmail('Enter a valid email address')}
  if(!password){ setmsgPassword('Enter a password')}

  try {
      const result = await fetch('/api/login', {
          method:'post',
          body:JSON.stringify({ email, password }),
          headers: {
              'Content-Type': 'application/json',
          }
      })
      const data = await result.json();
      const token = data.token;
      const id = data.id;
      setAuth(true)
      setUserId(id)

      if(token){
        localStorage.setItem('rememberMe', token);
        window.location = `/profile?id=${id}`;
      } else{
        console.log('wrong credential')
      }

  } catch(error){
      console.log(error)
  } 
  }



  return (
    <div className="formPage" >
      <div className ="form">
      <div className="form-header">
      <h1 className="form-title">Login</h1>
      </div>
       
          <label htmlFor="login-username">Email</label>
          <input type="text" id="login-username" autoComplete="off" name="email" value={email} onChange={onChange} />
          <span className="error-notification">{msgEmail ? msgEmail : null}</span>   

          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" autoComplete="off" name="password"  value={password} onChange={onChange}/>
          <span className="error-notification">{msgPassword ? msgPassword : null}</span> 
          <button className="form-submit"  onClick={login}>Login</button>
          <p className="form-notification">Don't have an account? <a href ="/signup">Sign up here</a></p>
  
      </div>
    </div>
  );
}