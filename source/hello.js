
(function(){

platform(function HelloWorld(__, storage){
  var store
  __
  .api('0.1', {
    hello: function(url, method){ __.kick('Hello') },                                                 //T3
  })
  .on('Restart', init)                                                                                //T*
  .on('Hello', hello);                                                                                //T*
  
  function init(){ store= storage() }
  function hello(){ alert(store.shout) }
  
  init();
}, {
  shout: '__: Hello World!'
});

})();
