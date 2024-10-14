const button = document.getElementById('myButton');

let claimed = localStorage.getItem('claimed_button');

if (claimed === 'true') {
  button.textContent = 'Claimed';
  button.classList.remove('bg-blue-500', 'hover:bg-blue-700');
  button.classList.add('bg-white', 'text-green-500', 'pointer-events-none'); // Add pointer-events-none class
  button.disabled = true; // Disable the button when it's claimed
} else {
  button.textContent = 'Check';
  button.disabled = false; // Enable the button when it's not claimed
}

button.addEventListener('click', () => {
  if (button.textContent === 'Check') {
    // Open YouTube link when "Check" button is clicked
    window.open('https://www.youtube.com/', '_blank');
    button.textContent = 'Claim';
    button.classList.remove('bg-blue-500', 'hover:bg-blue-700');
    button.classList.add('bg-orange-500', 'hover:bg-orange-700');
    button.disabled = false; // Enable the button when it's in the "Claim" state
  } else if (button.textContent === 'Claim') {
    localStorage.setItem('claimed_button', 'true');
    button.textContent = 'Claimed';
    button.classList.remove('bg-orange-500', 'hover:bg-orange-700');
    button.classList.add('bg-white', 'text-green-500', 'pointer-events-none'); // Add pointer-events-none class
    button.disabled = true; // Disable the button when it's claimed
  } else {
    localStorage.removeItem('claimed_button');
    button.textContent = 'Check';
    button.classList.remove('bg-white', 'text-green-500', 'pointer-events-none'); // Remove pointer-events-none class
    button.classList.add('bg-blue-500', 'hover:bg-blue-700');
  }
  claimed = localStorage.getItem('claimed_button');
});
