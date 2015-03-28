(function(){
  var milkcocoa = new MilkCocoa("https://io-ui7rsabaf.mlkcca.com");
  //var message = milkcocoa.dataStore("message");

  var geolocation = function (){
    if (!navigator.geolocation) {
      return;
    }

    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  geolocation()
    .then(function(pos){
      console.log(pos);
    })
    .catch(function(err){
      console.error(err);
    });
  
})();
