function Toggletheme()
{
    var checkbox = document.getElementById("switch");
    checkbox.onclick=function(){
        if(document.documentElement.getAttribute('data-theme') == "light")
        {
            transition();
            Changebutton("light")
            document.documentElement.setAttribute('data-theme','dark')  
        }
        else
        {
        
            transition();
            Changebutton("dark")
            document.documentElement.setAttribute('data-theme','light')
        }
    }
}

let transition = () =>{
    document.documentElement.classList.add('transition');
    window.setTimeout(()=>{
        document.documentElement.classList.remove('transition');
    },3000)
}

// function Changebutton(theme)
// {
//     if(theme == "light")
//     {
//         var button = document.getElementsByClassName("btn")
//         button[0].classList.replace("btn-outline-dark","btn-outline-light")
//         document.getElementById("starwars").src="https://m.media-amazon.com/images/M/MV5BNDhlNWFiZTItMjFhZi00NGRmLWI2ZmUtNzdjYjUzM2VmNDIxXkEyXkFqcGdeQW1yb3NzZXI@._V1_UX477_CR0,0,477,268_AL_.jpg";
// 		document.getElementById("starwars").title="Light Mode"
//         button['newgame'].classList.replace("btn-outline-dark","btn-outline-light")
//         button['joingame'].classList.replace("btn-outline-dark","btn-outline-light")  
//     }
//     else
//     {
//         var button = document.getElementsByClassName("btn")
//         button[0].classList.replace("btn-outline-light","btn-outline-dark")
//         document.getElementById("starwars").src="https://cdn.hitc-s.com/i/1232/star_wars_battlefront_darth_vader_2_1026058.jpg";
// 		document.getElementById("starwars").title="Dark Mode"
//         button['newgame'].classList.replace("btn-outline-light","btn-outline-dark")
//         button['joingame'].classList.replace("btn-outline-light","btn-outline-dark")
//     }
// }

// document.getElementById("Singleplayer").onclick = function(event){
//     event.preventDefault();
//     // alert("Getting clicked")
//     document.getElementById("gamemode").setAttribute("style","display:none");
//     document.getElementById("singlemode").setAttribute("style","display:flex");
//     // document.getElementById("h1").setAttribute("style","display:none");
// }

//Single Player game

// document.getElementById("newsinglegame").onclick = function(event){
        
//     event.preventDefault();
//     console.log("Hello")
//     var name = document.getElementById("singlemodename").value;
//     document.getElementById("singlemode").setAttribute("style","display:none");
//     document.getElementById("game").setAttribute("style","display:block");
//     // document.getElementById("h1").setAttribute("style","display:none");
//     // document.getElementById("h2").setAttribute("style","display:flex");

//     document.getElementById("opp_name").innerHTML = "CPU";
//     document.getElementById("player_name").innerHTML = name;
//     document.getElementById("opp_score").innerHTML = "CPU's score";
    
//     var finish=true;
//     var count=0;
//     var arrTic = document.getElementsByClassName("col");

//     for(let i=0;i<arrTic.length;i++)
//     {
//         arrTic[i].onclick = function(){

//             var cputurn = Math.floor(Math.random() * Math.floor(9));

//             while(arrTic[cputurn].getAttribute("checked")=="true")
//                 cputurn = Math.floor(Math.random() * Math.floor(9));
            
//             if(this.getAttribute("checked")!="true")
//             {
//                 this.setAttribute("checked","true");
//                 //console.log(this.id);
//                 //this.style.backgroundColor="#4CAF50";
//                 console.log(i+" was clicked")
//                 ++count;
//                 if(count%2!=0)
//                     this.innerHTML = "X";
//                 else
//                     arrTic[cputurn].innerHTML = "O";
//             }
//             Check(arrTic)
//         }
//     }

//     function Check(arrTic)
//     {
//         if(count>4 && !finish)
//         {
//             if(checkValue(0,1,2))
//             {
//                 finish = true;
//             }
//             else if(checkValue(3,4,5))
//             {
//                 finish = true;
//             }
//             else if(checkValue(6,7,8))
//             {
//                 finish = true;
//             }
//             else if(checkValue(0,3,6))
//             {
//                 finish = true;
//             }
//             else if(checkValue(1,4,7))
//             {
//                 finish = true;
//             }
//             else if(checkValue(2,5,8))
//             {
//                 finish = true;
//             }
//             else if(checkValue(0,4,8))
//             {
//                 finish = true;
//             }
//             else if(checkValue(2,4,6))
//             {
//                 finish = true;
//             }
//             else if(count==9)
//             {
//                 Show();
//             }
//         }
//     }

//     function Show()
//     {
//         if(count != 9)
//         {
//             $(document).ready(function() { 
//                 $("#Winmsg").modal("show"); });
//         }
//         else
//         {
//             document.getElementById("Winmsgbody").innerHTML = "<p align='center'>Draw</p>";
//             $(document).ready(function() { 
//             $("#Winmsg").modal("show"); });
//         }
    
