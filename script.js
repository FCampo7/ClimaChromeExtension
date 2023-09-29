
const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

async function fetchData(pos) {
	const crd = pos.coords;
	const API_KEY = 'YOUR API KEY FROM OPENWEATHERMAP';
	const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&lang=es&appid=${API_KEY}`;
	console.log(api_url);
	const res = await fetch(api_url);
	const record = await res.json();
	document.getElementsByClassName("loader-wrapper")[0].classList.remove("is-active");
	console.log(record);
	let iconurl = "http://openweathermap.org/img/w/" + record.weather[0].icon + ".png";
	document.getElementById("localidad").innerHTML = "Clima en "+record.name;
	document.getElementById("icon").setAttribute("src", iconurl);
	document.getElementById("description").innerHTML = record.weather[0].description;
	document.getElementById("temperatura").innerHTML = Math.floor(record.main.temp) + "°C";
	document.getElementById("sterm").innerHTML = Math.floor(record.main.feels_like) + "°C";
	document.getElementById("minima").innerHTML = Math.floor(record.main.temp_min) + "°C";
	document.getElementById("maxima").innerHTML = Math.floor(record.main.temp_max) + "°C";
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(fetchData, error, options);
