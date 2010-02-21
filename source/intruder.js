
(function($){

platform(function EvilIntruder(__, storage){
  __
  .extend({
    intrude: test_method_intrusion                                                     //T26
  })
  .on('EventIntrusion', test_event_intrusion)                                          //T25
  
  function test_event_intrusion(){                                                     //T25
    equal( typeof this, 'object');
    equal( typeof this.version, 'undefined' );
    equal( typeof __, 'object');
    equal( typeof __.version, 'string');
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
    equal( typeof this.version, 'string');
    equal( typeof __, 'object');
    equal( typeof __.version, 'string');
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
