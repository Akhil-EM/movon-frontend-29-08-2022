// Multiple Image Upload Enquiry Form
var imgArr = [];
var imgArrTheme = [];

jQuery(document).ready(function () {
    ImgUpload();

    $("#socialmedia").blur(function (e) { 
      e.preventDefault();
       
        if($("#socialmedia").val()) checkNameExists();
    });

    $("#email").blur(function (e) { 
      e.preventDefault();
       
        if($("#email").val()) checkEmailExists();
    });

    $("#number").blur(function (e) { 
      e.preventDefault();
       
        if($("#number").val()) checkPhoneExits();
    });


});
  
  function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];
  
    $('.upload__inputfile').each(function () {
      $(this).on('change', function (e) {
        imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
        var maxLength = $(this).attr('data-max_length');
  
        var files = e.target.files;
        var fileSize = files[0].size / 1024 / 1024;
        var inputName = jQuery(this).attr('id');
        var check = 0;

        if(fileSize < 5)
        {
        
          if (inputName == "profileimg") {
            check = 1;
            
            let profileImages = document.querySelector('#profileimg').files;
          
            if (profileImages.length == 1) {
              imgArr.push(profileImages[0]);
            }
            else {
              var len = profileImages.length;
              for (i = 0; i < len; i++) {
                imgArr.push(profileImages[i])
              }
            }
          } else if (inputName == "themeimg")
          {
             check = 2;
             let themeImages = document.querySelector('#themeimg').files;
          
            if (themeImages.length == 1) {
              imgArrTheme.push(themeImages[0]);
            }
            else {
              var len = themeImages.length;
              for (i = 0; i < len; i++) {
                imgArrTheme.push(themeImages[i])
              }
            }

            }
        
        var filesArr = Array.prototype.slice.call(files);
        var iterator = 0;
        filesArr.forEach(function (f, index) {
  
          if (!f.type.match('image.*')) {
            return;
          }
  
          if (imgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < imgArray.length; i++) {
              if (imgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              imgArray.push(f);
  
              var reader = new FileReader();
              reader.onload = function (e) {
                var html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' data-check="+check+" class='img-bg'><div class='upload__img-close'></div></div></div>";
                imgWrap.append(html);
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
        });

      } else
      {
        Swal.fire('',"please upload image under 5mb",'warning');
      }

      });
    });
  
    $('body').on('click', ".upload__img-close", function (e) {
     
      var file = $(this).parent().data("file");
       
      //profile img
      var checking = jQuery(this).parent().attr('data-check');
         
      if (checking == 1) {

        for (var i = 0; i < imgArr.length; i++) {
          if (imgArr[i].name === file) {
            imgArr.splice(i, 1);
            break;
          }
        }
      } else if (checking == 2)
      {
         //theme img
      
       for (var i = 0; i < imgArrTheme.length; i++) {
        if (imgArrTheme[i].name === file) {
          imgArrTheme.splice(i, 1);
          break;
        }
       }
        }
      
      for (var i = 0; i < imgArray.length; i++) {
        if (imgArray[i].name === file) {
          imgArray.splice(i, 1);
          break;
        }
      }
      console.log(imgArr)
      console.log(imgArrTheme)
      $(this).parent().parent().remove();
    });
  }



//age fiels only numbers resist others
jQuery("#age").keyup(function(){
  jQuery(this).val(jQuery(this).val().replace(/[^\d.]/g, ''));
  var age = jQuery(this).val();
  if (age < 18)
  {
    jQuery("#under18").removeAttr("disabled");
    jQuery("#under18").css({ opacity: 1 });
  }
  else
  {
     jQuery("#under18").attr("disabled", true);
    jQuery("#under18").css({ opacity: 0.4 });
    }

});

//name field only charactser resist others
jQuery("#name").keyup(function(){
  jQuery(this).val(jQuery(this).val().replace(/[^A-Za-z]+/g, ''));
});

//phone number only numbers resist others
jQuery("#number").keyup(function(){
  jQuery(this).val(jQuery(this).val().replace(/[^\d.]/g, ''));
});


// Enquiry Form Validation

  jQuery(document).ready(function () {
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
       }, "Value must not equal arg.");
       $.validator.addMethod("miniage", function(value, element, arg){
        return value >= arg;
       }, "Value must not equal arg.");

    $("#enquiry_form").validate({
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            gender : { valueNotEquals: "0" },
            number: {
                required: true,
                minlength: 8,
                maxlength: 13,
            },
            nationality : { required : false },
            location : { required : true },
            age : { required: true,
                miniage: 1,
                // maxAge : 150   
             },
             under18 : { valueNotEquals: "0" },
             socialmedia : { required : true },
            //  profileimg: {
            //   required: true,
            //   },
              height : { required : true },
              haircolor : { required : true },
           bodyweight : { required : true },
           waist : { required : true },
          //  chestbust  : { required : true },
            
        },
        messages : {
           name :
              { required: "Please Enter Your Name"
              },
           email : 
              { required: "Please Enter Your Email",
                email : "Please Enter Valid Email"
              },
           gender : { 
            valueNotEquals: "Please select gender" 
            },
           number : 
           { required: "Please Enter Your Contact Number",
           minlength: "Please Enter Valid Contact Number",
           maxlength: "Please Enter Valid Contact Number",
           },
           nationality : {
            required: "Please Enter Your Nationality"
           },
           location : 
           { required: "Please Enter Your Location"
           },
           age : { 
            required: "Please enter your age",
            miniage: "Please enter valid data",
           },
           under18 : { valueNotEquals: "Please select you concern" },
           socialmedia : { required : "Please enter your Insatagam/Fb" },
          //  profileimg: { required : "File must be JPG, GIF or PNG, less than 5MB" }, 
           height : { required : "Please enter your height" },
           haircolor : { required : "Please enter your hair color" },
           bodyweight : { required : "Please enter your bodyweight" },
           waist : { required : "Field can't empty" },
          //  chestbust  : { required : "Field can't empty" },

            //maxAge : "Please enter valid data" }

        }
    
});
});



