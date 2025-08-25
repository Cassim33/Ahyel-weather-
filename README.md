# Ahyel-weather-
A sample weather forecast app to showcase my beginner experience,using openweather API KEY.
Ahyel Weather App
A simple, responsive weather application built with HTML, CSS, and JavaScript. This app allows users to get real-time weather information for any city or their current location.

Features
Current Weather: Displays the current temperature, a weather icon, and a description.

Detailed Information: Shows "feels like" temperature, humidity, wind speed, pressure, and visibility.

5-Day Forecast: Provides a quick overview of the weather for the upcoming days.

Hourly Forecast: Shows the weather forecast for the next 24 hours (in 3-hour intervals).

Location-Based Search: Automatically detects and displays the weather for the user's current location with their permission.

Unit Toggle: Users can switch between Celsius (°C) and Fahrenheit (°F) units.

Responsive Design: Optimized to work on all devices, from mobile phones to desktops.

Technologies Used
HTML5: For the basic structure and content of the web page.

CSS3: For styling, including custom animations and layout.

Tailwind CSS: A utility-first CSS framework used for rapid, responsive styling.

JavaScript (ES6+): For all the application's logic, including fetching data from the API and dynamically updating the content.

OpenWeatherMap API: The data source for all weather information.

File Structure
This repository is organized into three main files:

index.html: The main HTML file that contains the app's structure and links to the stylesheet and script.

style.css: The custom CSS file for specific styling and animations not covered by Tailwind.

script.js: The JavaScript file that handles all the functionality, including API calls, data processing, and dynamic content rendering.

How to Run Locally
To get a local copy of this project up and running, follow these steps:

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Get an API Key:

Go to the OpenWeatherMap website and create an account.

Navigate to the "API keys" section to find or generate a new key.

Update the API Key:

Open script.js in a text editor.

Replace the placeholder apiKey variable with your actual API key:

const apiKey = 'YOUR_API_KEY_HERE';

Open in Browser:

Simply open the index.html file in your favorite web browser.

Note: Ensure your browser allows geolocation access if you want to use the "Get Weather for My Location" feature.

Acknowledgments
This project uses the free tier of the OpenWeatherMap API.
