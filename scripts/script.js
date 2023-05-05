const cityForm = document.querySelector("form");

const getCityWeatherInfo = async city => {
  const foundCity = await getCity(city);
  const weather = await getWeather(foundCity.Key);
  return { weather, city: foundCity };
};

cityForm.addEventListener("submit", async e => {
  e.preventDefault();
  const city = cityForm.location.value.trim();
  if (city === "") {
    return;
  }
  cityForm.reset();

  const weatherInfo = await getCityWeatherInfo(city);
  updateUI(weatherInfo);
});

const updateUI = weatherInfo => {
  const { weather, city } = weatherInfo;

  document.querySelector(".card").innerHTML = `
  <div class="container shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] p-3 w-96 mt-10 relative h-[600px] bg-gradient-to-b ${
    weather.IsDayTime
      ? "from-blue-600 via-blue-400 to-blue-200"
      : "from-black via-gray-800 to-gray-400"
  } text-white text-center">
    <img src="imgs/skyline.png" class="absolute bottom-0 right-0" />
    <h3 class="text-white text-2xl mt-8 font-serif">${city.EnglishName}</h3>
    <div class="flex flex-col mt-4 items-center justify-center">
        <h4>${weather.WeatherText}</h4>
        <img  src="${
          "../imgs/icons/" + weather.WeatherIcon + ".svg"
        }" alt="condition icon" />
    </div>
    <h2 class="text-white text-8xl mt-16 relative">
    ${Math.round(weather.Temperature.Metric.Value)}
    <span class="text-4xl absolute top-2">&deg;</span>
    </h2>
  </div>`;
};
