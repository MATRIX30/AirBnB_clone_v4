
const amenityInfo = {};
$('input[type="checkbox"]').change(function () {
  const id = $(this).attr('data-id');
  const name = $(this).attr('data-name');

  if ($(this).is(':checked')) {
    amenityInfo[name] = id;

  } else {
    delete amenity_info[name];

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
