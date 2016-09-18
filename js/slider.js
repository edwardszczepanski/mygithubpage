class City {
  constructor(name, one, two, three, four, five, score, lat, lng) {
    this.name = name;
    this.one = one; // 1-100
    this.two = two; // 1-100
    this.three = three; // 1-100
    this.four = four; // 1-100
    this.five = five; // 1-100
    this.score = score; // 1-100
    this.lat = lat;
    this.lng = lng;
  }
}
class Importance {
  constructor(one, two, three, four, five) {
    this.one = one; // 1-10
    this.two = two; // 1-10
    this.three = three; // 1-10
    this.four = four; // 1-10
    this.five = five; // 1-10
  }
}

// One is Rent
// Two is CPI
// Three is Unemployment Rate
// Four is Population
// Five should be population

var cityData = [
  new City("Toronto, Ontario", 15, 32, 48, 100, 10, -1, 43.625985,-79.542025),
  new City("Montreal, Quebec", 76, 50, 75, 66, 10, -1, 45.488221,-73.565538),
  new City("Vancouver, British Columbia", 0, 66, 86, 40, 13, -1, 49.208871,-122.901347),
  new City("Ottawa, Ontario", 52, 42, 55, 20, 70, -1, 45.4215296, -75.6971931),
  new City("Calgary, Alberta", 20, 0, 0, 22, 100, -1, 51.040992,-114.030466),
  new City("Edmonton, Alberta", 26, 6, 25, 21, 91, -1, 53.544389, -113.4909267),
  new City("Québec City, Quebec", 76, 51, 96, 11, 44, -1, 46.753463,-71.430106),
  new City("Winnipeg, Manitoba", 43, 41, 48, 11, 24, -1, 49.8997541, -97.1374937),
  new City("Hamilton, Ontario", 36, 69, 53, 11, 1, -1, 43.261401,-79.887032),
  new City("Waterloo, Ontario", 51, 58, 71, 6, 73, -1, 43.4642578, -80.5204096),
  new City("Halifax, Nova Scotia", 39, 32, 86, 5, 39, -1, 44.674538,-63.614545),
  new City("Victoria, British Columbia", 30, 83, 100, 4, 45, -1, 49.205529,-122.907447),
  new City("Windsor, Ontario", 69, 50, 69, 3, 13, -1, 42.329805,-83.037058),
  new City("Saskatoon, Saskatchewan", 57, 18, 61, 3, 66, -1, 52.1332, -106.6700),
  new City("Regina, Saskatchewan", 41, 16, 84, 2, 74, -1, 50.4452, -104.6189),
  new City("Sherbrooke, Quebec", 100, 65, 75, 1, 45, -1, 45.4010, -71.8824),
  new City("St. John's, Newfoundland", 78, 30, 50, 1, 68, -1, 47.577628,-52.703957),
  new City("Barrie, Ontario", 33, 47, 32, 1, 28, -1, 44.3894, -79.6903),
  new City("Kelowna, British Columbia", 59, 100, 57, 1, 16, -1, 49.8880, -119.4960),
  new City("Kingston, Ontario", 22, 42, 71, 0, 40, -1, 44.2312, -76.4860)
];

var one   = 50;
var two   = 50;
var three = 50;
var four  = 50;
var five  = 50;

var markerList = [];

function setMarkers(data) {
  for (var i = 0; i < data.length; ++i) {
    var markerNumber = i + 1;
    var city = data[i];
    var image = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" +   markerNumber + "|FE6256|000000";
    var zValue = data.length - i;
    var marker = new google.maps.Marker({
      position: {lat: city.lat, lng: city.lng},
      map: map,
      title: city.name,
      icon: image,
      zIndex: zValue
    });
    marker.addListener('click', function() {
      //alert(this);
      var index = this.zIndex
      index = 20 - index;
      console.log(index);
      initVis(index);
    });

    markerList.push(marker);
  }
}

function reloadMarkers() {
  for (var i=0; i<markerList.length; i++) {
    markerList[i].setMap(null);
  }
  markerList = [];

  setMarkers(cityData);
}

function initMap(data) {
  var mapOptions = {
    zoom: 4,
    center: {lat: 43.4643, lng: -80.5204}
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  setMarkers(cityData);
}

function initVis(cityIndex){
  ctx = $("#pentagon");
  var data = {
      labels: ["Rent", "CPI", "Unemployment", "Population", "Salary"],
      datasets: [
          {
              label: cityData[cityIndex].name + " Data",
              backgroundColor: "rgba(204, 204, 0, 0.8)",
              borderColor: "rgba(45,71,57,1)",
              pointBackgroundColor: "rgba(45,71,57,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [cityData[cityIndex].one, cityData[cityIndex].two, cityData[cityIndex].three, cityData[cityIndex].four, cityData[cityIndex].five]
          },
          {
              label: "User Input",
              backgroundColor: "rgba(0, 0, 204, 0.8)",
              borderColor: "rgba(187,206, 168, 1)",
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [one, two, three, four, five]
          }
      ]
  };
  $("#draggable").show();
  new Chart(ctx, {
      type: "radar",
      data: data,
      options: {
              scale: {
                  reverse: true,
                  ticks: {
                      beginAtZero: true
                  }
              }
      }
  });
}

function fixData(){
  for (city in cityData) {
    city.one = 100 - city.one + 1;
    city.two = 100 - city.two + 1;
    city.three = 100 - city.three + 1;
  }
}

$(function() {
  var slide1 = document.getElementById('slide1');
  var slide2 = document.getElementById('slide2');
  var slide3 = document.getElementById('slide3');
  var slide4 = document.getElementById('slide4');
  var slide5 = document.getElementById('slide5');

  fixData();

  slide1.oninput = function(){
    one = this.value;
    update();
  }
  slide2.oninput = function(){
    two = this.value;
    update();
  }
  slide3.oninput = function(){
    three = this.value;
    update();
  }
  slide4.oninput = function(){
    four = this.value;
    update();
  }
  slide5.oninput = function(){
    five = this.value;
    update();
  }

  function update(){
    $("#draggable").hide();
    create(cityData);
    cityData.sort(compare);
    generateList(cityData);
    reloadMarkers(cityData);
    console.log(cityData);
  }

  function compare(a, b) {
    if (a.score > b.score) {
      return -1;
    } else {
      return 1;
    }
  }

  function create(data){
    for (var i = 0; i < data.length; ++i){
      if (true) {
        var sum = 0;
        sum += data[i].one   * one;
        sum += data[i].two   * two;
        sum += data[i].three * three;
        sum += data[i].four  * four;
        sum += data[i].five  * five;
        data[i].score = sum;
      } else {
        // Yelp Integration will come later
      }
    }
  }

  function generateList(data){
    var ul = document.getElementById("myList");
    ul.innerHTML = '';
    for (var i = 0; i < data.length; ++i) {
      var li = document.createElement("li");
      li.onclick=hello;
      li.appendChild(document.createTextNode((i + 1) + ":  " + data[i].name));
      ul.appendChild(li);
    }
  }

  function hello(){
    var contents = this.innerHTML;
    contents = parseInt(contents.substr(0, contents.indexOf(':')));
    initVis(contents - 1);
  }

  update();
});
