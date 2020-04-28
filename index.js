require('dotenv').config()
const express = require('express');
const app = express();
const io = require('socket.io')(app.listen(process.env.PORT || 3001));

const path = require('path');
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb+srv://test1:t est1@cluster0-or75i.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(process.env.DB_CONNECT, { useNewUrlParser: true});

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const connection = client.connect()
var file = fs.readFileSync('./rooms.json','utf8');
file = JSON.parse(file);     

var rooms = 0;//##Implement dB instead of this


//For statically loading public folder
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/',function(req,res){
    res.clearCookie()
    res.sendFile(path.resolve(__dirname+"/index.html"))
})

app.post('/signup', async function(req,res){    
    try
    {
        let collection = client.db("MultiTicTacToe").collection("users");
        connection.then(async () => { 
            var user =  await collection.findOne({
                    userID:req.body.signupemail
                }
            ).then(result => {
                    if(result){ 
                         return result;
                    }
                }
            ).catch()

            // console.log("Value of user:",user)
            // console.log("Value of entered email:",req.body.signupemail)
            if(user!= undefined || user!=null && user.userID == req.body.signupemail)
            {
                console.log("User exists")
                res.send("Userexists")
            }
            else
            {
                console.log("User doesn't exist.Putting in DB")

                // Perform actions on the collection object
                let hashPass = await bcrypt.hash(req.body.signuppassword,10)
                collection.insertOne({
                        userID:req.body.signupemail,
                        userName:req.body.signupname,
                        userPassword:hashPass,
                        history:[]
                    }
                ).then(result=>{})
                .catch(result=>{})
                res.send("Signedup")
            }
        })
    }
    catch
    {}
});

app.post("/login",function(req,res){
    console.log("Req. body:",req.body)
    console.log("In /login")
    try
    {
        let collection = client.db("MultiTicTacToe").collection("users");
        console.log("In /login try")
        connection.then(async () => {     
            var user =  await collection.findOne({
                    userID:req.body.loginemail
                }
            ).then(result => {
                    if(result){ 
                        return result;
                    }
                }
            ).catch(result => {
                console.log(result);
            })

            if(user == undefined || user==null)
            {
                console.log("User doesn't exist")
                res.send("Nosuchuser") 
            }
            else if(user.userID == req.body.loginemail)
            {
                // Perform actions on the collection object
                if(await bcrypt.compare(req.body.loginpassword,user.userPassword)) //bcrypt compare returns a promise
                {
                    console.log("Login successful");
                    var user = {
                        name:user.userName,
                        ID:user.userID
                    }
                    let accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
                    
                    res.cookie('auth-token',accessToken)
                    res.cookie('userName',user.name)
                    console.log("header name:",user.name)
                    res.send('game')
                }
                else
                    res.send("Wrongpassword")
            }
        }) 
    }
    catch
    {
        res.status(500).send()
    }
});

app.get('/matchdata',authenticateToken,function(req,res){
    try
    {
        var collection = client.db("MultiTicTacToe").collection("users");
        console.log("In matchdata")
        connection.then(async () => { 
            var Cookie = req.headers['cookie']
            var output = {};
            Cookie.split(/\s*;\s*/).forEach(function(pair) {
                pair = pair.split(/\s*=\s*/);
                output[pair[0]] = pair[1]
            });
            console.log("Username:",req.user.ID)
            
            var user = await collection.findOne({
                    userID:req.user.ID
                }
            ).then(result => {
                    if(result){ 
                        return result;
                    }
    
                }
            ).catch(result=>{})

            console.log(user)
            res.send(user)
        }) 
    }
    catch
    {}
});

app.post('/addmatchdata',authenticateToken,function(req,res){
    try
    {
        // console.log("In addmatch data")
        var matchdata  = req.body
        var exists;

        matchdata.date = new Date(Date.now())//Date("<YYYY-mm-ddTHH:MM:ss>")
        var collection = client.db("MultiTicTacToe").collection("users");
        connection.then(async () => {  
            var user = await collection.findOne({
                    "userID":req.user.ID,
                    "history.matchID":matchdata.matchID
                }
            )
            console.log("Addmatchdata user:",user)
            if(user)
            {
                for(i in user.history)
                {
                    if(user.history[i].matchID == matchdata.matchID)
                    {
                        console.log("In")
                        exists = true;
                        break;
                    }
                }
            }

            if(exists) //Update old score of same match
            {
                collection.updateOne({ 
                        userID:req.user.ID,
                        history:{ $elemMatch:{ matchID:matchdata.matchID }} // Query parameter
                    },
                    {
                        $set:{
                            "history.$.playerAscore": matchdata.playerAscore, // Replacement document
                            "history.$.playerBscore": matchdata.playerBscore,
                            "history.$.date":new Date(Date.now())
                        } 
                    },
                ).then(result => {
                     console.log("DB res:",result);
                     res.send(result)
                })
                .catch(result => {})
                
            }
            else //Add new score
            {
                collection.updateOne(   
                    { userID:req.user.ID },
                    { $push:{ history:matchdata } }// Replacement document
                ).then(result => {
                     console.log("DB res:",result);
                     res.send(result)
                })
                .catch(result => {})
            }
            res.send("Success")
        }) 
    }
    catch
    {}
});


