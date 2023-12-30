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
    option.value = i;
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

document.addEventListener('DOMContentLoaded', function() {
  function incrementProgressBar() {
    let progress = localStorage.getItem('progress');
    if (!progress) {
      progress = 0;
    }
    progress = parseInt(progress);
    progress += 10;
    if (progress > 100) {
      progress = 100;
    }
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';
    localStorage.setItem('progress', progress);
  }

  incrementProgressBar();
});

