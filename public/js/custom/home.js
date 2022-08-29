(async function(){
  try{
     let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
     
     
     let path = `${API_PATH}/images/pc`;
     
     //get sliders
     if(width <=450){
        path = `${API_PATH}/images/mobile`
     }

     
     let result = await axios.get(`${API_PATH}/util/frontend-token`);
     let token = result.data.data.token;
     
     let sliderResults = await axios.get(path,{
       headers: {"Authorization":"Bearer "+token}
     });
     let sliders = sliderResults.data.data.images;
     sliders.forEach(slide => {
        
        $('.ashade-kenburns-slider').append(`<div class="ashade-kenburns-slide" data-src="${IMAGE_PATH}${slide.image}"></div>`);

     });

     loadHomePageSlider();
     initHomepageSliders();
    
     //remove token 
     axios.delete(`${API_PATH}/util/frontend-token`,{
       headers: {"Authorization":"Bearer "+token}
     })

  }catch(error){
    
    Swal.fire('',(error.message),'error');
  }
})()