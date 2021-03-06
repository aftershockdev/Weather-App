const store = {
  cities: []
};

const APP_KEY = "fd70466ba1e5df5c105fdb9879e197c7";
const searchBtn = document.querySelector(".search-button");
const searchItem = document.querySelector(".search-subitem");
const searchName = document.querySelector(".search-name");
const cardMap = document.querySelector(".search-cards");
const cardMapSecond = document.querySelector(".search-cards-second");
const addToFavoriteButtons = document.querySelectorAll('.card-favorite')

searchBtn.addEventListener("click", async e => {
  if (searchItem.value != "") {
    allLetter();
  }
});

searchItem.addEventListener("keydown", async e => {
  let bool = false;
  if (searchItem.value != "" && e.keyCode === 13) {
    allLetter(bool);
  }
});


//validation
function allLetter(bool) {
  var letters = /^[A-Za-zА-Яа-я]+$/;
  if (searchItem.value.match(letters)) {
    requestWeather();
    return (bool = true);
  } else {
    searchItem.style.border = "1px solid red";
    searchName.innerHTML = "input alphabetic only";
    setTimeout(() => {
      searchItem.style.border = "1.55px solid #C5CFD5";
      searchName.innerHTML = "City :";
      searchItem.value = "";
    }, 1000);
    return (bool = false);
  }
}

// request geolocation
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

//add geo card if successCallBack
async function geoSuccess(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  const navUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APP_KEY}&lang=ru`;
  const response = await fetch(navUrl);
  let data = await response.json();
  const cities = await [data];
  for (city of cities) {
  }
  cardCreator(city);
}

//add geo error card if errorCallBack
function geoError(city) {
  const cardErr = document.createElement("div");
  cardErr.classList.add("card-error");
  cardErr.insertAdjacentHTML(
    "afterbegin",
    `
   <div class="card-header">
    </div>

    <div class="card-main">
       <p>${city.message.toUpperCase()}</p>
       <p>Please add geolocation to see weather in your city</p>
    </div>

    <div class="card-footer">
      <button class='card-info'>Delete</button>
      <button class='card-info'>Add</button>
    </div>
   `
  );
  cardMap.appendChild(cardErr);
}

//Weather  Input Request
async function requestWeather() {
  try {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${APP_KEY}&lang=ru`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    cardCreator(data)
  } catch (e) {
    console.log(e.response);
    // searchItem.style.border = "1px solid red";
    // searchName.innerHTML = city.message;
    // setTimeout(() => {
    //   searchItem.style.border = "1.55px solid #C5CFD5";
    //   searchName.innerHTML = "City :";
    //   searchItem.value = "";
    // }, 1000);
  }
}

// time function for create date
function timeChanger(time){
  const date = new Date(time * 1000); // Epoch
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime
}


//Card creator
function cardCreator(city) {
  const weatherIcon = "http://openweathermap.org/img/wn/" + city.weather[0].icon + ".png";
  const KELVIN = 273;
  const temp = Math.floor(city.main.temp - KELVIN);
  const dTime = timeChanger(city.dt)
  const dSunset = timeChanger(city.sys.sunset)
  const dSunRise = timeChanger(city.sys.sunrise)
  const appCard = document.createElement("div");
  const modalTitle = document.querySelector('.modal-title');
  const modalWind = document.querySelector('.modal-wind');
  const modalDeg = document.querySelector('.modal-deg');
  const modalSunSet = document.querySelector('.modal-sunset');
  const modalSunRise = document.querySelector('.modal-sunrise');

  modalTitle.innerHTML = city.name
  modalWind.innerHTML = city.wind.speed
  modalDeg.innerHTML = city.wind.deg
  modalSunSet.innerHTML = dSunset
  modalSunRise.innerHTML = dSunRise
  
  appCard.classList.add("app-card");
  appCard.dataset.city = city.id
  appCard.insertAdjacentHTML(
    'afterbegin',
    `
     <div class="card-header">
       <img src='${weatherIcon}'>   
     </div>

     <div class="card-main">
      <span><i class="fas fa-city"></i> ${city.name}</span>
      <span>Погода: ${city.weather[0].description} </span>
      <span>Температура: ${temp + "&deg;C"} </span>
      <span>Время: ${dTime} </span>
     </div>

     <div class="card-footer">
     <button class="card-info" data-toggle="modal" data-target="#exampleModal">
      More
     </button>
      <button class='card-favorite'>Add</button>
     </div>
    `
  );

  const modalAddToFavorite = appCard.querySelector('.card-favorite')
  modalAddToFavorite.addEventListener('click', e => {
    store.cities.push(data)
    commitStoreToLocalStorage()
  })

  if(window.matchMedia("(max-width: 700px)").matches){
    appCard.style.width = 33 + '%';
  }

  if(cardMap.childElementCount < 4) {
    cardMap.appendChild(appCard);
  } else {
    cardMapSecond.style.height = 'auto'
    cardMapSecond.appendChild(appCard)
  }
}

