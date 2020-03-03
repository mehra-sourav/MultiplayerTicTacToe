//For changing login and signup tab borders in Login/Signup modal
function changeborder(a)
    {
        if(a == "signup")//Login tab is active
        {
            // alert("current active:login")
            document.getElementById("login").style.borderWidth = "1px";
            document.getElementById("login").style.borderBottomWidth = "0px";
            document.getElementById("login").style.borderTopWidth = "2px";
            document.getElementById("login").style.borderTopColor = "#0F9D58";

            document.getElementById("signup").style.borderWidth = "0px";
            document.getElementById("signup").style.borderBottomWidth = "1px";
            document.getElementById("signup").style.borderBottomColor = "grey";
        }
        else//Signup tab is active
        {
            // alert("Signup is active")
            document.getElementById("signup").style.borderWidth = "1px";
            document.getElementById("signup").style.borderBottomWidth = "0px";
            document.getElementById("signup").style.borderTopWidth = "2px";
            document.getElementById("signup").style.borderTopColor = "#0F9D58";
            // document.getElementById("signup").style.borderBottomColor = "grey";
            
            document.getElementById("login").style.borderWidth = "0px";
            document.getElementById("login").style.borderBottomWidth = "1px";
            document.getElementById("login").style.borderBottomColor = "grey";
        }
    }
        

    // Login/signup modal shown
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("signup").style.backgroundColor = "lightgrey";
    changeborder("signup")


    document.getElementById("signup").onclick = () =>{
        // alert("Hello")
        document.getElementById("login-form").style.display = "none";
        document.getElementById("login").style.backgroundColor = "lightgrey";

        document.getElementById("signup-form").style.display = "block";

        document.getElementById("signup").style.backgroundColor = "white";
        changeborder("login")
    }

    document.getElementById("login").onclick = () =>{
        // alert("Hello")
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("signup").style.backgroundColor = "lightgrey";

        document.getElementById("login-form").style.display = "block";
        document.getElementById("login").style.backgroundColor = "white";
        changeborder("signup")
    }

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
        console.log("Here")
    }

    document.querySelector("#showlogin").onclick = (event) =>
    {
        // event.preventDefault();
        // alert("Sign123licked")
        document.querySelector(".bg-modal").style.display = "flex";
        // let socket = io()
        // socket.emit('sfd',{
        //     name:"Hello"
        // });
    }

    document.querySelector(".authmodalclose").onclick = () =>
    {
        console.log("IN")
        document.querySelector(".bg-modal").style.display = "none";
    }

    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        var data =  $(this).serialize();
        $.post('/signup', data, function(result) {
            if(result == "Signedup")
            {
                document.getElementById("Msgbody").innerHTML = "Signed up. You can login now."
                $("#Msg").modal("toggle");

                //Toggles tab to login once use has signed up
                $('#Msg').on("hidden.bs.modal", function (e) {
                    setTimeout(() => {
                
                        document.getElementById("signup-form").style.display = "none";
                        document.getElementById("signup").style.backgroundColor = "lightgrey";

                        document.getElementById("login-form").style.display = "block";
                        document.getElementById("login").style.backgroundColor = "white";
                        changeborder("signup")
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
    });

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        var data =  $(this).serialize();
        console.log(typeof(data))
        $.post('/login', data, function(result) {
            if(result == "Nosuchuser")
            {
                document.getElementById("Msgbody").innerHTML = "No such user exists with this email.Please sign up first."
                $("#Msg").modal("toggle");

                //Toggles tab to signup if user hasn't registered yet
                $('#Msg').on("hidden.bs.modal", function (e) {
                    
                    setTimeout(() => {
                        document.getElementById("Msgbody").innerHTML = "Signed up. You can login now."
                        document.getElementById("signup-form").style.display = "block";
                        document.getElementById("signup").style.backgroundColor = "white";

                        document.getElementById("login-form").style.display = "none";
                        document.getElementById("login").style.backgroundColor = "lightgrey";
                        changeborder("login")
                    }, 200);
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
    
    