function authenticateToken(req,res,next)
{
    console.log("In authenticate token")
    
    let Cookie = req.headers['cookie']
    let output = {};
    Cookie.split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair[1]
    });
    
    //Making sure that we have a authHeader.  It will either return undefined or the actual token
    
    let token = output && output['auth-token'];
    if(token == null)
        return res.status(401).sendFile(path.resolve(__dirname+"/public/forbidden.html"))
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err)
        {
            console.log(err)
            return res.status(403).sendFile(path.resolve(__dirname+"/public/expired.html"))
        }    
        req.user = user 
        next() 
    })
}

app.get('/game',authenticateToken,(req,res) => {
    console.log(req.user)
    res.sendFile(path.resolve(__dirname+"/public/game.html"))
});

// app.get('/game/singleplayer',authenticateToken,(req,res) => {
//     res.sendFile(path.resolve(__dirname+"/public/singlegame.html"));
// });

// app.get('/game/twoplayer',authenticateToken,(req,res) => {
//     res.set('mode','newgame');
//     res.sendFile(path.resolve(__dirname+"/public/twogame.html"));
// })
app.get('/userinfo',authenticateToken,(req,res) => {
    user = JSON.stringify(req.user);
    res.send(user);
})


app.get('/logout',(req,res) => {
    res.clearCookie('auth-token');  
    res.clearCookie('userName');  
})

app.post('/roomlength',(req,res) => {
    // console.log("In /roomlength:",req.body.ID);
    var roomID = io.nsps['/'].adapter.rooms[req.body.ID];
    // console.log("RoomID:",roomID)
    if(roomID && roomID.length < 2)
        res.send("Notfull");
    else if(roomID && roomID.length >= 2)
        res.send("Full");
    else
        res.send("Invalid");
})

app.get('/history',authenticateToken,(req,res) => {
    res.sendFile(path.resolve(__dirname+"/public/history.html"))
})

app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname+"/public/imagination.html"));
});


io.on('connection',socket => {
    console.log("In connection")

    //Creating a new room and notifying the creator of room. 
    socket.on('createNewGame',data => {
        console.log("File rooms:",file.rooms)
        // var newroom = ++file.rooms;
        var newroom = ++rooms;
        // var newroom = ++rooms;
        socket.join('Room-'+ newroom);
        console.log("P1 Joining room:",newroom)
        let newjson = {
            rooms:newroom
        }
        fs.writeFileSync('./rooms.json',JSON.stringify(newjson,null,4))
        socket.emit('newGame',{
            name:data.name,
            room:'Room-'+ newroom
        })
    });
    
    //Connecting second player to room.
    socket.on('joinGame',data => {
        console.log("in joingame")
        console.log("Room P1 joined:",data.room)
        var roomID = io.nsps['/'].adapter.rooms[data.room];
        console.log("RoomID of joingame",roomID)
        if(roomID && roomID.length == 1)
        {
            console.log("in joingame,just before joining")
            socket.join(data.room);
            // io.in(data.room).clients((err,clients)=>{
            //     // console.log(clients)
            // })
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
   socket.on('player-1name',player1data => {
       socket.broadcast.to(player1data.room).emit('player-1name',{
           oppname:player1data.name
       });
   });
                         
    //Handling turn
    socket.on('turnPlayed',data => {
        console.log("In turn played",data)
        socket.broadcast.to(data.room).emit('playTurn',{
            position:data.position,
            room:data.room,
            oppmark:data.oppmark
        });
    });
    
    //Player requests opponent for a rematch
    socket.on("Playagain",data => {
       socket.broadcast.to(data.room).emit('Playagain');
    });
    
    //Player accepts opponent's request for a rematch
    socket.on("Challenge_accepted",data => {
        socket.broadcast.to(data.room).emit('Challenge_accepted');
    });
    
    //Player rejects opponent's request for a rematch
    socket.on("Challenge_rejected",data => {
        socket.broadcast.to(data.room).emit('Challenge_rejected');
    });  
    
    //Player has quit the game so notifying the opponent
    socket.on("Playerquit",data => {
        // console.log(typeof(data.room));
        socket.broadcast.to(data.room).emit("Opponentquit")
    });  
});

