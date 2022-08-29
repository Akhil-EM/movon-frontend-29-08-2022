async function getAboutMe(){
    try{
       let result = await axios.get(`${API_PATH}/util/frontend-token`);
       let token = result.data.data.token;
       
      
      
      let aboutResult = await axios.get(`${API_PATH}/about-me/frontend`,{
        headers: {"Authorization":"Bearer "+token}
      });

      let aboutMeContent = aboutResult.data.data.aboutMe;

     
      if(aboutMeContent[0]){
          //set the contents
          let title = (aboutMeContent[0].title).split(" ").splice(0,3).join(" ")
          $('#about-me-title').append(`<span>${aboutMeContent[0].short_title}</span>${title}`);
          $("#about-me-description").text(aboutMeContent[0].description);
        
          
          $("#about-me-image").attr("src",`${IMAGE_PATH}${aboutMeContent[0].image}`);
      }
     
      // $("#signature-image").attr("src",`${IMAGE_PATH}/about-me/${aboutMeContent[0].signatureImage}`);
    
       //remove token 
       axios.delete(`${API_PATH}/util/frontend-token`,{
         headers: {"Authorization":"Bearer "+token}
       })

    }catch(error){
      console.log(error);
      Swal.fire('',(error.message),'error');
    }
}

getAboutMe();