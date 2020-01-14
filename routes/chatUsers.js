const users = ['admin'];

const addUser = ({id, name}) => {
  const user = { id, name }
  users.push(user)

}


const removeUser = ({id}) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}


const getUser = ({id}) => {
    users.find((user) => user.id === id);
}

module.exports = { addUser, removeUser, getUser}