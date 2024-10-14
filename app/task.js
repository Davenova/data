// Function to handle button clicks
function handleButtonClick(buttonId) {
    const button = document.getElementById(buttonId);
  
    // Initial button state
    button.textContent = 'Check';
    button.disabled = false;
  
    // Add event listener to handle click events
    button.addEventListener('click', () => {
        if (button.textContent === 'Check') {
            // Open link and change button to "Claim"
            let link = '';
            switch (buttonId) {
                case 'xButton':
                    link = 'https://www.x.com/';
                    break;
                case 'tiktokButton':
                    link = 'https://www.tiktok.com/';
                    break;
                case 'youtubeButton':
                    link = 'https://www.youtube.com/';
                    break;
                case 'telegrambutton':
                    link = 'https://www.telegram.org/';
                    break;
            }
            window.open(link, '_blank');
            button.textContent = 'Claim';
            button.classList.remove('custom-button'); // Remove base green style
            button.classList.add('custom-button', 'claim'); // Change to orange
        } else if (button.textContent === 'Claim') {
            // Change button to "Claimed" state, set color to blue, and disable it
            button.textContent = 'Claimed';
            button.classList.remove('claim'); // Remove the orange style
            button.classList.add('claimed'); // Change to blue and disable interaction
            button.disabled = true; // Make it non-clickable
        }
    });
  }
  
  // Handle all buttons
  handleButtonClick('xButton');
  handleButtonClick('tiktokButton');
  handleButtonClick('youtubeButton');
  handleButtonClick('telegrambutton');
  