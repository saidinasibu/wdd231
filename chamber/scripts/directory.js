//Toggle Menu
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function () {
        menu.classList.toggle('open'); // Alterna a classe 'open'
        menuToggle.textContent = menu.classList.contains('open') ? '✖' : '☰'; // Altera o ícone
    });
});


//Companies Cards
async function fetchCompanies() {
    try {
        const gridContainer = document.querySelector('.grid');
        
        if (gridContainer != null) {
            const response = await fetch('data/members.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            gridContainer.innerHTML = '';

            data.forEach(company => {
                const card = createCompanyCard(company);
                gridContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar os dados das empresas:", error);
    }
}

function createCompanyCard(company) {
    const card = document.createElement('section');
    card.classList.add('company-card');

    const icon = document.createElement('img');
    icon.src = `images/companies_logos/${company.icon}`;
    icon.alt = company.name;
    card.appendChild(icon);

    const address = document.createElement('p');
    address.textContent = `${company.address}`;
    card.appendChild(address);

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${company.phone}`;
    card.appendChild(phone);

    const website = document.createElement('a');
    website.href = company.website;
    website.target = '_blank';
    website.textContent = company.website;
    card.appendChild(website);

    return card;
}

document.addEventListener('DOMContentLoaded', fetchCompanies);


//Filter function
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

if (gridbutton) {
        gridbutton.addEventListener("click", () => {
	    display.classList.add("grid");
    	display.classList.remove("list");
    });
}

if (listbutton) {
    listbutton.addEventListener("click", showList);   
}


function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

//API Weather
const apiKey = "5ca622b2540cfdbfae0a3d45bc3af423";
const city = "Belém, BR";
const units = "metric"; // (°C)
const lang = "en";      // Language
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${units}&lang=${lang}&appid=${apiKey}`;

async function fetchWeatherData() {
    try {
        // Get Current Weather
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        // Save data
        const maxTemp = Math.round(currentWeatherData.main.temp_max);
        const minTemp = Math.round(currentWeatherData.main.temp_min);
        const humidity = currentWeatherData.main.humidity;
        const sunrise = new Date(currentWeatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Windhoek'
        });

        const sunset = new Date(currentWeatherData.sys.sunset * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Windhoek'
        });
        
        const weatherIcon = currentWeatherData.weather[0].icon;
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

        const weatherIconElement = document.getElementById('weatherIcon');
        if (weatherIconElement) {
            weatherIconElement.src = weatherIconUrl;
        }

        const gridCurrent = document.querySelector('.currentParagraphs');
        if (gridCurrent) {
            const currentTemperature = document.createElement('p');
            currentTemperature.textContent = `${Math.round(currentWeatherData.main.temp)} °C`;
            const currentWeatherDescription = document.createElement('p');
            currentWeatherDescription.textContent = currentWeatherData.weather[0].description;

            const tempMax = document.createElement('p');
            tempMax.textContent = `High: ${maxTemp} °C`;
            const tempMin = document.createElement('p');
            tempMin.textContent = `Low: ${minTemp} °C`;

            const hum = document.createElement('p');
            hum.textContent = `Humidity: ${humidity}%`;
            const rise = document.createElement('p');
            rise.textContent = `Sunrise: ${sunrise}`;
            const set = document.createElement('p');
            set.textContent = `Sunset: ${sunset}`;

            gridCurrent.appendChild(currentTemperature);
            gridCurrent.appendChild(currentWeatherDescription);
            gridCurrent.appendChild(tempMax);
            gridCurrent.appendChild(tempMin);
            gridCurrent.appendChild(hum);
            gridCurrent.appendChild(rise);
            gridCurrent.appendChild(set);
        }

        const forecastParagraphs = document.querySelector('.forecastParagraphs');
        if (forecastParagraphs) {
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 3);

            dailyForecasts.forEach((forecast, index) => {
                const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                const temp = Math.round(forecast.main.temp);

                const setForecast = document.createElement('p');
                setForecast.textContent = `${date}: ${temp}°C`;

                forecastParagraphs.appendChild(setForecast);
            });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Call the funtion
fetchWeatherData();

//Spotlights
async function fetchAndDisplayClients() {
    try {
        const gridContainer = document.querySelector('.spotlights');
        
        if (gridContainer != null) {
            const response = await fetch('data/members.json');

            if (!response.ok) {
                throw new Error('Falha ao carregar os dados');
            }

            gridContainer.innerHTML = '';
            const members = await response.json();
            const eligibleMember = members.filter(member => parseInt(member.membership) >= 2);

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            shuffleArray(eligibleMember);

            const randomMember = eligibleMember.slice(0, 3);

            randomMember.forEach(member => {
                const card = createCompanySportlight(member);
                gridContainer.appendChild(card);
            });
        }
        
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

function createCompanySportlight(company) {
    const card = document.createElement('section');
    card.classList.add('sportlight-card');

    const name = document.createElement('p');
    name.textContent = `${company.name}`;
    name.classList.add('sportlight-name');
    card.appendChild(name);

    const tagline = document.createElement('p');
    tagline.textContent = `${company.tagline}`;
    tagline.classList.add('sportlight-tagline');
    card.appendChild(tagline);

    const hr = document.createElement('hr')
    card.appendChild(hr)

    const icon = document.createElement('img');
    icon.src = `images/companies_logos/${company.icon}`;
    icon.alt = company.name;
    card.appendChild(icon);

    const email = document.createElement('p');
    email.textContent = `Email: ${company.email}`;
    email.classList.add('sportlight-email');
    card.appendChild(email);
    

    const phone = document.createElement('p');
    phone.textContent = `Phone: ${company.phone}`;
    phone.classList.add('sportlight-phone');
    card.appendChild(phone);

    const website = document.createElement('a');
    website.href = company.website;
    website.target = '_blank';
    website.textContent = "Learn More";
    website.classList.add('sportlight-website');
    card.appendChild(website);

    return card;
}

// Call the function
fetchAndDisplayClients();


//Modal card
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("membership-modal");
  const card = document.getElementById("card");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const closeModal = document.getElementById("close-modal");
  const infoButtons = document.querySelectorAll(".info-btn");

  if (
    !modal ||
    !card ||
    !modalTitle ||
    !modalText ||
    !closeModal ||
    infoButtons.length === 0
  ) {
    return;
  }

  let membershipData = [];

  // Fetch membership data from JSON
  fetch("data/membership.json")
    .then((response) => response.json())
    .then((data) => {
      membershipData = data;
    })
    .catch((error) => console.error("Error loading membership data:", error));

  // Open modal with membership information
  infoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const level = button.getAttribute("data-level");
      const membership = membershipData.find((item) => item.level === level);

      if (membership) {
        card.style.backgroundColor = membership.color;
        card.textContent = membership.title;
        modalTitle.textContent = membership.title;
        modalText.textContent = membership.text;

        // Check screen size and set modal background color
        if (window.innerWidth <= 800) {
          modal.style.backgroundColor = membership.color;
        } else {
          modal.style.backgroundColor = ""; // Reset if screen is larger
        }

        modal.showModal();
      }
    });
  });

  // Close modal
  closeModal?.addEventListener("click", () => {
    modal.close();
  });

  // Adjust modal background on resize
  window.addEventListener("resize", () => {
    if (modal.open && window.innerWidth <= 950 && card.style.backgroundColor) {
      modal.style.backgroundColor = card.style.backgroundColor;
    } else {
      modal.style.backgroundColor = "";
    }
  });
});


// Thanks after the form submit
document.getElementById('form')?.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get the form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const applicantTitle = document.getElementById('applicantTitle').value || 'Not informed';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const business = document.getElementById('business').value;
    const membershipLevel = document.querySelector('input[name="membership-level"]:checked') ? document.querySelector('input[name="membership-level"]:checked').value : 'N/A'; 
    const description = document.getElementById('description').value;
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'MST' }).replace(',', '').replace('/', '-').replace('/', '-');


    // Creating the form Data
    const formData = `
        Name: ${firstName} ${lastName}<br>
        Organizational Title: ${applicantTitle}<br>
        Email: ${email}<br>
        Phone: ${phone}<br>
        Organization: ${business}<br>
        Membership Level: ${membershipLevel}<br>
        Description: ${description}<br>
        Timestamp: ${timestamp}
    `;

    // Check all the form fields
    if (this.checkValidity()) {
        //localStorage
        localStorage.setItem('formData', formData);
        window.location.href = 'thankyou.html';
    } else {
        alert('Please, fill in all the required fields.');
    }
});