//     }

//     function checkValue(x,y,z)
//     {
//         if(arrTic[x].innerHTML == "O" && arrTic[y].innerHTML == "O" && arrTic[z].innerHTML == "O" || arrTic[x].innerHTML == "X" && arrTic[y].innerHTML == "X" && arrTic[z].innerHTML == "X" )
//         {
//             // arrTic[x].style.backgroundColor="#4CAF50";
//             // arrTic[y].style.backgroundColor="#4CAF50";
//             // arrTic[z].style.backgroundColor="#4CAF50";
//             changeother(x,y,z);
//             show();
//             if(arrTic[x].innerHTML == "O")
//                 document.getElementById("Winmsgbody").innerHTML = "<p align='center'>Player 2 wins</p>";
//             else
//                 document.getElementById("Winmsgbody").innerHTML = "<p align='center'>Player 1 wins</p>";
                
//             return true;
//         }
//         else
//             return false;
//     }

//     function changeother(a,b,c)
//     {
//         for(var i=0;i<arrTic.length;i++)
//         {
//             if(i!=a && i!=b && i!=c)
//             {
//                 arrTic[i].innerHTML ="";
//             }
//         }
//     }

//     function Reset()
//     {
//         count = 0;
//         finish = false;
        
//         for(var i=0;i<arrTic.length;i++)
//         {
//             arrTic[i].setAttribute("checked","false");
//             arrTic[i].innerHTML ="";
//         }   
//     }
// }




