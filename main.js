"use strict";
let rowData = document.querySelector('#rowData');
let search = document.querySelector('#search');

search.addEventListener('keyup' , function(){
    console.log(search.value);
    apiRequest()
})

function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        userLocation(position.coords.latitude , position.coords.longitude )
    }   

getLocation()


function userLocation(lat , lon){
    let xhr = new XMLHttpRequest();

    xhr.open( 'GET' , `https://us1.locationiq.com/v1/reverse?key=pk.f0e8fac03f4fd77d603ab66b684fca71&lat=${lat}&lon=${lon}&format=json&`);

    xhr.send();

    xhr.addEventListener('readystatechange' , function (){
        if (xhr.readyState ==  4 && xhr.status == 200){
            let res  = JSON.parse(xhr.response)
            apiRequest(res.address.city)
            console.log(res);
        }
    } )
}

function apiRequest(city){
    let xhr = new XMLHttpRequest();
    if (search.value!=""){
        city = search.value
    }

    xhr.open( 'GET' , `https://api.weatherapi.com/v1/forecast.json?key=91f3f74c1cac415381e222314241504&q=${city}&days=3`);

    xhr.send();

    xhr.addEventListener('readystatechange' , function (){
        if (xhr.readyState ==  4 && xhr.status == 200){
            let res  = JSON.parse(xhr.response)
            displayData(res)
            console.log(res);
        }
    } )
}



function displayData(data){
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(data.forecast.forecastday[0].date);
    let monthName = month[d.getMonth()];
    let day = weekday[d.getDay()];
    let divs = ``;
    for ( let i = 0 ; i < 1 ; i++){
        divs += ` <div class="col-md-4 px-0">
        <div class="card border-0 rounded-start-3">
            <div class="cardHeader mb-3 d-flex justify-content-between py-2 px-4">
                <p class="m-0">${day}</p>
                <p class="m-0">${d.getDate() + monthName }</p>
            </div>
            <div class="cardBody py-2 px-4">
                <p class="h5">${data.location.name}</p>
                <div class="d-flex justify-content-center align-items-center">
                    <p class="display-1 fw-semibold text-white">${data.current.temp_c}°C</p>
                    <img src="${data.current.condition.icon}" class="ms-5 w-25" alt="moon">
                </div>
                <p class="clear mb-3">${data.current.condition.text}</p>
            </div>
            <div class="cardFooter mb-3 d-flex justify-content-around align-items-center py-2 px-4">
                <div class="d-flex justify-content-between align-items-center me-5">
                    <img src="images/icon-umberella.png" class="me-2" alt="umberella">
                    <p class="m-0">20%</p>
                </div>
                <div class="d-flex justify-content-between align-items-center me-5">
                    <img src="images/icon-wind.png" class="me-2" alt="wind">
                    <p class="m-0">18km/h</p>
                </div>
                <div class="d-flex justify-content-between align-items-center me-5">
                    <img src="images/icon-compass.png" class="me-2" alt="cicon-compass">
                    <p class="m-0">East</p>
                </div>
            </div>
        </div>
    </div> 
    <div class="col-md-4 px-0">
    <div class="card h-100 card-middle border-0">
        <div class="cardHeader py-2  px-4">
            <p class="m-0 text-center">${weekday[d.getDay()+1]}</p>
        </div>
        <div class="cardBody py-3 px-4 text-center">
            <img src="${data.forecast.forecastday[1].day.condition.icon}" class="w-15 mt-3 mb-4" alt="moon">
            <p class="h2 fw-semibold text-white mb-0">${data.forecast.forecastday[1].day.maxtemp_c}°C</p>
            <p class="fs-5 fw-light mb-4  text-white">${data.forecast.forecastday[1].day.mintemp_c}°</p>
            <p class="clear mb-3">${data.forecast.forecastday[1].day.condition.text}</p>
        </div>
    </div>
</div>
<div class="col-md-4 px-0">
    <div class="card  h-100 border-0 rounded-end-3">
        <div class="cardHeader mb- py-2 px-4">
            <p class="m-0 text-center">${weekday[d.getDay()+2]}</p>
        </div>
        <div class="cardBody py-3 px-4 text-center">
            <img src="${data.forecast.forecastday[2].day.condition.icon}" class="w-15 mt-3 mb-4" alt="moon">
            <p class="h2 fw-semibold text-white mb-0">${data.forecast.forecastday[2].day.maxtemp_c}°C</p>
            <p class="fs-5 fw-light mb-4  text-white">${data.forecast.forecastday[2].day.mintemp_c}°</p>
            <p class="clear mb-3">${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
    </div>
</div>`
    }

    rowData.innerHTML = divs;

}