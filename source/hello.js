
(function($){

platform(function HelloWorld(__, storage){
  $.extend(__, {
    hello: function(url, method){ __.kick('Hello') },                                  //T3
  });
  var store
  __.on('Reboot', boot);                                                               //T*
  __.on('Hello', hello);                                                               //T*
  
  function boot(){ store= storage() }
  function hello(){ alert(store.shout) }
  
  boot();
}, {
  shout: '__: Hello World!'
});

})(jQuery);
