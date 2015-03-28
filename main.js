(function(){
  var milkcocoa = new MilkCocoa("https://io-ui7rsabaf.mlkcca.com:443");
  var duration = 10 * 1000;
  //var message = milkcocoa.dataStore("message");
  
  var onPosition = function(pos) {
    console.log('pos', pos);
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
  setTimeout(locationLooper, duration);
  
})();
