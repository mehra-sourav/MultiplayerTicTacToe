(function()
{
    document.getElementById("logout").onclick = function(event)
    {
        // document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        document.cookie = "";
        fetch('/logout',{
            method:"GET",
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            // redirect:"follow"
        })
        window.location.href="/";
    }
    
    
    
    var user = $.get('/userinfo',function(result){
        user = JSON.parse(result);
        console.log("user inside:",user)
        return user
    }).then(result=> {return result;})
    
    // setTimeout(() => {
        
    //     console.log("user outside:",user.ID)
    // }, 2000);

    
        
    var history =  $.get('/matchdata',{ID:user.ID}, function(result) {
            console.log("POSTING matchdata")
            console.log("History:",result)    
        }).then(result=> {makecards(result.history)})//history=result.history})
   

    // setTimeout(() => {
        makecards = (a) =>
        {
            // console.log("In makecards:",a.length)
            if(a.length == 0)
            {
                let tr = document.createElement("tr");
                tr.innerText = "You haven't played any matches yet"
                let table = document.getElementById("matchtable")
                table.appendChild(tr);
            }
            else
            {
                console.log("This is history",a)
                const table = document.getElementById("matchtable")
                for(let i = a.length-1,j = 0;i >= 0,j < 10;i--,j++)//Starting loop from the start as a is ascended sorted and limiting results to 10
                {
                    console.log(i)
                    
                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    let td3 = document.createElement("td");

                    if(i%2 != 0)
                        tr.setAttribute("class","lightmtchbg")

                    td1.innerHTML = a[i].playerA
                    tr.appendChild(td1)

                    td2.innerHTML = a[i].playerAscore + " - " + a[i].playerBscore
                    // //Setting color of score
                    if(a[i].playerAscore > a[i].playerBscore)
                        td2.setAttribute("class","green histscore")
                    else if(a[i].playerAscore < a[i].playerBscore)
                        td2.setAttribute("class","red histscore")
                    else
                        td2.setAttribute("class","grey histscore")
                    tr.appendChild(td2)

                    td3.innerHTML = a[i].playerB
                    tr.appendChild(td3)
                    // table.appendChild(tr)
                    table.append(tr)
                    
                }
                // tr.innerText = "0+ matches available"
                // table.appendChild(tr)
            }
            
            // for(i in )
        }
        // console.log("Outside histry:",history)
    // }, 1000);
    
    



})()