(function()
{
    var arrTic = document.getElementsByClassName("box");
    var opp_name = document.getElementById("opp_name").innerHTML;
    var socket = io(),player,game;
    var ID;
    var gamemode;

    // document.getElementsByClassName("button").onmouseover(
    //     alert("on")
    // )
    
    $("button").hover(
        function () {
        //   $(this).addClass("btn-light");
          $(this).toggleClass("btn-outline-dark");
        //   $(this).toggleClass("btn-outline-light");

        //   alert("Hello")
        },
        // function () {
        //   $(this).tClass("btn-outline-light");
        // }
    );
    
    //Player clicks on single player game-mode
    document.getElementById("Singleplayer").onclick = function(event){
        event.preventDefault();
        // alert("Getting clicked")
        console.log("IN singlegame")
        document.getElementById("gamemode").setAttribute("style","display:none");
        document.getElementById("singlemode").setAttribute("style","display:flex");
        // document.getElementBcyId("h1").setAttribute("style","display:none");
    }
    
    document.getElementById("newsinglegame").onclick = function(event){
        
        // event.preventDefault();
        var name = document.getElementById("singlemodename").value;
        console.log("In newsinglegame",name);
        if(!name)
            alert("Please enter your name.")
        else
        {
            document.getElementById("singlemode").setAttribute("style","display:none");
            document.getElementById("game").setAttribute("style","display:block");
            // document.getElementById("h1").setAttribute("style","display:none");
            // document.getElementById("h2").setAttribute("style","display:flex");

            document.getElementById("opp_name").innerHTML = "CPU";
            document.getElementById("player_name").innerHTML = name;
            document.getElementById("right_score").innerHTML = "CPU's score" + "<div id=\"oppscore\">0</div>";
            SingleGame();
        }   
    }
    
    function SingleGame()
    {   
        var gamestate = {
            finish:false,
            count:0
        }
        gamemode="Single"
        
        console.log("In singlegame")
        // alert("Ingame")

        // for(let i=0;i<arrTic.length;i++)
        // {
        //     if(arrTic[i].getAttribute("checked") == "true")
        //         console.log(i,"1234Chechked");
        //     else
        //         console.log(i,"123UnChechked");
        // }

        // for(let i=0;i<arrTic.length;i++)
        // {
        //     arrTic[i].onclick = function(){
        //         console.log("In arrtic onclick")
                
        //         for(let i=0;i<arrTic.length;i++)
        //         {
        //             if(arrTic[i].getAttribute("checked") == "true")
        //                 console.log("Before is Chechked",i);
        //             else
        //                 console.log("Before is UnChechked",i);
        //         }

        //         if(this.getAttribute("checked")!="true" && !finish)
        //         {
        //             // console.log("This is not checked")
        //             this.setAttribute("checked","true");
        //             //console.log(this.id);
        //             //this.style.backgroundColor="#4CAF50";
        //             // console.log(i+" was clicked")
        //             ++count;
        //             if(count%2==0)
        //                 this.innerHTML = "X";
        //             else
        //                 this.innerHTML = "O";
        //         }

        //         for(let i=0;i<arrTic.length;i++)
        //         {
        //             if(arrTic[i].getAttribute("checked") == "true")
        //                 console.log("After is Chechked",i);
        //             else
        //                 console.log("After is UnChechked",i);
        //         }

        //     }
        //     // if(arrTic[i].getAttribute("checked") == "true")
        //     //     console.log(i,"Chechked");
        //     // else
        //     //     console.log(i,"UnChechked");
        // }



        ID = setInterval(function(){
            Check(gamestate)
            console.log("In setinterval")
            console.log("arrTic:")
            // for(let i=0;i<arrTic.length;i++)
            // {
            //     console.log("Checked",i,arrTic[i].getAttribute("checked"))
            // }
            if(gamestate.count%2==0 && !gamestate.finish)
            {
                for(let i=0;i<arrTic.length;i++)
                {
                    arrTic[i].onclick = function(){
                        console.log("In arrtic onclick")

                        if(this.getAttribute("checked")!="true" && !gamestate.finish)
                        {
                            console.log("This is not checked")
                            this.setAttribute("checked","true");
                            //console.log(this.id);
                            //this.style.backgroundColor="#4CAF50";
                            // console.log(i+" was clicked")
                            ++gamestate.count;
                            this.innerHTML = "X";
                            changeTurn(gamestate)
                            // else
                            //     arrTic[cputurn].innerHTML = "O";
                        }
                    }
                }
            }
            else if(gamestate.count%2!=0 && !gamestate.finish)
            {
                console.log("Gamestate:",gamestate.finish)
                setTimeout(()=>{
                    var cputurn = Math.floor(Math.random() * Math.floor(9));
                    // console.log("CPU will play",cputurn)
                    while(arrTic[cputurn].getAttribute("checked")=="true" && gamestate.count < 9)
                    {
                        console.log("CPU will play",cputurn)
                        cputurn = Math.floor(Math.random() * Math.floor(9));
                        
                    }
                    // console.log("after while")
                        
                    // setTimeout(function(){
                    if(arrTic[cputurn].getAttribute("checked")!="true" && gamestate.count < 9)
                    {
                        // console.log("CPU Played",cputurn)
                        // alert("CPU Played")
                        // setTimeout(()=>{
                            arrTic[cputurn].setAttribute("checked","true");
                            arrTic[cputurn].innerHTML = "O";
                            ++gamestate.count;
                            changeTurn(gamestate)
                        
                        // },800)
                        
                        
                    }
                    // if(count >=9)
                    //     finish = true;
                    // },1000);
                },800);
            }
            console.log("Previous has played. count:",gamestate.count)
            
            console.log("In setinterval. Finish:",gamestate.finish)
        },1000);

        document.getElementById("resetbutton").onclick = function(){
            console.log("In reset mode")    
            Reset(gamestate);      
        }

        document.getElementById("quitbutton").onclick = function(){
            console.log("In quit mode")
            document.getElementById("Winmsgbody").innerHTML = "Loading main page ...";
            location.reload();
        }

        //     for(let i=0;i<arrTic.length;i++)
        //     {
        //         arrTic[i].onclick = function(){
        //             console.log("In arrtic onclick")

        //             if(this.getAttribute("checked")!="true" && !finish)
        //             {
        //                 this.setAttribute("checked","true");
        //                 //console.log(this.id);
        //                 //this.style.backgroundColor="#4CAF50";
        //                 // console.log(i+" was clicked")
        //                 ++count;
        //                 this.innerHTML = "X";
        //                 // else
        //                 //     arrTic[cputurn].innerHTML = "O";
        //             }
        //         }
        //     }
        // // }
        // else
        // {
        //     var cputurn = Math.floor(Math.random() * Math.floor(9));
    
        //     while(arrTic[cputurn].getAttribute("checked")=="true")
        //         cputurn = Math.floor(Math.random() * Math.floor(9));
        //     arrTic[cputurn].innerHTML = "O";
        //     ++count;
        // }
        // Check(arrTic)
    // }


    // for(let i=0;i<arrTic.length;i++)
    // {
    //     arrTic[i].onclick = function(){

    //         if(count%2==0)
    //         {
    //             if(this.getAttribute("checked")!="true")
    //             {
    //                 this.setAttribute("checked","true");
    //                 //console.log(this.id);
    //                 //this.style.backgroundColor="#4CAF50";
    //                 console.log(i+" was clicked")
    //                 ++count;
    //                 if(count%2!=0)
    //                     this.innerHTML = "X";
    //                 // else
    //                 //     arrTic[cputurn].innerHTML = "O";
    //             }
    //         }
    //         else
    //         {
    //             var cputurn = Math.floor(Math.random() * Math.floor(9));

    //             while(arrTic[cputurn].getAttribute("checked")=="true")
    //                 cputurn = Math.floor(Math.random() * Math.floor(9));
    //             arrTic[cputurn].innerHTML = "O";
    //             ++count;
    //         }
            
            
    //         Check(arrTic)
    //     }
    }

    function Check(gamestate)
    {
        if(gamestate.count>4 && !gamestate.finish)
        {
            if(checkValue(0,1,2,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(3,4,5,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(6,7,8,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(0,3,6,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(1,4,7,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(2,5,8,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(0,4,8,gamestate))
            {
                gamestate.finish = true;
            }
            else if(checkValue(2,4,6,gamestate))
            {
                gamestate.finish = true;
            }
            else if(gamestate.count>=9)
            {
                clearInterval(ID);
                Show(gamestate);
            }
        }
        // else if(finish)
        // {
        //     Show(count);
        // }

    }

    function Show(gamestate)
    {
        if(gamestate.count != 9)
        {
            $(document).ready(function() { 
                $("#Winmsg").modal("show"); });
        }
        else
        {
            document.getElementById("Winmsgbody").innerHTML = "The match was a Draw" //"<p align='center'> The match was a DrawThe match</p>";
            $(document).ready(function() { 
            $("#Winmsg").modal("show"); });
        }
    
    }

    function checkValue(x,y,z,gamestate)
    {
        if(arrTic[x].innerHTML == "O" && arrTic[y].innerHTML == "O" && arrTic[z].innerHTML == "O" || arrTic[x].innerHTML == "X" && arrTic[y].innerHTML == "X" && arrTic[z].innerHTML == "X")
        {
            // arrTic[x].style.backgroundColor="#4CAF50";
            // arrTic[y].style.backgroundColor="#4CAF50";
            // arrTic[z].style.backgroundColor="#4CAF50";
            changeother(x,y,z);
            // alert("Won");
            console.log("Calling clear interval",ID)
            clearInterval(ID);
            Show(gamestate.count);
            if(arrTic[x].innerHTML == "O")
            {
                document.getElementById("Winmsgbody").innerHTML = "<p align='center'>CPU wins</p>";
                document.getElementById("oppscore").innerHTML++
                document.getElementById("secondoppscore").innerHTML++
                // alert("CPU score upgrade")
            }
            else
            {
                document.getElementById("Winmsgbody").innerHTML = "<p align='center'>You won</p>";
                document.getElementById("playerscore").innerHTML++ 
                document.getElementById("secondplayerscore").innerHTML++ 
                // alert("Player score upgrade")
            }
            console.log("In checkValue")
            console.log("Gamemode:",gamemode)
            return true;
        }
        else
            return false;
    }

    function changeother(a,b,c)
    {
        for(var i=0;i<arrTic.length;i++)
        {
            if(i!=a && i!=b && i!=c)
            {
                arrTic[i].innerHTML ="";
            }
        }
    }

    function changeTurn(gamestate)
    {
        console.log("In changeturn ",gamestate.count)
        if(gamestate.count%2==0)
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

    function Reset(gamestate)
    {
        gamestate.count = 0;
        gamestate.finish = false;
        
        for(var i=0;i<arrTic.length;i++)
        {
            arrTic[i].setAttribute("checked","false");
            arrTic[i].innerHTML ="";
        }
        $("#Winmsg").modal("toggle");
        SingleGame()

    }


    //Player clicks on two player game-mode
    document.getElementById("Twoplayer").onclick = function(event){
        event.preventDefault();
        // alert("Getting clicked")
        console.log("IN twoplayergame")
        document.getElementById("gamemode").setAttribute("style","display:none");
        document.getElementById("multimode").setAttribute("style","display:flex");
        // document.getElementBcyId("h1").setAttribute("style","display:none");
    }
    
    //Player clicks on newgame in two player mode
    document.getElementById("newgame").onclick = function(event){
            event.preventDefault();
            // document.getElementById("multimode").setAttribute("style","display:none");
            // document.getElementById("game").setAttribute("style","display:block");
            var name = document.getElementById("newname").value;

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
                    name:name});
                player = new Player(name,"X");
            } 
        }
    
    //Joining an existing game
    document.getElementById("joingame").onclick = function(event){
        // event.preventDefault();
        var name = document.getElementById("joinname").value;
        var roomID = document.getElementById("roomID").value;
        
        // if(document.getElementById("joinname").value == "")

        
        console.log("In joingame")
        
        if(!roomID && !name)
            alert("Please enter your name and the room ID you want to join.");
        else if(!name)
        {
            alert("Please enter your name before joining.");
        }
        else if(!roomID)
            alert("Please enter the room ID before joining."); 
        else
        {
            ChangepageTwoPlayer()
            console.log("In joingame,just before emit")
            socket.emit("joinGame",{
                name:name,
                room:roomID
            });
            player = new Player(name,"O");
        }  
    }

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
         if(!player.getgamestarted() && !game.getfinish())
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
         if(game.getfinish() == true)
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
})();

