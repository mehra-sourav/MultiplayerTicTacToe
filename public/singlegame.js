(function()
{
    var arrTic = document.getElementsByClassName("box");
    document.getElementById("opp_name").innerHTML = "CPU";
    // document.getElementById("player_name").innerHTML = name;
    document.getElementById("right_score").innerHTML = "CPU's score" + "<div id=\"oppscore\">0</div>";

    //Extracting name of user from cookie
    let output = {};
    document.cookie.split(/\s*;\s*/).forEach(function(pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair[1]
    });

    var Playername = output['userName']
    document.getElementById("player_name").innerHTML= Playername

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
    //         // console.log("NAme:",jsonData);
    //         document.getElementById("player_name").innerHTML= jsonData
    //         // return jsonData
            
    //     }
    //     catch(error)
    //     {

    //     }
    // }
    
    // console.log("Calling fetchusername")
    // var name = fetchusername()
    // console.log("Name:",name)
      

    // console.log("In singlegame.username:",cookie)

    SingleGame();

    function SingleGame()
    {   
        var gamestate = {
            finish:false,
            count:0,
            // playerturn:true
        }
        gamemode="Single"
        
        console.log("In singlegame")
        
        // Playerturn(gamestate)
        
        ID = setInterval(function(){
            Check(gamestate)
            console.log("In setinterval")
            console.log("arrTic:")
            // for(let i=0;i<arrTic.length;i++)
            // {
            //     console.log("Checked",i,arrTic[i].getAttribute("checked"))
            // }
            if(gamestate.count%2==0 && !gamestate.finish)// && gamestate.playerturn)
            {
                console.log("Player's turn.Playerturn:",gamestate.playerturn)
                for(let i=0;i<arrTic.length;i++)
                {
                    arrTic[i].onclick = function(){
                        console.log("In arrtic onclick")

                        if(this.getAttribute("checked")!="true"  && gamestate.count%2==0)
                        {
                            console.log("This is not checked")
                            this.setAttribute("checked","true");
                            //console.log(this.id);
                            //this.style.backgroundColor="#4CAF50";
                            // console.log(i+" was clicked")
                            ++gamestate.count;
                            this.innerHTML = "X";
                            changeTurn(gamestate)
                            console.log("Player's turn.Playerturn now:",gamestate.playerturn)
                            // else
                            //     arrTic[cputurn].innerHTML = "O";
                        }
                    }
                }
            }
            else if(gamestate.count%2!=0 && !gamestate.finish)// && !gamestate.playerturn)
            {
                console.log("Gamestate:",gamestate.finish)
                console.log("CPU's turn.Playerturn:",gamestate.playerturn)
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
                            console.log("CPU's turn.Playerturn now:",gamestate.playerturn)
                        
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
            window.location.href = '/game';
            console.log(document.user)
        }
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
            // gamestate.playerturn = !gamestate.playerturn
            // Playerturn(gamestate)
        }
        else
        {
            document.getElementById("player_name").setAttribute("style","background-color:transparent");
            document.getElementById("opp_name").setAttribute("style","background-color:var(--select-color)");
            // gamestate.playerturn = !gamestate.playerturn 
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
}
)()