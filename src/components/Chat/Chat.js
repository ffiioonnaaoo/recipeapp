import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatHeader from './ChatHeader';
import Input from './Input';
import Messages from './Messages';
import './Chat.css';





let socket;
let search = window.location.search;
let params = new URLSearchParams(search);
let username = params.get('name');
console.log(username)

const Chat =  () => {
console.log(username)


    const ENDPOINT = 'http://localhost:2000';
    const [ name, setName ] = useState(username);
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT);
        setName(username);    

        //users joining
        socket.emit('join', ({ name }), ({error})=>{
            alert(error)
        });
        console.log('my name is' + name)


    },[ search ])


    //handling msgs

    useEffect(()=> {
        socket.on('message', (message)=> {
            setMessages([...messages, message])

        });

    },  [messages]);

//fucntion to send msgs

const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', message, () => {
       
    })
    setMessage('');
}

console.log(message, messages);


    return (
        <div className="outerContainer">
            <div className="container">
           
            <h1>Chat</h1>
            <ChatHeader />
            <Messages messages={messages} name={name}/>

      
            <Input message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            />
       
            </div>
        </div>
    )

}

export default Chat;