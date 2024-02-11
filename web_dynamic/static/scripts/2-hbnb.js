
const amenityInfo = {};

$('input[type="checkbox"]').change(function () {
  const id = $(this).attr('data-id');
  const name = $(this).attr('data-name');

  if ($(this).is(':checked')) {
    amenityInfo[name] = id;

  } else {
    delete amenityInfo[name];

  }

  $('.amenities h4').text('');
  const keys = Object.keys(amenityInfo);

  for (const key in keys) {
    if (key == keys.length - 1) {
      $('.amenities h4').append(keys[key]);
    } else {
      $('.amenities h4').append(keys[key] + ', ');
    }
  }
});

// http://0.0.0.0:5001/api/v1/status/ parsing host as ip leds to wrong url
$.get('http://localhost:5001/api/v1/status/', function(data){
    if (data.status === "OK"){
      $("#api_status").addClass("available")
    } else {
      $("#api_status").removeClass("available")
    }
});
