
(function($){

platform(function EvilIntruder(__, storage){
  __
  .api('0.1', {
    intrude: test_method_intrusion                                                     //T26
  })
  .on('EventIntrusion', test_event_intrusion)                                          //T25
  
  function test_event_intrusion(){                                                     //T25
    equal( typeof this, 'object');
    equal( typeof this.ver, 'undefined' );
    equal( typeof __, 'object');
    equal( typeof __.ver, 'function');
    equal( typeof __.ver(), 'object');
    equal( typeof __.ver().__, 'string');
    equal( typeof storage, 'function');
    equal( typeof store, 'undefined');
    equal( typeof config, 'undefined');
    equal( typeof pool, 'undefined');
    equal( typeof use, 'undefined');
    equal( typeof use_storage, 'undefined');
    equal( typeof many, 'undefined');
    equal( typeof event, 'undefined');
    equal( typeof trigger, 'undefined');
  }
  function test_method_intrusion(){                                                    //T26
    equal( typeof this, 'object');
    equal( typeof this.ver, 'function');
    equal( typeof __, 'object');
    equal( typeof __.ver, 'function');
    equal( typeof __.ver(), 'object');
    equal( typeof __.ver().__, 'string');
    equal( typeof storage, 'function');
    equal( typeof store, 'undefined');
    equal( typeof config, 'undefined');
    equal( typeof pool, 'undefined');
    equal( typeof use, 'undefined');
    equal( typeof use_storage, 'undefined');
    equal( typeof many, 'undefined');
    equal( typeof event, 'undefined');
    equal( typeof trigger, 'undefined');
  }
}, {
});

})(jQuery);
