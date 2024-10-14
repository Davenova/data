$(document).ready(function() {
  var counter = 0;

  // Hide the loading animation and show the home page after 10 seconds
  setTimeout(function() {
    $('#loading-container').hide();
    $('#home-container').show();
  }, 5000);

  // Start the changing images
  setInterval(function() {
    if(counter == 3) { 
      counter = 0; 
    }

    changeImage(counter);
    counter++;
  }, 3000);

  // Set the percentage off
  loading();

  // Your existing JavaScript code here...
});

var images = [
  'fa fa-gamepad',
  'cool.png'
];

function changeImage(counter) {
  if (images[counter].startsWith('fa')) {
    $(".loader .image").html('<i class="' + images[counter] + '"></i>');
  } else {
    $(".loader .image").html('<img src="' + images[counter] + '" alt="Cat icon">');
  }
}

function loading(){
  var num = 0;

  for(i=0; i<=100; i++) {
    setTimeout(function() { 
      $('.loader span').html(num+'%');

      if(num == 100) {
        // Remove the recursive call to prevent infinite loop
        // loading();
      }
      num++;
    },i*50);
  };
}
