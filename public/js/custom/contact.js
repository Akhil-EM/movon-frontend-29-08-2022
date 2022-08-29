jQuery("#contact_form").validate({
  rules: {
      name: {
          required: true
      }, 
      email: {
        required: true,
        email: true
    },  
    phone: {
      required: true,
      minlength: 8,
      maxlength: 13,
  }, 
  message : {  required: true  }
  },
  messages : {
     name :
        { required: "Please Enter Your Name"
        },
        email : 
              { required: "Please Enter Your Email",
                email : "Please Enter Valid Email"
              },
              phone : 
           { required: "Please Enter Your Contact Number",
           minlength: "Please Enter Valid Contact Number",
           maxlength: "Please Enter Valid Contact Number",
           },
           message : {  required: "Please Enter Your Message"  }

      //maxAge : "Please enter valid data" }

  },   
});


$("#form-submit-button").click(async function (e) { 
  e.preventDefault();
  try{
     
    if($("#contact_form").valid()){

      
    

    let result = await axios.get(`${API_PATH}/util/frontend-token`);
    let token = result.data.data.token;
    
    let captchaRes = $("#g-recaptcha-response").val();
    if(captchaRes == ""){
      return alert("please fill out the captcha");
    }

    $("#form-submit-button").attr('value', 'Loading...');
   
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let message = $("#message").val();
   
    axios.post(`${API_PATH}/contacts/`,
      {name,email,phone,message,captchaRes},
      {headers: {"Authorization":"Bearer "+token}})
      .then(data=>{
           console.log(data);
           Swal.fire('',data.data.message,'success');
          
          $('#contact_form').trigger("reset");
          setTimeout(()=>window.location.reload(),2000)
      })
      .catch(error=>{
         console.log(error);
          Swal.fire('',error.message,'error');
        $('#ashade-kenburns-slider').append(`<span>${error.response.data.message}</span>`);
      })

      //remove token 
      axios.delete(`${API_PATH}/util/frontend-token`,{
        headers: {"Authorization":"Bearer "+token}
      })
    }


   

    

 }catch(error){
    
    Swal.fire('',error.message,'error');

 }
  

    
});
