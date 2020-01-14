import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => (
        <form className="chat-form">
        <input 
        className="input" 
        placeholder="type a message"
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}
        />
        <button className="sendButton" onClick={sendMessage}>Send</button>
        </form>

    );



export default Input;