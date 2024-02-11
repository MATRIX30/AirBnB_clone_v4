
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

$.ajax(
  {
    url: "http://localhost:5001/api/v1/places_search",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(response){
      for (const place of response){
        $("section.places").append(`
          <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${place.max_guest} Guest</div>
                <div class="number_rooms">${place.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
          </article>
        `)
      }
    },
    error: function(xhr, status, error){
      console.error("Error", status);
    }
  }
);

$('button').click(function(){
  const amenitiesID = [];
  for (const key in amenityInfo){
    
    amenitiesID.push(amenityInfo[key]);
  }
  $.ajax({
    url: "http://localhost:5001/api/v1/places_search",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'amenities': amenitiesID }),
    success: function(response){
      console.log(response)
      $("section.places").empty()
      for (const place of response){
        $("section.places").append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
            <div class="max_guest">${place.max_guest} Guest</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `)
      }
    },
    error: function(xhr, status, error){
      console.error("Error", status);
    }
  }); 
});