
(function(__){
  
module( 'Core' );

test( 'T1: Public API global namespace', function(){
  equal( typeof window.platform, 'function' );
  equal( platform, window.platform );
  equal( typeof platform, 'function' );
  equal( typeof platform(), 'object' );
});
test( 'T2: API - version', function(){
  equal( typeof __.ver, 'function' );
  equal( typeof __.ver(), 'object' );
  equal( typeof __.ver().__, 'string' );
  equal( __.ver().__, '0.1.3' );
});
test( 'T3: API - hello World sample', function(){
  equal( typeof __.hello, 'function' );
});
test( 'T6: API - events (only for testing purposes)', function(){
  equal(typeof __.on, 'function');
  equal(typeof __.un, 'function');
  equal(typeof __.kick, 'function');
});
test( 'T23: API - api (for extending the API)', function ApiTestModule(){
  expect(8);
  __
  .api('0.1', {
    my_public_method: function(){
      ok( true );
      return __;
    }
  });
  equal( typeof __.my_public_method, 'function');
  equal( typeof __.my_public_method(), 'object');
  equal( typeof __.api(), 'object');
  equal( typeof __.api().__, 'string');
  equal( __.api().__, '0.2');
  equal( typeof __.api().ApiTestModule, 'string');
  equal( __.api().ApiTestModule, '0.1');
});
test( 'T28: API - allow only one extension per module', function ApiTestModule(){
  __
  .api('99.9', {
    fake_public_method: function(){
      ok( false );
      return __;
    }
  });
	equal( __.api().ApiTestModule, '0.1');
	equal( typeof __.fake_public_method, 'undefined');
});
test( 'T24: jQuery.__ namespace convenient shortcut', function(){
  equal( typeof jQuery.__, 'function');
  equal( typeof jQuery.__(), 'object');
  equal( typeof jQuery.__(function TestModule(___){
    equal( typeof ___, 'object' );
  },{ value: 'value' }), 'object');
  equal( typeof jQuery.__(function TestModule(___, storage){
    var
      store= storage();
    equal( typeof ___, 'object' );
    equal( typeof storage, 'function' );
    equal( typeof store, 'object' );
    equal( typeof store.value, 'string' );
    equal( store.value, 'value' );
  },{ value: 'value' }), 'object');
});
test( 'T4: Maintains private data storage inside closure', function(){
  equal( typeof storage, 'undefined' );
  equal( typeof __.storage, 'undefined' );
});
test( 'T7: Private configuration', function(){
  equal( typeof config, 'undefined' );
  equal( typeof __.config, 'undefined' );
});
test( 'T27: Function.id() function identification method', function(){
	function testFunction(){}
	equal( testFunction.id(), 'testFunction');
});
module( 'Events' );

test( 'T5: Reacts on event kick', function(){
  var
    check= function(){
      __.un('testEvent',check);
      ok( true );
    }
  expect(1);
  __.on('testEvent',check);
  __.kick('testEvent');
});
test( 'T8: Multiple different reactions on one event', function(){
  var
    check= function(){
      __.un('testEvent',check);
      ok( true );
    },
    check_again= function(){
      __.un('testEvent',check_again);
      ok( true );
    }
  expect(2);
  __.on('testEvent',[check,check_again]);
  __.kick('testEvent');
});
test( 'T9: Multiple identical reactions on one event are filtered', function(){
  var
    check= function(){
      __.un('testEvent',check);
      ok( 'Fired just once' );
    }
  expect(1);
  __.on('testEvent',[check,check]);
  __.kick('testEvent');
});
test( 'T10: Reaction on multiple events', function(){
  var
    i= 0,
    check= function(){
      ok( true, 'Reacts' );
      if (i++ < 1) return;
      __.un(['testEvent','otherTestEvent'],check);
    }
  expect(2);
  __.on(['testEvent','otherTestEvent'],check);
  __.kick('testEvent');
  __.kick('otherTestEvent');
});
test( 'T11: Kicked event without parameters', function(){
  var
    check= function(e, none){
      equal( typeof none, 'undefined' );
    }
  expect(2);
  __.on('testEvent', check);
  __.kick('testEvent');
  __.kick('testEvent', []);
  __.un('testEvent', check);
});
test( 'T12: Kicked event can have a parameter', function(){
  var
    check= function(e, one){
      equal( typeof one, 'boolean' );
    }
  expect(2);
  __.on('testEvent', check);
  __.kick('testEvent', true);
  __.kick('testEvent', [true]);
  __.un('testEvent', check);
});
test( 'T13: Kicked event can have more than one parameter', function(){
  var
    check= function(e, first, second){
      equal( typeof first, 'boolean' );
      equal( typeof second, 'number' );
    }
  expect(2);
  __.on('testEvent', check);
  __.kick('testEvent', [true, 123]);
  __.un('testEvent', check);
});
test( 'T14: Private event pool', function(){
  equal( typeof pool, 'undefined' );
  equal( typeof __.pool, 'undefined' );
});
test( 'T15: Can kick multiple events at once', function(){
  var
    i= 0,
    check= function(){
      ok( true, 'Reacts' );
      if (i++ < 1) return;
      __.un(['testEvent', 'otherTestEvent'], check);
    }
  expect(2);
  __.on(['testEvent', 'otherTestEvent'], check);
  __.kick(['testEvent', 'otherTestEvent']);
});

module( 'Responder' );

test( 'T16: API - methods', function(){
  equal( typeof __.methods, 'function' );
});
test( 'T17: API - request', function(){
  equal( typeof __.request, 'function' );
});
test( 'T18: Mirrors private core data storage bit inside closure', function(){
  equal( typeof store, 'undefined' );
  equal( typeof __.store, 'undefined' );
  equal( typeof __.storage, 'undefined' );
});
test( 'T19: Maintains private list of defined routes', function(){
  equal( typeof routes, 'undefined' );
  equal( typeof __.routes, 'undefined' );
});

module( 'Core' );

test( 'T20: Inner state can be reset', function(){
  var
    check= function(){
      ok( true );
    }
  __.on('Reboot', check);
  __.kick('Reboot');
  __.un('Reboot', check);
});
test( 'T21: API - restart', function(){
  equal( typeof __.restart, 'function' );
  var
    check= function(){
      ok( true );
    }
  __.on('Restart', check);
  __.restart();
  __.un('Restart', check);
})
test( 'T22: Public API global namespace module-adding function mode', function(){
  var
    storage_defaults= {
      test_value: 123
    },
    module= function(__, storage){
      equal( typeof __, 'object');
      equal( typeof __.api, 'function');
      equal( typeof __.api(), 'object');
      equal( typeof __.ver, 'function');
      equal( typeof __.ver(), 'object');
      equal( typeof __.ver().__, 'string');
      equal( typeof storage, 'function');
      equal( typeof storage(), 'object');
      equal( typeof storage().test_value, 'number');
      equal( storage().test_value, storage_defaults.test_value);
    }
  platform(module, storage_defaults);
});

module( 'Intruder' );

test( 'T25: Private variables intrusion attempts through event', function(){
  __.kick('EventIntrusion');
});
test( 'T26: Private variables intrusion attempts by API method', function(){
  __.intrude();
});

test( 'Misc. sample requests', function(){
  __.request('GET', 3);
  __.request('POST', '');
  __.request('PUTS', '/rere');
  __.request('PUT', '/rere');
  __.request('PUT', '/test_path/');
  __.request('GET', '/test_path/');
});

})(platform());