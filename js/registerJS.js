function sanitize(string) {

  return string.replace(/<(|\/|[^>\/bi]|\/[^>bi]|[^\/>][^>]+|\/[^>][^>]+)>/g, '');
}

$( ".loginButton" ).click(function() {
  var value = $(this).text();
  
  if(value === "Sign Up"){
      
      var username = $("#username").val();
      var password = $("#password").val();
      
      username = sanitize(username);
      password = sanitize(password);
      
      var data = "username="+username+"&&"+"password="+password;
      
     $.ajax({
        type: "POST",
        url: "http://localhost:8080/register", 
        data: data,
        headers:{
            "Access-Control-Allow-Origin":"http://localhost:8080/"
        },
        
        success: function (data) {
            
                if(data==="failure"){
                    
                    $(".messageRow").html('<span class="badge badge-danger">Sorry! You should change the Username..</span>');
                    setTimeout(function(){ $(".messageRow").html("")}, 3000);
                }
                else{
                    
                    $(".messageRow").html('<span class="badge badge-success">Success!</span>');
                    
                }
        }
    });
      
        
  }
  
});
