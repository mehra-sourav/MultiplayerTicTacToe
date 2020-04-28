$(".choicebutton").hover(
    function () {
    //   $(this).addClass("btn-light");
        $(this).toggleClass("btn-outline-dark");
    
    },
);

    
document.getElementById("Loginlink").onclick = (event) =>
{
    event.preventDefault();
    document.querySelector(".bg-modal").style.display = "flex";

}

document.querySelector("#showlogin").onclick = event =>
{
    document.querySelector(".bg-modal").style.display = "flex";
}

document.querySelector("#showsignupmodal").onclick = event =>
{
    event.preventDefault();
    changetosignup();
}

document.querySelector("#showloginmodal").onclick = event =>
{
    event.preventDefault();
    changetologin()
}

//Function to change to login modal
function changetologin()
{
    document.getElementsByClassName("content-modal")[0].classList.remove("logincard")
    setTimeout(() => {
        document.querySelector("#signup").style.display = "none";
        document.querySelector("#login").style.display = "block";
    },400)
}

//Function to change to signup modal
function changetosignup()
{
    document.getElementsByClassName("content-modal")[0].classList.add("logincard")
    setTimeout(() => {
        document.querySelector("#login").style.display = "none";
        document.querySelector("#signup").style.display = "block";
    },400)
}

//Function for validating name
function checkName()
{
    let name = document.getElementsByName("signupname")[0].value;
    let nameformat = /^[a-zA-Z\s*]{1,30}$/;

    if(!name.match(nameformat))
    {
        document.getElementById("nameerrormsg").innerText = "Invalid name";
        document.getElementById("nameerrormsg").style.setProperty("display","block");
        document.getElementsByName("signupname")[0].classList = "redborder";
    }
    else
    {
        document.getElementById("nameerrormsg").innerText = "";
        document.getElementsByName("signupname")[0].classList.remove("redborder");
    }
}


//Function for validating email
function checkEmail()
{
    let email = document.getElementsByName("signupemail")[0].value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!email.match(mailformat))
    {
        document.getElementById("emailerrormsg").innerText = "Invalid email";
        document.getElementById("emailerrormsg").style.setProperty("display","block");
        document.getElementsByName("signupemail")[0].classList = "redborder";
    }
    else
    {
        document.getElementById("emailerrormsg").innerText = "";
        document.getElementsByName("signupemail")[0].classList.remove("redborder");
    }

}
    
//Function for checking if password is same
function checkPass()
{
    let firstPass = document.getElementsByName("signuppassword")[0].value;
    let secondPass = document.getElementsByName("confirmsignuppassword")[0].value;

    if(firstPass != secondPass)
    {
        document.getElementById("pswderrormsg").innerText = "Passwords don't match";
        document.getElementById("pswderrormsg").style.setProperty("display","block");
        document.getElementsByName("confirmsignuppassword")[0].classList = "redborder";
    }
    else
    {
        document.getElementById("pswderrormsg").innerText = "";
        document.getElementsByName("confirmsignuppassword")[0].classList.remove("redborder");
    }

}

     
$('#signup-form').submit(function(e) {
    e.preventDefault();
    
    var elements = $(this).serializeArray()
    var data =  $(this).serialize();
    
    if(elements[2].value != elements[3].value)
    {
        document.getElementById("Msgbody").innerHTML = "Passwords don't match. Please enter the same passwords in both fields."
        $("#Msg").modal("toggle");

        //Making the border red
        document.getElementsByName("confirmsignuppassword")[0].className = "redborder"
    }
    else if(!elements[1].value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    {
        document.getElementById("Msgbody").innerHTML = "Please enter a valid email ID!!"
        $("#Msg").modal("toggle");
    }
    else
    {
        $.post('/signup', data, result => {
            if(result == "Signedup")
            {
                document.getElementById("Msgbody").innerHTML = "Signed up. You can login now."
                $("#Msg").modal("toggle");

                //Toggles tab to login once user has signed up
                $('#Msg').on("hidden.bs.modal", function (e) {
                    setTimeout(() => {
                        changetologin()
                    }, 200);
                });
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

$('#login-form').submit(function(e){
    e.preventDefault();
    // console.log("Login event:",e)
    // console.log("ID and Pass",e.currentTarget[0].value,e.currentTarget[1].value)
    // let userdata = `loginemail=${e.currentTarget[0].value}&loginpassword=${e.currentTarget[1].value}`
    var data =  $(this).serialize();
    // console.log($(this))
    // alert($(this))
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
    
//Adding event listener to document to detect click outside login/signup modal after it is clicked
document.addEventListener('click', event => {

    let modal = document.querySelector(".content-modal");
    let msgmodal = document.querySelector("#Msg");

    if(!modal.contains(event.target) && !msgmodal.contains(event.target) && event.target.id != 'Loginlink' && event.target.id != 'showlogin') 
    {
        document.querySelector(".bg-modal").style.display = "none";
    }
});