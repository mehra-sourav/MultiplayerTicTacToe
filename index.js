var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')

var file = fs.readFileSync('./rooms.json');
// file = JSON.parse(file);     

// var rooms = 0;//##Implement dB instead of this

//For statically loading styles folder
// app.use(express.static(path.join(__dirname,'./../styles')))
//For statically loading styles folder
// app.use(express.static(path.join(__dirname,'./../styles'))

//For statically loading public folder
app.use(express.static("public"))

app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname+"/index.html"))
})

io.on('connection',function(socket){
    // file = JSON.parse(file);
    // console.log("On conn file:",file)
    //Creating a new room and notifying the creator of room. 
    socket.on('createNewGame',function(data){
        // console.log("Increatenewgame on server side")
        file = JSON.parse(file);
        // console.log("On createNG file:",file)
        socket.join('Room-'+ (++file.rooms));
        console.log(file.rooms)
        var room = file.rooms
        //file.rooms = file.rooms + 1;
        file = JSON.stringify(file,null,2);
        fs.writeFileSync("./rooms.json",file);
        socket.emit('newGame',{
            name:data.name,
            room:'Room-'+ room
        })
    });
    
    //Connecting second player to room.
    socket.on('joinGame',function(data){
        // console.log("in joingame")
        // console.log(data)
        var room = io.nsps['/'].adapter.rooms[data.room];
        if(room && room.length == 1)
        {
            socket.join(data.room);
            io.in(data.room).clients((err,clients)=>{
                // console.log(clients)
            })
            socket.broadcast.to(data.room).emit('Player1',data);
            socket.emit('Player2',{
                name:data.name,
                room:data.room
            }) 
        }
        else
        {
            socket.emit('err',{
                message:'Sorry, The room is full!!'
            });
        }
    });
    
   //For updating P2's UI with P1's name    
   socket.on('player-1name',function(player1data){
       socket.broadcast.to(player1data.room).emit('player-1name',{
           oppname:player1data.name
       });
   });
                         
    //Handling turn
    socket.on('turnPlayed',function(data){
        socket.broadcast.to(data.room).emit('playTurn',{
            position:data.position,
            room:data.room,
            oppmark:data.oppmark
        });
    });
    
    //Player requests opponent for a rematch
    socket.on("Playagain",function(){
//       socket.broadcast.to(data.room).emit('Playagain');
       socket.broadcast.emit('Playagain');
    });
    
    //Player accepts opponent's request for a rematch
    socket.on("Challenge_accepted",function(){
//        socket.broadcast.to(data.room).emit('Challenge_accepted');
        socket.broadcast.emit('Challenge_accepted');
    });
    
    //Player rejects opponent's request for a rematch
    socket.on("Challenge_rejected",function(){
//        socket.broadcast.to(data.room).emit('Challenge_rejected');
        socket.broadcast.emit('Challenge_rejected');
    });  
    
    //Player has quit the game so notifying the opponent
    socket.on("Playerquit",function(){
        socket.broadcast.emit("Opponentquit")
    });
});


http.listen(process.env.PORT || 3000,function(){
    // console.log("Server running at port 3000")
})