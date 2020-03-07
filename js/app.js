const APP_KEY = 'fd70466ba1e5df5c105fdb9879e197c7';
const searchBtn = document.querySelector('.search-button')
const searchItem = document.querySelector('.search-subitem')

searchBtn.addEventListener('click', async (e)=>{
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem.value}&appid=${APP_KEY}`
    const response = await fetch(requestUrl)
    const data = await response.json();
    const 
    for(city of data){
      console.log(city.name)
    }
    
})



