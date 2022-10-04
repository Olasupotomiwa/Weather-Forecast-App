function Preloader() {
    myVar = setTimeout(showPage, 3000);
  }
  
  function showPage() {
    document.querySelector(".Preloader").style.display = "none";
    document.getElementById("WholeContent").style.display = "block";
  }




const app = document.querySelector('.weather-app')
const temp = document.querySelector('.temp')
const dateoutput = document.querySelector('.date')
const timeoutput = document.querySelector('.time')
const conditionoutput = document.querySelector('.condition')
const conditionoutput2 = document.querySelector('.condition2')
const nameOutput = document.querySelector('.name')
const countryOutput = document.querySelector('.country')
const icon = document.querySelector('.icon')
const icon2 = document.querySelector('.icon2')


const cloud = document.querySelector('.cloud')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const nextTemp = document.querySelector('.nextTemp')
const form = document.querySelector('#locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')
const chance = document.querySelector('.chance')
const NxtCondition = document.querySelector('.NxtCondition')
const loader = document.querySelector('.loader')
const color = document.querySelector('.color')


//Default city onload
 let cityInput = "Abuja"

 //Loop through the cities to append a click event to target the innerHTML
cities.forEach( (city) =>{
    city.addEventListener('click', (e) =>{
cityInput = e.target.textContent;

fetchWeatherData();

//Remove the page content
app.style.display = 'none'

//Display a loader while data is being fetched
loader.style.display = 'block'
    })

}) 


//Grabing the input box content and append a submit event
form.addEventListener('submit', (e) => {
    if(search.value == "" ) {
        alert('Enter a valid location')
    }
    else{

        //Set the city input to the input content and fetch
        cityInput = search.value
        fetchWeatherData()

        //Clear input value
        search.value = "";
        app.style.display = 'none'
        loader.style.display = 'block'
    }

    e.preventDefault();
   
})




//Function to fetch data
function fetchWeatherData(){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=29309e18e1ca46dbb3b111747220410&q=${cityInput}&days=2`)
    .then(response =>{
       
        return response.json();
    })
    

    .then(data =>{
      

        temp.innerHTML = Math.floor(data.current.temp_c) + "&#176" + "C"
        conditionoutput.innerHTML = data.current.condition.text;
        conditionoutput2.innerHTML = data.current.condition.text;
        const date = data.location.localtime;

        //slice the date to get separate entity
        const year = parseInt(date.substr(0, 4));
        const month = parseInt(date.substr(5, 2));
        let day = parseInt(date.substr(8));
      
        var CallDate = new Date();
        CallDate.setFullYear(year, month - 1, day)
        let final = CallDate.toString().slice(0, 16);
       
       
        
        const time = date.substr(11);

        dateoutput.innerHTML = final;
        timeoutput.innerHTML =  "Local time " + time
        countryOutput.innerHTML = data.location.country
        nameOutput.innerHTML = data.location.name + ","
        icon.src =  data.current.condition.icon;
        cloud.innerHTML = data.current.cloud + "%";
        humidity.innerHTML = data.current.humidity + "%";
        wind.innerHTML = data.current.wind_kph + "km/h";
        nextTemp.innerHTML = data.forecast.forecastday[1].day.avgtemp_c + "&#176" + "C"
        icon2.src = data.forecast.forecastday[1].day.condition.icon;
        chance.innerHTML = data.forecast.forecastday[1].day.daily_chance_of_rain + "%";
        NxtCondition.innerHTML = data.forecast.forecastday[1].day.condition.text;
      
      
  
        let timeofday ="day"
        if(!data.current.is_day == 1){
            timeofday = "night";
            btn.style.background = "rgba(0, 0, 0, 0.5)"
            btn.style.color = 'black'   
        }
        const code = data.current.condition.code;

        if(code == 1000 && data.current.is_day == 1){
            btn.style.background = "#00294d"
            btn.style.color = 'rgba(0, 0, 0, 0.5)'
            app.style.color = '#00294d'
           
           
            
        }
    
    
        if(code == 1000){
            app.style.backgroundImage = `url(${timeofday}/clear.jpg)`
           
           
        }

      


        else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282 
        ) {
            app.style.backgroundImage = `url(${timeofday}/cloudy.jpg)`
            app.style.color = 'white'
            btn.style.background = "#fa6d1b"
           
           
        }

        else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 || 
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252
           
        ) {
            app.style.backgroundImage = `url(${timeofday}/rainy.jpg)`
            app.style.color = 'white'
            btn.style.background = "rgba(0, 0, 0, 0.5)"
            btn.style.color = 'black'
           
        }

        else{
            app.style.backgroundImage = `url(${timeofday}/snowy.jpg)`
            btn.style.background = "#4d72aa"
        }

     
       
        loader.style.display = 'none'
        app.style.display = 'block'
       
    })
    .catch(() =>{
        alert('City not found \nEnsure you have a stable internet connection');
        loader.style.display = 'none'
        app.style.display = 'block'
    })
   
}
fetchWeatherData()


/*
user.addEventListener('click', userL)
 function userL(){ 
    if (navigator.geolocation) 
    {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function showPosition(position) {
   latitude = position.coords.latitude;
   longitude = position.coords.longitude;
   console.log(latitude)
   fetch(`https://api.opencagedata.com/geocode/v1/json?key=df544ec4a53c47b69797fa7e39ffd92a&q=${latitude}+${longitude}`)
   .then(response => response.json())
   .then(data2 =>{

    console.log(data2)
   })
}
 }
 */
 



