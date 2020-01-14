import React from 'react';



const Message = ({ user, name, message}) =>  {

 let isCurrentUser = false;
 
if(user === name){
    isCurrentUser = true;
}

    return (

        isCurrentUser ? (

            <div className="messageContainer justifyEnd">
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{user}: {message}</p>
            </div>
          </div>
    )
     : (


        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark">{user}: {message}</p>
        </div>
      
      </div>
    )
    )
} 

  


export default Message;