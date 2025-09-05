// Should Not Expose API Key. Should use env variables. But just beacause it is basic project and will depreciate the key using here
const apiKey = "fd94b728d480daf2fd2dc5ecb42c9660";

const cityInput = document.getElementById("cityInput");
const checkButton = document.getElementById("checkButton");
const cityNameElement = document.getElementById("cityName");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const maxTemperatureElement = document.getElementById("maxTemperature");

const getWeatherData = async (cityName)=>{
  try {
    if(!cityName || cityName.trim() === ""){
      alert("Please enter a city name!");
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      alert("City not found! Please try again.");
      return;
    }

    const data = await response.json();
    const { name, main } = data;
    const { temp, humidity, temp_max: tempMax } = main;

    cityNameElement.textContent = name;
    temperatureElement.textContent = temp;
    humidityElement.textContent = humidity;
    maxTemperatureElement.textContent = tempMax;
  } 
  catch(e){
    console.error("Error fetching weather data:", e);
  }
};

checkButton.addEventListener("click", () => {
  getWeatherData(cityInput.value);
});
