const io = require('socket.io')();

users = [];

io.on('connection', (socket) => {
    socket.on('user_name', (name) => {
        var stringlogin = name+" vua online";
        users.push({
            socketid : socket.id,
            name : name
        })
        io.emit('login_info', {
            str:stringlogin,
            number: users.length
        });
        console.log(users);
    });
    socket.on('chat_message', (msg) => {
        if(msg.startsWith("/")){
            var indexSpace = msg.indexOf(' ');
            var message = msg.substring(indexSpace);
            var name = msg.substring(1,indexSpace);
            for (const user of users) {
                if(user.name == name){
                    socket.to(user.socketid).emit('chat_message', message); 
                    break;
                }
            }
        }else{
            io.emit('chat_message', msg);
        }
        
    });
    socket.on('disconnect', () => {
        console.log(socket.id+' disconnected');
        for (let index = 0; index < users.length; index++) {
            const element = users[index];
            if(element.socketid==socket.id){
                users.splice(index,1);
                break;
            }
            
        }
        console.log(users);
    });
}); 
module.exports = io;
