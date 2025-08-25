document.addEventListener('DOMContentLoaded', () => {
    // State variables
    let unit = 'metric';
    let weatherData = null;

    // DOM elements
    const cityInput = document.getElementById('city-input');
    const searchForm = document.getElementById('search-form');
    const locationButton = document.getElementById('location-button');
    const unitToggleButton = document.getElementById('unit-toggle-button');
    const contentDisplay = document.getElementById('content-display');

    // API key
    const apiKey = '6d59d7d4732c2644aeca7e93236826ed';

    // Helper function to get a weather icon based on the OpenWeatherMap icon code.
    const getWeatherIcon = (iconCode) => {
        const icons = {
            '01d': '☀️', '01n': '🌙', // clear sky
            '02d': '🌤️', '02n': '🌥️', // few clouds
            '03d': '☁️', '03n': '☁️', // scattered clouds
            '04d': '☁️', '04n': '☁️', // broken clouds
            '09d': '🌧️', '09n': '🌧️', // shower rain
            '10d': '🌦️', '10n': '🌧️', // rain
            '11d': '⛈️', '11n': '⛈️', // thunderstorm
            '13d': '❄️', '13n': '❄️', // snow
            '50d': '🌫️', '50n': '🌫️' // mist
        };
        return icons[iconCode] || '🌡️';
    };

    // Helper function to format the day of the week.
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    // Helper function to format time (e.g., "15:00" -> "3 PM")
    const formatTime = (timeString) => {
        const time = timeString.split(' ')[1].substring(0, 5); // Get the time part
        const [hour, minute] = time.split(':');
        const d = new Date();
        d.setHours(hour, minute);
        return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    
    // Helper function for temperature unit symbol.
    const getUnitSymbol = () => {
        return unit === 'metric' ? '°C' : '°F';
    };
    
    // Render loading state
    const renderLoading = () => {
        contentDisplay.innerHTML = `
            <div class="text-lg text-gray-700 animate-pulse">Loading weather data...</div>
        `;
    };

    // Render error state
    const renderError = (message) => {
        contentDisplay.innerHTML = `
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Error:</strong>
                <span class="block sm:inline ml-2">${message}</span>
            </div>
        `;
    };

    // Render weather data
    const renderWeatherData = (data) => {
        const dailyForecastHtml = data.forecast.daily.map(day => `
            <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow text-center">
                <p class="text-sm font-semibold">${getDayOfWeek(day.date)}</p>
                <span class="text-3xl">${getWeatherIcon(day.condition)}</span>
                <p class="text-lg font-bold mt-1">${Math.round(day.temp_max)}${getUnitSymbol()}</p>
                <p class="text-sm text-gray-500">${Math.round(day.temp_min)}${getUnitSymbol()}</p>
            </div>
        `).join('');
        
        const hourlyForecastHtml = data.forecast.hourly.map(hour => `
            <div class="flex-shrink-0 w-24 p-4 rounded-xl bg-white bg-opacity-70 shadow text-center">
                <p class="text-sm font-semibold">${formatTime(hour.dt_txt)}</p>
                <span class="text-2xl">${getWeatherIcon(hour.weather[0].icon)}</span>
                <p class="text-lg font-bold mt-1">${Math.round(hour.main.temp)}${getUnitSymbol()}</p>
            </div>
        `).join('');

        contentDisplay.innerHTML = `
            <div class="bg-blue-50 bg-opacity-60 p-6 rounded-2xl shadow-inner animate-fade-in-down">
                <!-- Current Weather -->
                <h2 class="text-3xl font-bold text-gray-900 mb-2">
                    ${data.location.name}
                </h2>
                <div class="flex items-center justify-center space-x-4 mb-4">
                    <span class="text-6xl">${getWeatherIcon(data.current.condition.iconCode)}</span>
                    <span class="text-7xl font-light text-gray-800">
                        ${Math.round(data.current.temp)}${getUnitSymbol()}
                    </span>
                </div>
                <p class="text-xl capitalize text-gray-600 mb-4">
                    ${data.current.condition.text}
                </p>

                <!-- Detailed Weather Info -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                    <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow">
                        <p class="text-sm font-semibold">Feels Like</p>
                        <p class="text-lg font-bold">${Math.round(data.current.feels_like)}${getUnitSymbol()}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow">
                        <p class="text-sm font-semibold">Humidity</p>
                        <p class="text-lg font-bold">${data.current.humidity}%</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow">
                        <p class="text-sm font-semibold">Wind Speed</p>
                        <p class="text-lg font-bold">
                            ${unit === 'metric' ? `${Math.round(data.current.wind_speed * 3.6)} km/h` : `${Math.round(data.current.wind_speed)} mph`}
                        </p>
                    </div>
                    <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow">
                        <p class="text-sm font-semibold">Pressure</p>
                        <p class="text-lg font-bold">${data.current.pressure} hPa</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white bg-opacity-70 shadow col-span-2 sm:col-span-1">
                        <p class="text-sm font-semibold">Visibility</p>
                        <p class="text-lg font-bold">${(data.current.visibility / 1000).toFixed(1)} km</p>
                    </div>
                </div>

                <!-- 5-Day Forecast -->
                <div class="mt-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        ${dailyForecastHtml}
                    </div>
                </div>

                <!-- Hourly Forecast -->
                <div class="mt-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
                    <div class="flex overflow-x-auto gap-4 py-2 scrollbar-hide">
                        ${hourlyForecastHtml}
                    </div>
                </div>
            </div>
        `;
    };

    // This function fetches weather data from OpenWeatherMap.
    const fetchWeather = async (params) => {
        renderLoading();

        let apiUrl;
        const units = unit;

        if (params.city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&appid=${apiKey}&units=${units}`;
        } else if (params.lat && params.lon) {
            apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&appid=${apiKey}&units=${units}`;
        } else {
            renderError('Please provide a city name or enable location services.');
            return;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                // Group the 3-hour forecasts into daily forecasts
                const dailyForecasts = {};
                data.list.forEach(forecast => {
                    const date = forecast.dt_txt.split(' ')[0]; // YYYY-MM-DD
                    if (!dailyForecasts[date]) {
                        dailyForecasts[date] = {
                            temp_max: -Infinity,
                            temp_min: Infinity,
                            condition: forecast.weather[0].main,
                            date: date
                        };
                    }
                    dailyForecasts[date].temp_max = Math.max(dailyForecasts[date].temp_max, forecast.main.temp_max);
                    dailyForecasts[date].temp_min = Math.min(dailyForecasts[date].temp_min, forecast.main.temp_min);
                });

                // Get hourly data for the first day
                const today = new Date().toISOString().split('T')[0];
                const hourlyData = data.list.filter(forecast => forecast.dt_txt.startsWith(today)).slice(0, 8); // Next 24 hours

                // Structure the data to match our rendering logic
                const structuredData = {
                    location: {
                        name: data.city.name
                    },
                    current: {
                        temp: data.list[0].main.temp,
                        feels_like: data.list[0].main.feels_like,
                        humidity: data.list[0].main.humidity,
                        pressure: data.list[0].main.pressure,
                        wind_speed: data.list[0].wind.speed,
                        visibility: data.list[0].visibility,
                        condition: {
                            text: data.list[0].weather[0].description,
                            iconCode: data.list[0].weather[0].icon
                        }
                    },
                    forecast: {
                        daily: Object.values(dailyForecasts).slice(0, 5), // Next 5 days
                        hourly: hourlyData
                    }
                };
                
                weatherData = structuredData; // Store the data
                renderWeatherData(structuredData);

            } else {
                throw new Error(data.message || 'City not found or API error.');
            }
        } catch (err) {
            renderError(err.message);
        }
    };

    // Event listener for form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather({ city: city });
        }
    });

    // Event listener for location button
    locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (err) => {
                    console.error(err);
                    renderError('Geolocation failed. Please allow location access.');
                }
            );
        } else {
            renderError('Geolocation is not supported by this browser.');
        }
    });

    // Event listener for unit toggle button
    unitToggleButton.addEventListener('click', () => {
        unit = unit === 'metric' ? 'imperial' : 'metric';
        unitToggleButton.textContent = unit === 'metric' ? 'Switch to °F' : 'Switch to °C';
        if (weatherData) {
            fetchWeather({ city: weatherData.location.name });
        }
    });
});
