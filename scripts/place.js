// Display current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Weather information and windchill calculation
const tempC = 15; // Static temperature in Celsius
const windSpeed = 12; // Static wind speed in km/h

function calculateWindChill(temp, wind) {
    // Formula for wind chill in Celsius: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

// Display wind chill if conditions are met
const windChillElement = document.getElementById('windchill');
if (tempC <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(tempC, windSpeed);
    windChillElement.textContent = `${windChill}°C`;
} else {
    windChillElement.textContent = "N/A";
}