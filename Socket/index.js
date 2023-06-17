
const io = require('socket.io')(8800, {
    cors:{
        origin: process.env.ALLOWED_ORIGINS
    }
})

let activeUsers = []

io.on('connection', (socket)=>{

    //when adding a new user
    socket.on('new-user-add', (newUserId)=>{
        //if user is not already added in activeUsers array
        if(!activeUsers.some((user)=>user.userId === newUserId))
        {
            activeUsers.push({
                   userId: newUserId,
                   socketId: socket.id
        })
        }
        
        console.log("Connected User", activeUsers);

        io.emit('get-users', activeUsers)
    })

      // when someone is disconnected with a socket
      socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log('User Disconnected', activeUsers);
        // lets agin emitting the active users after disconnected one of users
        io.emit('get-users', activeUsers);
    })

    //  send message 
    socket.on('send-message', (data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=>user.userId === receiverId)
        console.log("Sending from socket to", receiverId)
        console.log("Data", data);
        // if the user is currently active user
        if(user){
            io.to(user.socketId).emit('recieve-message', data);
        }
    })
})