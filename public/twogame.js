(function()
{
    var arrTic = document.getElementsByClassName("box");
    var opp_name = document.getElementById("opp_name").innerHTML;
    var socket = io(),player,game;
    
    //Extracting name of user from cookie
    let output = {};
    document.cookie.split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair[1]
    });

    var Playername = output['userName']
        
    document.getElementById("player_name").innerHTML= Playername
    // document.getElementById("player_name").innerHTML = name;
    // document.getElementById("right_score").innerHTML = "CPU's score" + "<div id=\"oppscore\">0</div>";

    // async function fetchusername() {
    //     try
    //     {
    //             // let mode= JSON.stringify({
    //             //    game:"single" 
    //             // })
    //             let fetchResult = await fetch('/userinfo',{
    //             method:"GET",
    //             headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //             },
    //             redirect:"follow"
    //         })
    //         let response = await fetchResult;
    //         let jsonData = await response.json();
    //         console.log("NAme:",response);
    //         document.getElementById("player_name").innerHTML= jsonData
    //         playername = document.getElementById("player_name").innerHTML
    //         // return jsonData
            
    //     }
    //     catch(error)
    //     {

    //     }
    // }
    
    // console.log("Calling fetchusername twogame")
    // fetchusername()
    // // var name = document.getElementById("player_name").innerHTML
    // console.log("PlayerName:",playername)

    
    // var Playername
    // var gamemode;

    $(".choicebutton").hover(
        function () {
        //   $(this).addClass("btn-light");
          $(this).toggleClass("btn-outline-dark");
        
        },
    );
    
    // console.log("Document:",context.proxyRequest.headers)

    socket.emit('createNewGame',{
                name:Playername
    });
    player = new Player(name,"X");
    
    
    //Player clicks on two player game-mode
    document.getElementById("Twoplayer").onclick = function(event){
        //To let the game know that the player wants a two player mode
        // alert("hello")
        gamemode="Twoplayer"
        event.preventDefault();
        // alert("Getting clicked")
        console.log("IN twoplayergame")
        document.getElementById("gamemode").setAttribute("style","display:none");
        document.getElementById("multimode").setAttribute("style","display:flex");
        // document.getElementBcyId("h1").setAttribute("style","display:none");
    }
    
    //Player clicks on newgame in two player mode
    document.getElementById("newgame").onclick = function(event){
            //To let the game know that the player wants a two player mode
            gamemode="Twoplayer"
            // event.preventDefault();
            // document.getElementById("multimode").setAttribute("style","display:none");
            // document.getElementById("game").setAttribute("style","display:block");
            // var name = document.getElementById("newname").value;
            
            // fetch('/game/twoplayer')


            if(!name)
            {
                alert("Please enter your name.")
                document.getElementById("newname").classList.add("errorclass")
                // $(this).toggleClass("btn-outline-light");
            }
            else
            {
                document.getElementById("newname").classList.remove("errorclass")
                socket.emit('createNewGame',{
                    name:Playername});
                player = new Player(Playername,"X");
            } 
        }
    
    //Joining an existing game
    // document.getElementById("joingame").onclick = function(event){
    //     // event.preventDefault();
    //     var name = document.getElementById("joinname").value;
    //     var roomID = document.getElementById("roomID").value;
        
    //     // if(document.getElementById("joinname").value == "")

        
    //     console.log("In joingame")
        
    //     if(!roomID && !name)
    //         alert("Please enter your name and the room ID you want to join.");
    //     else if(!name)
    //     {
    //         alert("Please enter your name before joining.");
    //     }
    //     else if(!roomID)
    //         alert("Please enter the room ID before joining."); 
    //     else
    //     {
    //         ChangepageTwoPlayer()
    //         console.log("In joingame,just before emit")
    //         socket.emit("joinGame",{
    //             name:name,
    //             room:roomID
    //         });
    //         player = new Player(name,"O");
    //     }  
    // }

    //Requesting the opponent for a rematch
    document.getElementById("resetbutton").onclick = function(){
        console.log("In reset mode")    
        if(gamemode == "Single")
        {
            Reset();
        }
        else
        {
            let msg = "Waiting for "+"<b>"+opp_name+"</b>"+"'s reply";   
            game.showcustommodal(msg)
            game.Playagain(); 
        }       
    }
    
    //Quiting the game
    document.getElementById("quitbutton").onclick = function(){
        console.log("In quit mode")
        if(gamemode == "Single")
        {
            game.showcustommodal("Loading main page ...");
            location.reload();
        }
        else
        {
            socket.emit("Playerquit")
            game.showcustommodal("Loading main page ...");
            location.reload();
        }
    }
    
    //Accepting the rematch request
    document.getElementById("yesbutton").onclick = function(){
        socket.emit("Challenge_accepted");
        game.Reset();
    }
    
    //Rejecting the rematch request
    document.getElementById("nobutton").onclick = function(){
        socket.emit("Challenge_rejected");
        game.showcustommodal("You have rejected the challenge. Redirecting you to the main page in 5 seconds.")
        setTimeout(function(){
            game.showcustommodal("Loading main page ...");
            location.reload()
        },5000);
    }

    //Two Player Game
    class Player
    {
        constructor(name,markname)
        {
            this.name = name;
            this.mark = markname;
            this.oppmark = markname == "O"?"X":"O";
            this.currentTurn = true;
            this.movesPlayed = 0;
            this.gamestarted = false;
        }   

        getgamestarted()
        {
           return this.gamestarted; 
        }
        
        setgamestarted()
        {
            this.gamestarted = true;
        }
        
        updatemovesnum()
        {
            this.movesPlayed++//=val
        }

        getmovesnum()
        {
            return this.movesPlayed
        }

        setturn(turn)
        {
            this.currentTurn=turn;
            if(turn)
            {
                //Change turn color here
                document.getElementById("player_name").setAttribute("style","background-color:var(--select-color)");
                document.getElementById("opp_name").setAttribute("style","background-color:transparent");
                
            }
            else
            {
                //Change turn color here
                document.getElementById("player_name").setAttribute("style","background-color:transparent");
                document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
            }
        }

        getPlayerName()
        {
            return this.name;
        }

        getPlayerMark()
        {
            return this.mark;
        }
        
        setPlayerMark(mark)
        {
            this.mark = mark;
        }
        
        getOpponentMark()
        {
            return this.oppmark;
        }

        getcurrentTurn()
        {
            return this.currentTurn;
        }
    }
    
    class Game
    {
        constructor(roomID)
        {
            this.roomID = roomID;
            this.finish = false
            this.count = 0;
        }

        getRoomID()
        {
            return this.roomID;
        }
        
        updatecount()
        {
            this.count++;
        }
        
        getcount()
        {
            return this.count;
        }
        
        getfinish()
        {
            return this.finish;
        }
        
        setfinish(val)
        {
            this.finish = val;
        }
        
        setcount(val)
        {
            this.count = 0;
        }
        
        game()
        {
            for(let i=0;i<arrTic.length;i++)
            {
              arrTic[i].onclick = function(){
                
                if(this.getAttribute("checked")=="true" && !player.getcurrentTurn() && !game.getfinish())
                    alert("This tile is already selected and it's not your turn")
                else if(this.getAttribute("checked")=="true" && !game.getfinish())
                    alert("This tile is already selected")
                else if(!player.getcurrentTurn() && !game.getfinish())
                    alert("It's not your turn")
                else if(this.getAttribute("checked")!="true" && player.getcurrentTurn() && !game.getfinish())
                {
                  this.setAttribute("checked","true");
                  this.innerHTML = player.getPlayerMark();
                  
                  player.setturn(false);
                  game.updatecount()
                  game.turnPlayed(i)
                }
                game.Check()
              }
            }  
        }
        
        showcustommodal(msg)
        {
            document.getElementById("Winmsgbody").innerHTML = msg;
        }
        
        turnPlayed(tile)
        {
            game.TurnCheck()
            socket.emit("turnPlayed",{
                position:tile,
                room:game.getRoomID(),
                oppmark:player.getPlayerMark()                      
           })
        }
        
        TurnCheck()
        {
            if(game.getcount() == 0 || player.getcurrentTurn())
          {

              document.getElementById("player_name").setAttribute("style","background-color:var(--select-color)");
              document.getElementById("opp_name").setAttribute("style","background-color:transparent"); 

          }
          else
          {
            document.getElementById("player_name").setAttribute("style","background-color:transparent");
            document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
          }
        }
        
        Check()
        {
          if(!game.getfinish())
          {
            if(game.checkValue(0,1,2))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(3,4,5))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(6,7,8))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(0,3,6))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(1,4,7))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(2,5,8))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(0,4,8))
            {
              game.setfinish(true);
            }
            else if(game.checkValue(2,4,6))
            {
              game.setfinish(true);
            }
            else if(game.getcount()==9)
            {
              game.showresult();
            }
          }
        }
        
        showresult()
        {
            if(game.getcount() != 9)
            {
                $("#Winmsg").modal("show");
            }
            else
            {
                document.getElementById("Winmsgbody").innerHTML = "The match was a Draw";
                $("#Winmsg").modal("show");
            }
        }
        
        //Shows request from other player's side
        Playagainshow()
        {
            $("#Winmsg").modal("toggle");
            document.getElementById("Playagainmsgbody").innerHTML = "<b>"+opp_name+"</b>" + " wants a rematch. Do you want to continue?"
            $("#Playagainmsg").modal("toggle");
        }
        
        checkValue(x,y,z)
        {
            if(arrTic[x].innerHTML == "O" && arrTic[y].innerHTML == "O" && arrTic[z].innerHTML == "O" || arrTic[x].innerHTML == "X" && arrTic[y].innerHTML == "X" && arrTic[z].innerHTML == "X" )
            {
              game.changeother(x,y,z);
              let player_name = document.getElementById("player_name").innerHTML;
              if(arrTic[x].innerHTML == "O" && player.getPlayerMark() == "O" || arrTic[x].innerHTML == "X" && player.getPlayerMark() == "X")
              {
                  document.getElementById("Winmsgbody").innerHTML = "<b>"+player_name+"</b>"+" wins";
                  document.getElementById("playerscore").innerHTML++ 
                  document.getElementById("secondplayerscore").innerHTML++ 
              }
              else
              {
                  document.getElementById("Winmsgbody").innerHTML = "<b>"+opp_name+"</b>"+" wins";
                  document.getElementById("oppscore").innerHTML++
                  document.getElementById("secondoppscore").innerHTML++
              }
              game.showresult();
              return true;
            }
          else
            return false;
        }
        
        changeother(a,b,c)
        {
          for(var i=0;i<arrTic.length;i++)
          {
            if(i!=a && i!=b && i!=c)
            {
                arrTic[i].innerHTML ="";
            }
          }
        }
        
        Playagain()
        {
            socket.emit("Playagain");
        }
        
        Reset()
        {
          game.setcount(0);
          game.TurnCheck();
          game.setfinish(false);
            
          if(player.getPlayerMark() == "X")
          {
              player.setPlayerMark("O");
              player.setturn(false);
          }
          else
          {
              player.setPlayerMark("X");
              player.setturn(true);
          }
        
          for(var i=0;i<arrTic.length;i++)
          {
            arrTic[i].setAttribute("checked","false");
            arrTic[i].innerHTML ="";
          }
          document.getElementById("Playermarkbody").innerHTML = "You are "+ "<b>"+player.getPlayerMark()+"</b>"+" in this game."
          $("#Playermark").modal("toggle");
          game.game()
        }
    }
    
    
    function ChangepageTwoPlayer()
    {
        document.getElementById("multimode").setAttribute("style","display:none");
        document.getElementById("game").setAttribute("style","display:block");
        document.getElementById("h1").setAttribute("style","display:none");
        document.getElementById("h2").setAttribute("style","display:flex");
    }
    
    socket.on('newGame',function(data){
        document.getElementById('h2').innerHTML="Room ID:  "+data.room;
       
        //Setting player_name on player-1 side
        document.getElementById('player_name').innerHTML = data.name; 

        game = new Game(data.room);
        console.log("In new game event ")
        ChangepageTwoPlayer();
    })
    
    socket.on('Player1',function(data){
        player.setturn(true);
         
        //Seting opp_name on player-1 side
        document.getElementById('opp_name').innerHTML = data.name;

        //Updating opponent's name in global variable 'opp_name'
        opp_name = data.name;

        player.setgamestarted()
        
        document.getElementById("Playermarkbody").innerHTML = "You are "+"<b>"+player.getPlayerMark()+"</b>"+" in this game."
        $("#Playermark").modal("toggle");
        game.game() 
        
        console.log("In player1  on P1 side")
        socket.emit('player-1name',{
            name:player.getPlayerName(),
            room:game.getRoomID()
        });
        
    })
    
    socket.on('Player2',function(data){
        player.setturn(false);
        player.setgamestarted()
        document.getElementById('player_name').innerHTML = data.name
        document.getElementById('h2').innerHTML="Room ID: "+data.room;  
        game = new Game(data.room)

        document.getElementById("Playermarkbody").innerHTML = "You are "+ "<b>"+player.getPlayerMark()+"</b>"+" in this game."
        $("#Playermark").modal("toggle");
        game.game()
        ChangepageTwoPlayer();
        
    })
    
    //Updating Player-1's Name in Player-2's UI
    socket.on('player-1name',function(data){
        document.getElementById('opp_name').innerHTML = data.oppname;
        //Updating opponent's name in global variable 'opp_name'
        opp_name = data.oppname;
    });
    
    //Tells current player that they can play their turn
    socket.on('playTurn',function(data){
        if(arrTic[data.position].getAttribute("checked")!="true")
        {
            arrTic[data.position].innerHTML = data.oppmark;
            arrTic[data.position].setAttribute("checked","true");
            game.updatecount();
            game.Check();
        }
        player.setturn(true);
        game.TurnCheck();
        game.game();
    });
    
    //Opponent wants to playagain
    socket.on("Playagain",function(){    
        game.Playagainshow()
    });
    
    //Opponent accepted rematch request
    socket.on("Challenge_accepted",function(){
        $("#Winmsg").modal("toggle");
        game.Reset();
    });
    
    //Opponent rejected rematch request
    socket.on("Challenge_rejected",function(){
        game.showcustommodal("<b>"+opp_name+"</b>"+" has rejected your challenge. Redirecting you to the main page in 5 seconds.")
        setTimeout(function(){
            game.showcustommodal("Loading main page ...");
            location.reload()
        },5000);
    });
    
    socket.on("Opponentquit",function(){
        game.showcustommodal("<b>"+opp_name+"</b>"+" has quit the game.Redirecting you to the main page in 5 seconds.");
        setTimeout(function(){
            game.showcustommodal("Loading main page ...");
            location.reload()
        },5000);
    });

    // socket.on("startSinglePlayerGame",function(data){
        
    //    console.log("In startSinglePlayerGame")
    // });
        
    try
    {
        document.documentElement.addEventListener("click", function(event){
         //Making sure that 'closebutton' and 'resetbutton' don't have event listeners attached
         if(gamemode=="Twoplayer" && !player.getgamestarted() && !game.getfinish())
           {
               //Adding an exception for theme toggle button
            //    if(event.target.id != "switch" && event.target.id != "starwars")
            //        {
                       alert("The game hasn't started. The opponent hasn't joined")
                //    }
           }
            
         if(event.target.id == "closebutton" || event.target.id == "resetbutton"  || event.target.id == "quitbutton" || event.target.id == "switch")
         {
            return;
         }
        
         //else
         if(gamemode=="Twoplayer" && game.getfinish() == true)
         {
            let modaltext = document.getElementById("Winmsgbody").innerHTML
            modaltext = modaltext.substring(0,modaltext.indexOf(" ")) + " has won the game";
                  
            //Todo On P1 side, won message replaces win msg.
            document.getElementById("Winmsgbody").innerHTML = modaltext
            game.showresult();
        }
        });
    }catch(err)
        {
        }
    
}
)()