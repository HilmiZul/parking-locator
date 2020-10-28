function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude;
  var lon = crd.longitude;
  console.log(lat);
  console.log(lon);
  document.getElementById('lat').value = lat;
  document.getElementById('lon').value = lon;

  var mymap = L.map('mapid').setView([lat, lon], 18);

  const attr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a>'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl);
  
  tiles.addTo(mymap);
  let marker = L.marker([lat, lon], {title: "NAMA / PLAT NOMOR"}).addTo(mymap);
  // marker.bindPopup("NAMA / PLAT NOMOR");
  // marker.on('click', onClick);

  function onClick(e) {
    var popup = e.target.getPopup();
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);