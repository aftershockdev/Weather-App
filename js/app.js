const APP_KEY = 'fd70466ba1e5df5c105fdb9879e197c7';
const searchBtn = document.querySelector('.search-button')
const searchItem = document.querySelector('.search-subitem')
const searchName = document.querySelector('.search-name')

searchBtn.addEventListener('click', async (e)=>{
  if(searchItem.value != ''){
    requestWeather();
  }
})

searchItem.addEventListener('keydown', async (e)=>{
  if(searchItem.value && e.keyCode === 13){
    requestWeather();
  }
})

//geolocation
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}


//geo add card if true
async function geoSuccess(position) {
  let latitude  = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude)
  console.log(longitude)
  const navUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_KEY}&lang=ru`
  const response = await fetch(navUrl)
    let data = await response.json();
    const cities = await [data];
     for(city of cities){
      }
     cardCreator(city)
}

function geoError(){
   
}


//Weather  Input Request
async function requestWeather(city){
  try{
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${APP_KEY}&lang=ru`
    const response = await fetch(requestUrl)
    let data = await response.json();
    const cities = await [data];
     for(city of cities){
       console.log(city)
      }
     cardCreator(city)
     searchItem.value = '';
  
  }catch(e){
    await city.message
    searchItem.style.border = '1px solid red';
    searchName.innerHTML = city.message
    setTimeout(() => {
    searchItem.style.border = '1.55px solid #C5CFD5';
    searchName.innerHTML = 'City :'
    searchItem.value = ''
    }, 1500);
  }
}


//Card creator
function cardCreator(city){

  const date = new Date(city.dt * 1000); // Epoch
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  const cardMap = document.querySelector('.search-cards');
  const appCard = document.createElement('div');
  const KELVIN = 273;
  const temp = Math.floor(city.main.temp - KELVIN) 


  appCard.classList.add('app-card');
  appCard.insertAdjacentHTML('afterbegin',`

     <div class="card-header">
      <i class="fas fa-globe-europe"></i>        
     </div>

     <div class="card-main">
      <span><i class="fas fa-city"></i> ${city.name}</span>
      <span>Погода: ${city.weather[0].description} </span>
      <span>Температура: ${temp + '&deg;C'} </span>
      <span>Время ${formattedTime}</span>
     </div>

     <div class="card-footer">
      <button class='card-remove'>Delete</button>
      <button class='card-fauvorite'>Add</button>
     </div>
     
  `) 
  cardMap.appendChild(appCard);
  return appCard
}