$("#send_enquiry").click(async function (e) { 
   e.preventDefault();
   if($("#enquiry_form").valid()){
      let captchaRes = $("#g-recaptcha-response").val();
      if(captchaRes == ""){
        return alert("please fill out the captcha");
      }

       let name = $("#name").val();
       let email = $("#email").val();
       let gender = $("#gender").val();
       let phone = $("#number").val();
       let nationality = $("#nationality").val();
       let location = $("#location").val();
       let age = $("#age").val();
       let under18 = $("#under18").val();
       let socialmedia = $("#socialmedia").val();
       let height = $("#height").val();
       let haircolor = $("#haircolor").val();
       let bodyweight = $("#bodyweight").val();
       let waist = $("#waist").val();
       let hip = $("#hip").val();
       let chestbust = $("#chestbust").val();
       let theme = $("#theme").val();
       let themelink = $("#themelink").val();
       

       var formData = new FormData();
       //let profileImages = document.querySelector('#profileimg').files;
     let profileImages = imgArr;
     
       if(profileImages.length > 0){
          for (let i = 0; i < profileImages.length; i++) {
              
              formData.append('enquiryImages',profileImages[i]);
              
          }
       }
       
     //let themeImages = document.querySelector('#themeimg').files;
     let themeImages = imgArrTheme;

      if(themeImages.length > 0){
        for (let i = 0; i < themeImages.length; i++) {
              
          formData.append('themeImages',themeImages[i]);
          
        }
      }
       $('#send_enquiry').attr('value', 'Saving...');
      formData.append('name',name);
      formData.append('email',email);
      formData.append('gender',gender);
      formData.append('phone',phone);
      formData.append('nationality',nationality);
      formData.append('location',location);
      formData.append('age',age);
      formData.append('under18',under18);
      formData.append('socialmedia',socialmedia);
      formData.append('height',height);
      formData.append('haircolor',haircolor);
      formData.append('bodyweight',bodyweight);
      formData.append('waist',waist);
      formData.append('hip',hip);
      formData.append('chestbust',chestbust);
      formData.append('theme',theme);
      formData.append('themelink',themelink);
      

      try{
        
        //get token
        let result = await axios.get(`${API_PATH}/util/frontend-token`);
        let token = result.data.data.token;
      
        
       let response =  await axios({
            method: 'post',
            url: `${API_PATH}/enquiry`,
            data: formData,
            headers:{
                "Authorization":"Bearer "+token,
                "content-type": "multipart/form-data"}
          });
         
        
          Swal.fire('',response.data.message,'success');
          $('#contact_form').trigger("reset");
          setTimeout(()=>window.location.reload(),2000)
          removeToken(token);

      } catch (error) {
        $('#send_enquiry').attr('value', 'Send Enquiry');
         Swal.fire('',error.message,'error');
        //let token = result.data.data.token;
       //removeToken(token);
      }


      
   }


});


async function removeToken(token){
    try{
         //remove token 
         
         axios.delete(`${API_PATH}/util/frontend-token`,{
          headers: {"Authorization":"Bearer "+token}
        })
    }catch(error){
      Swal.fire('',error.message,'error');
    }
}


async function checkNameExists(){
   let socialmediaId = $("#socialmedia").val();
   
   let result = await axios.get(`${API_PATH}/util/frontend-token`);
   let token = result.data.data.token;

    axios.get(`${API_PATH}/enquiry/check-exists/${socialmediaId}`,{
      headers: {"Authorization":"Bearer "+token}
    })
    .then(function (response){
      removeToken(token);
    })
    .catch(function (error){
      $("#socialmedia").val('');
      Swal.fire('',error.response.data.message,'warning');
    })
}

async function checkEmailExists(){
   let email = $("#email").val();
   
   let result = await axios.get(`${API_PATH}/util/frontend-token`);
   let token = result.data.data.token;

    axios.get(`${API_PATH}/enquiry/check-email-exists/${email}`,{
      headers: {"Authorization":"Bearer "+token}
    })
      .then(function (response) {
      removeToken(token);
      

    })
    .catch(function (error){
      $("#email").val('');
      Swal.fire('',error.response.data.message,'warning');
    })
}

async function checkPhoneExits(){
   let phone = $("#number").val();
   
   let result = await axios.get(`${API_PATH}/util/frontend-token`);
   let token = result.data.data.token;

    axios.get(`${API_PATH}/enquiry/check-phone-exists/${phone}`,{
      headers: {"Authorization":"Bearer "+token}
    })
    .then(function (response){
      removeToken(token);
    })
    .catch(function (error){
      $("#number").val('');
      Swal.fire('',error.response.data.message,'warning');
    })
}