// Show kiosk images
const lazyImages = document.querySelector(".lazyImages");

if (lazyImages) { // Verifica se o elemento existe
    for (let i = 1; i < 9; i++) {
        const img = document.createElement("img");
        img.src = `images/kiosks/kiosk-${i}.jpg`;
        img.alt = `Kiosk nº${i} image`;
        img.loading = "lazy";

        lazyImages.appendChild(img);
    }
} else {
    console.warn("Elemente '.lazyImages' not founded. Images not added.");
}

// Welcome dialog modal
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('welcomeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (modal && closeModalBtn && welcomeMessage) {
        // Function to calculate the days difference
        function calculateDaysDifference(lastVisit) {
            const now = new Date();
            const lastVisitDate = new Date(lastVisit);
            const differenceInTime = now - lastVisitDate;
            return Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
        }

        // Manage messages
        const lastVisit = localStorage.getItem('lastVisit');
        const now = new Date();

        if (!lastVisit) {
            welcomeMessage.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysSinceLastVisit = calculateDaysDifference(lastVisit);

            if (daysSinceLastVisit < 1) {
                welcomeMessage.textContent = "Back so soon! Awesome!";
            } else if (daysSinceLastVisit === 1) {
                welcomeMessage.textContent = `You last visited 1 day ago.`;
            } else {
                welcomeMessage.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
            }
        }

        // Update the last visit
        localStorage.setItem('lastVisit', now.toISOString());

        // Show modal
        modal.showModal();

        // Close modal
        closeModalBtn.addEventListener('click', function () {
            modal.close();
        });
    } else {
        console.warn("Elementes from welcome modal not was founded at DOM.");
    }
});


// Footer current year and moddification
document.addEventListener('DOMContentLoaded', function() {
    let currentYear = new Date().getFullYear();
    let lastModification = document.lastModified;
    
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = 'Last modification: ' + lastModification;
});

// directory.js - Add to DOMContentLoaded
const currentPage = location.pathname.split('/').pop();
document.querySelectorAll('.sidebar a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        const menu = document.getElementById('menu');
        if (menu) {
            menu.classList.remove('open');
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle) menuToggle.textContent = '☰';
        }
    }
});