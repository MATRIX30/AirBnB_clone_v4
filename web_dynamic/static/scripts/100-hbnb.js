
const amenityInfo = {};
const stateInfos = {};
const cityInfos = {};
$('.amenities input[type="checkbox"]').change(function () {
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
  const citiesID = [];
  const statesID = [];
  for (const key in amenityInfo){
    
    amenitiesID.push(amenityInfo[key]);
  }
  for (const key in cityInfos){
    
    citiesID.push(cityInfos[key]);
  }
  for (const key in stateInfos){
    
    statesID.push(stateInfos[key]);
  }
  $.ajax({
    url: "http://localhost:5001/api/v1/places_search",
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ 'amenities': amenitiesID,  'states': statesID, 'cities': citiesID}),
    success: function(response){
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


$('.locations input[type="checkbox"]').change(function(){
  const id = $(this).attr('data-id');
  const name = $(this).attr('data-name');
  if ($(this).is(":checked")){
    if ($(this).attr('elem-type') === "state" ){
      stateInfos[name] = id;
    } else {
      cityInfos[name] = id;
    }
  } else {
    if ($(this).attr('elem-type') === "state" ){
      delete stateInfos[name];
    } else {
      delete cityInfos[name];
    }
  }
  $(".locations h4").text('');
  keys = Object.keys(cityInfos)
  for (key in keys){
    if (key != keys.length - 1){
      $(".locations h4").append(keys[key] + ", ")
    } else {
      $(".locations h4").append(keys[key] + " ")
    }
  }
  keys = Object.keys(stateInfos)
  for (key in keys){
    if (key != keys.length - 1){
      $(".locations h4").append(keys[key] + ", ")
    } else {
      $(".locations h4").append(keys[key] + " ")
    }
  }});

