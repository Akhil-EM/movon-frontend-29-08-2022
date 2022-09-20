async function getPortfolioDetail(){
    try{
       let result = await axios.get(`${API_PATH}/util/frontend-token`);
       let token = result.data.data.token;
       
       let hexId = localStorage.getItem("hexId");
       
       let portfolioImagesResult =  await axios.get(`${API_PATH}/portfolios/${hexId}/images/frontend`,{
            headers: {"Authorization":"Bearer "+token}
       }); 
       console.log(portfolioImagesResult);
       let images = portfolioImagesResult.data.data.images;
    //    let portfolio = portfolioImagesResult.data.data.portfolio;
       
     //  $('#ashade-page-title').append(`<span>${portfolio.short_title.split(" ").splice(0,6).join(" ")}</span>${portfolio.title.split(" ").splice(0,4).join(" ")}`);
       
       images.forEach(image => {
        //  console.log(`${IMAGE_PATH}/portfolio/${image.image}`);
         // $('.gallery').append(`<div><img class="gallery__Image" src="${IMAGE_PATH}/portfolio/${image.image}" alt="lorem" data-description="" data-large="${IMAGE_PATH}/portfolio/${image.image}">
         // </div>`);
          
          
            // $('.gallery1').append(`<div class="ashade-album-item">
				// <div class="ashade-album-item__inner">
				// 	<img style="object-fit: cover;" src="${IMAGE_PATH}${image.image}" alt="${image.image}" width="960" height="1200" class="laszy">
				// </div>
			   // </div>`);
          
          $('#gallery1').append(`<div class="ashade-album-item">
                                            <div class="ashade-album-item__inner">
                                                <img style="object-fit: cover;" src="${IMAGE_PATH}${image.image}" alt="${image.image}" width="1000" height="1200">
                                                
                                            </div>
                                        </div>`);
         
ashade_ribbon.init();
         

                                    
       });
      // new AsyncGallery();
    //    if (ashade_slider.$el) {
	// 	   ashade_slider.init();
	//     }
     

    }catch(error){
       console.log(error);
       alert("something went wrong")
    }
}

getPortfolioDetail();
