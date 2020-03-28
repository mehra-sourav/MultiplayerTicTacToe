//For changing login and signup tab borders in Login/Signup modal
// function changeborder(a)
//     {
//         if(a == "signup")//Login tab is active
//         {
//             // alert("current active:login")
//             document.getElementById("login").style.borderWidth = "1px";
//             document.getElementById("login").style.borderBottomWidth = "0px";
//             document.getElementById("login").style.borderTopWidth = "2px";
//             document.getElementById("login").style.borderTopColor = "#0F9D58";

//             document.getElementById("signup").style.borderWidth = "0px";
//             document.getElementById("signup").style.borderBottomWidth = "1px";
//             document.getElementById("signup").style.borderBottomColor = "grey";
//         }
//         else//Signup tab is active
//         {
//             // alert("Signup is active")
//             document.getElementById("signup").style.borderWidth = "1px";
//             document.getElementById("signup").style.borderBottomWidth = "0px";
//             document.getElementById("signup").style.borderTopWidth = "2px";
//             document.getElementById("signup").style.borderTopColor = "#0F9D58";
//             // document.getElementById("signup").style.borderBottomColor = "grey";
            
//             document.getElementById("login").style.borderWidth = "0px";
//             document.getElementById("login").style.borderBottomWidth = "1px";
//             document.getElementById("login").style.borderBottomColor = "grey";
//         }
//     }
        

    // Login/signup modal shown
    // document.getElementById("signup-form").style.display = "none";
    // document.getElementById("signup").style.backgroundColor = "lightgrey";
    // changeborder("signup")


    // document.getElementById("signup").onclick = () =>{
    //     // alert("Hello")
    //     document.getElementById("login-form").style.display = "none";
    //     document.getElementById("login").style.backgroundColor = "lightgrey";

    //     document.getElementById("signup-form").style.display = "block";

    //     document.getElementById("signup").style.backgroundColor = "white";
    //     changeborder("login")
    // }

    // document.getElementById("login").onclick = () =>{
    //     // alert("Hello")
    //     document.getElementById("signup-form").style.display = "none";
    //     document.getElementById("signup").style.backgroundColor = "lightgrey";

    //     document.getElementById("login-form").style.display = "block";
    //     document.getElementById("login").style.backgroundColor = "white";
    //     changeborder("signup")
    // }

    $(".choicebutton").hover(
        function () {
        //   $(this).addClass("btn-light");
          $(this).toggleClass("btn-outline-dark");
        
        },
    );

    
    document.getElementById("Loginlink").onclick = (event) =>
    {
        event.preventDefault();
        // alert("Signin clicked")
        document.querySelector(".bg-modal").style.display = "flex";
        // console.log("Here")
        // console.log(document.querySelector(".bg-modal"))
    }

    document.querySelector("#showlogin").onclick = (event) =>
    {
        document.querySelector(".bg-modal").style.display = "flex";
    }

    document.querySelector("#showsignupmodal").onclick = (event) =>
    {
        event.preventDefault();
        changetosignup();
    }

    document.querySelector("#showloginmodal").onclick = (event) =>
    {
        event.preventDefault();
        changetologin()
    }

    //Function to change to login modal
    function changetologin()
    {
        document.getElementsByClassName("content-modal")[0].classList.remove("logincard")
        setTimeout(()=>{
            document.querySelector("#signup").style.display = "none";
            document.querySelector("#login").style.display = "block";
        },400)
    }
    //Function to change to signup modal
    function changetosignup()
    {
        document.getElementsByClassName("content-modal")[0].classList.add("logincard")
        setTimeout(()=>{
            document.querySelector("#login").style.display = "none";
            document.querySelector("#signup").style.display = "block";
        },400)
    }

    //Function for validating email
    function checkEmail()
    {
        let email = document.getElementsByName("signupemail")[0].value
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // let secondPass = document.getElementsByName("confirmsignuppassword")[0].value

        if(!email.match(mailformat))
        {
            document.getElementById("emailerrormsg").innerText = "Invalid email"
            document.getElementById("emailerrormsg").style.setProperty("display","block");
            document.getElementsByName("signupemail")[0].classList = "redborder"
        }
        else
        {
            document.getElementById("emailerrormsg").innerText = ""
            // document.getElementById("emailerrormsg").style.setProperty("display","none");
            document.getElementsByName("signupemail")[0].classList.remove("redborder")
        }

    }
    
    //Function for checking if password is same
    function checkPass()
    {
        let firstPass = document.getElementsByName("signuppassword")[0].value
        let secondPass = document.getElementsByName("confirmsignuppassword")[0].value

        if(firstPass != secondPass)
        {
            document.getElementById("pswderrormsg").innerText = "Passwords don't match"
            document.getElementById("pswderrormsg").style.setProperty("display","block");
            document.getElementsByName("confirmsignuppassword")[0].classList = "redborder"
        }
        else
        {
            document.getElementById("pswderrormsg").innerText = ""
            document.getElementById("pswderrormsg").style.setProperty("display","none");
            document.getElementsByName("confirmsignuppassword")[0].classList.remove("redborder")
        }

    }

    //Checking if confirm password field's border is red.If yes, then on focus remove the red border
    // document.getElementsByName("confirmsignuppassword")[0].onfocus = function(){
    //     if(document.getElementsByName("confirmsignuppassword")[0].classList.value == "redborder")
    //     {
    //         document.getElementsByName("confirmsignuppassword")[0].classList.remove("redborder")
    //     }
    // }


    //Closing Login/Signup modal
    let closeelements = document.getElementsByClassName("authmodalclose")
    let closeFunction = function(){ 
        for(let i=0;i<closeelements.length;i++)
        {
            document.querySelector(".bg-modal").style.display = "none";
        }
    }
    for (let i = 0; i < closeelements.length; i++) {
        closeelements[i].addEventListener('click', closeFunction, false);
    }
    

    $('#signup-form').submit(function(e) {
        e.preventDefault();
        // console.log(document.getElementsByName("confirmsignuppassword")[0].classList)
        var elements = $(this).serializeArray()
        // console.log("ELements:",elements)
        var data =  $(this).serialize();
        // console.log("In this:",decodeURIComponent(data))
        // console.log(data);
        if(elements[2].value != elements[3].value)
        {
            alert("Passwords don't match. Please enter the same passwords in both fields.")
            //Making the border red
            document.getElementsByName("confirmsignuppassword")[0].className = "redborder"
        }
        else
        {
            $.post('/signup', data, function(result) {
                if(result == "Signedup")
                {
                    document.getElementById("Msgbody").innerHTML = "Signed up. You can login now."
                    $("#Msg").modal("toggle");
    
                    //Toggles tab to login once user has signed up
                    $('#Msg').on("hidden.bs.modal", function (e) {
                        setTimeout(() => {
                            changetologin()
                        }, 200);
                    })
                    
                    // window.location.href = '/profile';
                }
                else if(result == "Userexists")
                {
                    document.getElementById("Msgbody").innerHTML = "This email is already associated with another account. Please try another email."
                    $("#Msg").modal("toggle");
    
                    //Does nothing if user has entered wrong password.Added this statement here as page was switching to signup tab becuase of adding condition in nosuchuser case.
                    $('#Msg').on("hidden.bs.modal", function (e) {
                    })
                }
            });
        }
        
    });

    $('#login-form').submit(function(e) {
        e.preventDefault();
        var data =  $(this).serialize();
        console.log(typeof(data))
        $.post('/login', data, function(result) {
            if(result == "Nosuchuser")
            {
                document.getElementById("Msgbody").innerHTML = "No such user exists with this email.Please sign up first."
                $("#Msg").modal("toggle");

                //Toggles signup modal if user hasn't registered yet
                $('#Msg').on("hidden.bs.modal", function (e) {
                    setTimeout(() => {
                        changetosignup()
                    }, 100);
                })
                // document.getElementById("Msgbody").innerHTML = "Signed up. You can login now."
                // document.getElementById("signup-form").style.display = "block";
                // document.getElementById("signup").style.backgroundColor = "white";

                // document.getElementById("login-form").style.display = "none";
                // document.getElementById("login").style.backgroundColor = "lightgrey";
                // changeborder("login")

                
                // window.location.href = '/profile';
            }
            else if(result == "Wrongpassword")
            {
                document.getElementById("Msgbody").innerHTML = "Wrong password. Please try again."
                $("#Msg").modal("toggle");

                //Does nothing if user has entered wrong password.Added this statement here as page was switching to signup tab becuase of adding condition in nosuchuser case.
                $('#Msg').on("hidden.bs.modal", function (e) {
                })
            }
            else if(result == "game")
            {
                window.location.href = '/game';
            }
        });
    });
    
    //Adding event listener to document to check click outside login/signup modal after it is clicked
    document.addEventListener('click', function (event) {

        let modal = document.querySelector(".content-modal");
        let msgmodal = document.querySelector("#Msg");

        if(!modal.contains(event.target) && !msgmodal.contains(event.target) && event.target.id != 'Loginlink' && event.target.id != 'showlogin') 
        {
            document.querySelector(".bg-modal").style.display = "none";
        }
    });