function populateDropdown(select, start, end) {
    for (let i = start; i <= end; i++) {
      const option = document.createElement('option');
      const value = String(i).padStart(2, '0'); // Add leading zero if needed
      option.text = value;
      option.value = value;
      select.appendChild(option);
    }
}
  
  // Get the select elements
  const hoursSelect = document.getElementById('hours');
  const minutesSelect = document.getElementById('minutes');
  
  // Populate hours (24-hour format)
  populateDropdown(hoursSelect, 0, 23);
  
  // Populate minutes
  populateDropdown(minutesSelect, 0, 59);

  function populateDropdown(select, start, end) {
  for (let i = start; i <= end; i++) {
    const option = document.createElement('option');
    option.text = String(i).padStart(2, '0'); // Add leading zero if needed
    option.value = i < 10? '0'+ `${i}` : i;
    select.appendChild(option);
  }
}

// Get the select elements
const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');

// Populate days (1-31)
populateDropdown(daySelect, 1, 31);

// Populate months (1-12)
populateDropdown(monthSelect, 1, 12);

 // Sample districts for different cities
 const districts = {
  Amman: ['Abdali', 'Abu Nseir', 'Bader Al-Jadeedah', 'Bader', 'Basman', 'Jubeiha', 'Madinah', 'Marj Al-Hamam', 'Marka', 'Al-Muwaqqar', 'Naour', 'Nasr', 'Ras Al-Ein', 'Sahab', 'Shafa Badran', 'Sweileh', 'Tariq', 'Khalda', 'Wadi Al-Seer', 'Yarmouk', 'Zahran'],
  Zarqa: ['City center', 'Althawra Al-Arabiya', 'Ewajan', 'Zawahreh', 'New Zarqa', 'Sports Complex District', 'Zarqa City Gardens District']
  // Add more districts for other cities if needed
};



function populateDistricts() {
  const citySelect = document.getElementById('citySelect');
  const districtSelect = document.getElementById('districtSelect');
  const selectedCity = citySelect.value;

  // Clear existing options
  districtSelect.innerHTML = '';

  // Populate districts based on the selected city
  districts[selectedCity].forEach(district => {
    const option = document.createElement('option');
    option.textContent = district;
    districtSelect.appendChild(option);
  });
}

// Populate districts for the initial city selection
populateDistricts();

// Show extra amount of money next to large radio buttons
function showPrice(option) {
  if (option === 'option2') {
      document.getElementById('priceDisplay').textContent = "+ 2 jds";
      priceDisplay.style.color = "red"; // Display the color pf priceDisplay
  }
}

const clickableDiv = document.querySelectorAll('.clickable-div')

function clickOnDiv(){
  clickableDiv.forEach(e => {
    e.addEventListener("click", () => {
      const radioBtn = e.querySelector(".radioBtn");
      radioBtn.checked = true;
    })
  })
}

clickOnDiv();