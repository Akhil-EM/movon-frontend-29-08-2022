async function getPortfolio(){
    try{
       let result = await axios.get(`${API_PATH}/util/frontend-token`);
       let token = result.data.data.token;
       let hexId = localStorage.getItem("hexId");
       let portfolioImagesResult =  await axios.get(`${API_PATH}/portfolios/${hexId}/images/frontend`,{
              headers: {"Authorization":"Bearer "+token}
        }); 
      
        //let portfolios = portfolioResult.data.data.portfolios;
        let portfolios = portfolioImagesResult.data.data.images;

                if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
            $('#albums_carousel').removeClass('is-large')
            $('#albums_carousel').addClass('is-vertical');
            
}else{
  // false for not mobile device
            $('#albums_carousel').removeClass('is-vertical');
            $('#albums_carousel').addClass('is-large');
}
        portfolios.forEach(portfolio => {
            $('#albums_carousel').append(`<div class="ashade-album-item">
                                            <div class="ashade-album-item__inner">
                                                <img style="object-fit: cover;" src="${IMAGE_PATH}${portfolio.image}" alt="${portfolio.image}" width="1000" height="1200">
                                                <div class="ashade-album-item__overlay"></div>
                                            </div>
                                        </div>`);
        });
        
        ashade_ribbon.init();
         
       //remove token 
       axios.delete(`${API_PATH}/util/frontend-token`,{
         headers: {"Authorization":"Bearer "+token}
       })

    }catch(error){
       console.log(error);
       alert("something went wrong")
    }
}

getPortfolio();


function navigateToDetailPage(hexId){
   
   localStorage.setItem("hexId",hexId);
   window.location.href= "/portfolio-detail";
}