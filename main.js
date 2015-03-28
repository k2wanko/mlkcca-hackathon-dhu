(function(){
  var milkcocoa = new MilkCocoa("https://io-ui7rsabaf.mlkcca.com:443");
  var duration = 10 * 1000;
  //var message = milkcocoa.dataStore("message");
  var room = location.hash || '#public';
  var markers = {};

  var store = milkcocoa.dataStore("room").child(room);
  
  var storage = localStorage;
  var uid = storage.getItem('uid');
  if (!uid) {
    uid = guid();
    storage.setItem('uid', uid);
  }
  
  console.log("room", room);
  var map;

  var attachMessage = function(marker, message) {
    console.log("attachMessage", message, marker);
    var info = google.maps.InfoWindow({
      content: message
    });
    var open = info.open.bind(info, marker.getMap(), marker);
    google.maps.event.addListener(marker, 'click', open);
    open();
    return info;
  };

  var createMarker = function(uid, pos) {
    var coords = pos.coords;
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    var marker = markers[uid];
    if (!marker){
      marker = markers[uid] = new google.maps.Marker({
        position: latlng,
        map: map,
        title: uid
      });
    } else {
      marker.setPosition(latlng);
    }
    
  };
  
  var onPosition = function(pos) {
    var coords = pos.coords;
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    var mapOps = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    if (!map) {
      map = new google.maps.Map(document.getElementById("map_canvas"),
                                mapOps);
      //attachMessage(marker, "My");
    }

    createMarker(uid, pos);
    
    store.send({
      uid: uid,
      pos: pos
    });
    
    //console.log('pos', pos);
  };

  var onError = function(err) {
    console.log("Error", err);
  };

  var geolocation = function() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(onPosition, onError);
  };

  var locationLooper = function() {
    
    if (locationLooper.isCancel) return;

    geolocation();
    
    setTimeout(locationLooper, duration);
  };
  locationLooper.isCancel = false;
  locationLooper.cancel = function() {
    locationLooper.isCancel = true;
  };
  setTimeout(locationLooper, 0);


  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  store.on('send', function(data){
    var val = data.value;
    if (!val) return;
    if (val.uid == uid) return;
    console.log('on send', data);
  });
  
})();
