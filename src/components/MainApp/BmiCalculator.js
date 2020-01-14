import React, { useEffect, useState } from 'react';
import Join from '../Forms/Join';




function BmiCalculator(){

    const [ height, setHeight ] = useState('');
    const [ weight, setWeight ] = useState('');
    const [ bmi, setBmi ] = useState('');
    const [ message, setMessage ] = useState('');
  


    useEffect(() => {
        handleClick();
     
    },[bmi]);

    const handleClick = async () => {
        //console.log('clicked');
        //console.log(height)
        const bmiResult =  weight/(height/100*height/100);
        setBmi(bmiResult);
        
        if(height === '' || weight === ''){
            setMessage('Please enter your height and weight to get your BMI index');  
        }
        else if(bmi < 0 || bmi > 80){
            setMessage('This is unlikely, try again!');  
        }
        else if(bmi > 0 && bmi < 18.1){setMessage('You are underweight');
            //console.log(message)
        } else if(bmi > 18.5 && bmi < 25.0) {setMessage('Great! You are with the healthy range.');
            //console.log(message)
        } else if(bmi > 25) {setMessage('You are overweight');
        //console.log(message)
    }
        console.log(bmi)

    
    }

    return(
        <div className="bmiContainer">
            <h1>Body Mass Index (BMI) Calculator</h1>
        <div>
        <div className="bmi-input-container-main">
        <div className="bmi-input-container">
            <label for="height">Enter height in lbs</label>
            <input placeholder="height" id="height" 
            value={height} 
            onChange={(event)=> setHeight(event.target.value)}
            onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null} />
        </div>
        <div className="bmi-input-container">
            <label for="height">Enter weight in kg</label>
            <input placeholder="weight" 
            value={weight} 
            onChange={(event)=> setWeight(event.target.value)}
            onKeyPress={(e) => e.key === "Enter" ? handleClick(e) : null}/>
        </div>
        </div>
            <button className="bmibutton" onClick={handleClick}>Submit</button>
        </div>
     
        <div>
            <p className="bmiResultMsg whiteText bmi">{bmi ? bmi.toFixed(1) : null}</p>
            <p className="bmiResultMsg whiteText">{message ? message : null}</p>
        </div>
        <div className="under">
        <Join />
        </div>   
        </div>
    )
}

export default BmiCalculator;