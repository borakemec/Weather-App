const inputBox = document.querySelector('.user-input');
const submitButton = document.querySelector('.submit-button');
const resultContainer = document.querySelector('.result-container');
const toggle = document.querySelector('.toggle');
let currentUnit = 'us';
let lastInput = '';

async function getDataFromApi(location) {
    try {
        lastInput = location;
        inputBox.value = '';
        submitButton.classList.remove('correct');
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${currentUnit}&elements=datetime%2Ctempmax%2Ctempmin%2Ctemp%2Cconditions&include=days&key=NH3HXPCQUFF769ELEW5BT9FL5&contentType=json`);
        const data = await response.json();
        populateContainer(data);
    }
    catch (e) {
        console.error("Error");
    }
}

function populateContainer(data) {
    resultContainer.innerHTML = '';

    const today = data['days'][0];
    const tomorrow = data['days'][1];
    const day2 = data['days'][2];
    const day3 = data['days'][3];

    const todayWeather = today['conditions'];

    const resultBox = document.createElement('div');
    resultBox.classList.add('result-box');

    if (todayWeather.includes('Rain')) {
        resultBox.classList.add('rain-bg');
    }
    else if(todayWeather.includes('Clear')) {
        resultBox.classList.add('clear-bg');
    }
    else if(todayWeather.includes('cloudy')) {
        resultBox.classList.add('partial-bg');
    }

    const locationTitle = document.createElement('p');
    locationTitle.classList.add('location-title');
    locationTitle.innerText = data['resolvedAddress'].split(",")[0];
    resultBox.appendChild(locationTitle);

    const todayDiv = document.createElement('div');
    todayDiv.classList.add('today-div');
    resultBox.appendChild(todayDiv);

    const temp = document.createElement('p');
    temp.classList.add('today-temp');
    temp.innerText = today['temp'] + '°';

    const maxContainer = document.createElement('div');
    maxContainer.classList.add('max-container');

    const maxTempText = document.createElement('p');
    maxTempText.classList.add('max-temp-text');
    maxTempText.innerText = 'Max';
    maxContainer.appendChild(maxTempText);

    const maxTemp = document.createElement('p');
    maxTemp.classList.add('today-max');
    maxTemp.innerText = today['tempmax'] + '°';
    maxContainer.appendChild(maxTemp);

    const minContainer = document.createElement('div');
    minContainer.classList.add('min-container');

    const minTempText = document.createElement('p');
    minTempText.classList.add('min-temp-text');
    minTempText.innerText = 'Min';
    minContainer.appendChild(minTempText);

    const minTemp = document.createElement('p');
    minTemp.classList.add('today-min');
    minTemp.innerText = today['tempmin'] + '°';
    minContainer.appendChild(minTemp);

    todayDiv.appendChild(minContainer);
    todayDiv.appendChild(temp);
    todayDiv.appendChild(maxContainer);

    const otherDaysContainer = document.createElement('div');
    otherDaysContainer.classList.add('other-days-container');

    const tomorrowContainer = document.createElement('div');
    tomorrowContainer.classList.add('tomorrow-container');

    const day2Container = document.createElement('div');
    day2Container.classList.add('day-two-container');

    const day3Container = document.createElement('div');
    day3Container.classList.add('day-three-container');

    const tomorrowText = document.createElement('p');
    tomorrowText.classList.add('tomorrow-text');
    tomorrowText.innerText = 'Tomorrow';
    tomorrowContainer.appendChild(tomorrowText);

    const tomorrowTemp = document.createElement('p');
    tomorrowTemp.classList.add('tomorrow-temp');
    tomorrowTemp.innerText = tomorrow['temp'] + '°';
    tomorrowContainer.appendChild(tomorrowTemp);

    const tomorrowCond = document.createElement('p');
    tomorrowCond.classList.add('tomorrow-condition');
    tomorrowCond.innerText = tomorrow['conditions'];
    tomorrowContainer.appendChild(tomorrowCond);

    const date2 = new Date(day2['datetime']);
    const dayOfWeek = date2.getDay();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const day2Name = days[dayOfWeek];
    const day3Name = days[dayOfWeek+1];

    const day2Text = document.createElement('p');
    day2Text.classList.add('day-two-text');
    day2Text.innerText = day2Name;
    day2Container.appendChild(day2Text);

    const day2Temp = document.createElement('p');
    day2Temp.classList.add('day-two-temp');
    day2Temp.innerText = day2['temp'] + '°';
    day2Container.appendChild(day2Temp);

    const day2Cond = document.createElement('p');
    day2Cond.classList.add('day-two-condition');
    day2Cond.innerText = day2['conditions'];
    day2Container.appendChild(day2Cond);

    const day3Text = document.createElement('p');
    day3Text.classList.add('day-three-text');
    day3Text.innerText = day3Name;
    day3Container.appendChild(day3Text);

    const day3Temp = document.createElement('p');
    day3Temp.classList.add('day-three-temp');
    day3Temp.innerText = day3['temp'] + '°';
    day3Container.appendChild(day3Temp);

    const day3Cond = document.createElement('p');
    day3Cond.classList.add('day-three-condition');
    day3Cond.innerText = day3['conditions'];
    day3Container.appendChild(day3Cond);

    otherDaysContainer.appendChild(tomorrowContainer);
    otherDaysContainer.appendChild(day2Container);
    otherDaysContainer.appendChild(day3Container);

    resultBox.appendChild(otherDaysContainer);
    resultContainer.appendChild(resultBox);
}

function checkInput() {
    if(inputBox.value.trim().length > 0) {
        submitButton.classList.add('correct');
    }
    else {
        submitButton.classList.remove('correct');
    }
}

toggle.addEventListener('change', () => { if (toggle.checked) {
        currentUnit = 'metric';
    } else {
        currentUnit = 'us';
    }
    getDataFromApi(lastInput);
    });

inputBox.addEventListener('input', () => checkInput());
submitButton.addEventListener('click', () => getDataFromApi(inputBox.value));
