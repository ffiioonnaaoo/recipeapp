import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import chatIcon from '../../assets/icons/chat.png';


const Join =  () => {
    const [ name, setName ] = useState('');
    console.log(name);



    return (
        <div className="chatbox">
        <img className="chaticon" src={chatIcon} alt="chat"></img>
    
            <input placeholder="enter your name" onChange={e => setName(e.target.value)}/>
             <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
            <button className="chatbox-button">Join</button>
            </Link>
        </div>
    )

}

export default Join;