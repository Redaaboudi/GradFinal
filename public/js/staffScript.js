// Get the "Rating" link element
const ratingLink = document.querySelector('a[href="signIn.html"]');

// Add an event listener to handle click on the "Rating" link
ratingLink.addEventListener('click', function(event) {
  // Prevent the default link behavior
  event.preventDefault();
  
  // Show the modal when the link is clicked
  const ratingModal = new bootstrap.Modal(document.getElementById('ratingModal'));
  ratingModal.show();
});






  





