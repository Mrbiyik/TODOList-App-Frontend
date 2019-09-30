

$( ".loginButton" ).click(function() {
  var value = $(this).text();
  
  if(value === "Login"){
      
      var username = $("#username").val();
      var password = $("#password").val();
      var data = "username="+username+"&&"+"password="+password;
      
     $.ajax({
        type: "POST",
        url: "http://localhost:8080/login", 
        data: data,
        headers:{
            "Access-Control-Allow-Origin":"http://localhost:8080/"
        },
        
        success: function (data) {
            
                if(data==="failure"){
                    
                    $(".loginMessage").text("Username or Password is not correct!");
                    setTimeout(function(){ $(".loginMessage").text("")}, 3000);
                }
                else{
                    console.log("set token:"+data);
                    localStorage.setItem('token',data);
                    window.location.href ="home.html";
                    
                }
        }
    });
      
        
  }
  else if(value === "Sign Up"){
      
      window.location.href ="register.html";
      
  }
  
  
});






