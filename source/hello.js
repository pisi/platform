
(function($){

platform(function HelloWorld(__, storage){
  $.extend(__, {
    hello: function(url, method){ __.kick('Hello') },                                  //T3
  });
  var store
  __
  .on('Restart', init)                                                                 //T*
  .on('Hello', hello);                                                                 //T*
  
  function init(){ store= storage() }
  function hello(){ alert(store.shout) }
  
  init();
}, {
  shout: '__: Hello World!'
});

})(jQuery);
