async function getServices(){
    try{
       let result = await axios.get(`${API_PATH}/util/frontend-token`);
       let token = result.data.data.token;
       
       let serviceResult =  await axios.get(`${API_PATH}/services/frontend`,{
                                     headers: {"Authorization":"Bearer "+token}
                                  }); 

       let services  = serviceResult.data.data.services;
       
       services.forEach(service => {
          $('#ashade-service-card-grid').append(`<div class="ashade-service-card">
                                                    <div class="ashade-service-card__head">
                                                        <div class="ashade-service-card__image">
                                                            <img src="${IMAGE_PATH}${service.image}" alt="Personal Session">
                                                        </div>
                                                        <div class="ashade-service-card__label">
                                                            <h4>
                                                            <span>${service.short_title.split(" ").splice(0,6).join(" ")}</span>
                                                                    ${service.title.split(" ").splice(0,3).join(" ")}
                                                            </h4>
                                                        </div>
                                                        </div>
                                                        <div class="ashade-service-card__content">
                                                            <p>${service.description}</p>
                                                            <div class="align-right">
                                                                <a href="/portfolio" class="ashade-learn-more">Explore Works</a>
                                                            </div>
                                                    </div>
                                                </div>`);
       });
   

           
      
       //remove token 
    //    axios.delete(`${API_PATH}/util/frontend-token`,{
    //      headers: {"Authorization":"Bearer "+token}
    //    })

    }catch(error){
       console.log(error);
       alert("something went wrong")
    }
}
 

getServices();