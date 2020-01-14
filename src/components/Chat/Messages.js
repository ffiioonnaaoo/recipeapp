import React from 'react';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';



const Messages = ({messages, name }) =>   (
       <ScrollToBottom className="scrollArea">
       {
         messages.map((message, i)=>(
         <div key={i}>
         <Message message={message.text} user={message.name} name={name}/>
         </div>
       ))
      }
       </ScrollToBottom>
        )


export default Messages;