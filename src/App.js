import React from 'react';
import './App.css';
import Login from './components/Forms/Login';
import Signup from './components/Forms/Signup';
import Home from './components/MainApp/Home';
import Profile from './components/Forms/Profile';
import CalorieSearch from './components/MainApp/CalorieSearch';
import FoodByNutrition from './components/MainApp/FoodByNutrition';
import FullRecipeByNutrition from './components/MainApp/FullRecipeByNutrition';
import BmiCalculator from './components/MainApp/BmiCalculator';
import FullRecipe from './components/MainApp/FullRecipe';
import Chat from './components/Chat/Chat';
import Join from './components/Forms/Join';
import spinach from './assets/icons/spinach.png';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



const token = localStorage.getItem('rememberMe')
console.log('the token isssss: '+token);

function App() {

  
  const logout = () => {
    localStorage.removeItem("rememberMe");
    console.log('Logged out')
}
  return (
    <Router>
    <div>
    <nav>
      <div className="logoContainer">
        
          <a href="/" id="logo"><span>Health</span><img src={spinach} alt="logo"></img><span>Happy</span></a>

        </div>

  
        <div className="subNav">
          <a href="/calories">Check calories</a>
          <a href="/food-by-nutrition">Recipes </a>
          <a href="/bmi">BMI</a>
          { token ? <a href="/profile">Profile</a> : <a href="/login">Profile</a> }
          {token ? <a href="/" onClick={logout}>Logout</a> : <a href="/login">Login</a>  }
          {!token ? <a href="/signup">Sign Up</a> : null}
      
      </div>
</nav>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profile">
        <Profile />
      </Route>
        <Route exact path="/calories">
          <CalorieSearch />
        </Route>
        <Route exact path="/food-by-nutrition">
          <FoodByNutrition />
        </Route>
        <Route exact path="/fullrecipe">
          <FullRecipe />
        </Route>
        <Route exact path="/fullrecipe-by-nutrition">
          <FullRecipeByNutrition />
        </Route>
        <Route exact path="/bmi">
          <BmiCalculator/>
        </Route>
        <Route exact path="/chat">
          <Chat/>
        </Route>
        <Route exact path="/join-chat">
          <Join/>
        </Route>
        <Route exact path="/create-profile">
      
</Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
