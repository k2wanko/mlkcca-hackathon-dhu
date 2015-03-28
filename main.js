(function(){
  var milkcocoa = new MilkCocoa("https://io-ui7rsabaf.mlkcca.com");
  var duration = 1000;
  //var message = milkcocoa.dataStore("message");
  
  var onPosition = function(pos) {
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
    
    setTimeout(LocationLooper, duration);
  };
  locationLooper.isCancel = false
  locationLooper.cancel = function() {
    locationLooper.isCancel = true;
  }
  setTimeout(LocationLooper, duration)
  
})();
