async function getPortfolio(){
    try{
       let result = await axios.get(`${API_PATH}/util/frontend-token`);
       let token = result.data.data.token;
       
       let portfolioResult =  await axios.get(`${API_PATH}/portfolios/frontend`,{
              headers: {"Authorization":"Bearer "+token}
        }); 
      
        let portfolios = portfolioResult.data.data.portfolios;


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
                                            <div class="ashade-album-item__inner is-inview">
                                                <img style="object-fit: cover;" src="${IMAGE_PATH}${portfolio.thumbImg}" alt="My Special Day" width="1000" height="1200">
                                                <div class="ashade-album-item__overlay"></div>
                                                <div class="ashade-album-item__title">
                                                    <h2>
                                                        <span>${portfolio.short_title}</span>
                                                        ${portfolio.title}
                                                    </h2>
                                                </div>
                                                <a onclick="navigateToDetailPage('${portfolio.hex_id}')" class="ashade-button">Explore</a>
                                            </div>
                                        </div>`);
        });
       if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
           }
           else
           {
               ashade_ribbon.init();
               }
         
       //remove token 
       axios.delete(`${API_PATH}/util/frontend-token`,{
         headers: {"Authorization":"Bearer "+token}
       })

    } catch(error){
       console.log(error);
       alert("something went wrong")
    }
}

getPortfolio();


function navigateToDetailPage(hexId){
   
   localStorage.setItem("hexId",hexId);
   window.location.href= "/portfolio-detail";
}