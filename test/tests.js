
(function(__){
  
module( 'Core' );

test( 'T1: Public API global namespace', function(){
  equal( typeof window.platform, 'function' );
  equal( platform, window.platform );
  equal( typeof platform, 'function' );
  equal( typeof platform(), 'object' );
});
test( 'T2: API - version', function(){
  equal( typeof __.version, 'string' );
  equal( __.version, '0.1.2' );
});
test( 'T3: API - hello World sample', function(){
  equal( typeof __.hello, 'function' );
});
test( 'T6: API - events (only for testing purposes)', function(){
  equal(typeof __.on, 'function');
  equal(typeof __.un, 'function');
  equal(typeof __.kick, 'function');
})
test( 'T23: API - extend', function(){
  expect(1);
  __.extend({
    my_public_method: function(){
      ok( true );
      return __;
    }
  })
  .my_public_method();
})
test( 'T4: Maintains private data storage inside closure', function(){
  equal( typeof storage, 'undefined' );
  equal( typeof __.storage, 'undefined' );
});
test( 'T7: Private configuration', function(){
  equal( typeof config, 'undefined' );
  equal( typeof __.config, 'undefined' );
});
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
      equal( typeof __.version, 'string');
      equal( typeof storage, 'function');
      equal( typeof storage(), 'object');
      equal( typeof storage().test_value, 'number');
      equal( storage().test_value, storage_defaults.test_value);
    }
  platform(module, storage_defaults);
});

test( 'Misc. sample requests', function(){
  __.request(3,'GET');
  __.request('','POST');
  __.request('/rere','PUTS');
  __.request('/rere','PUT');
  __.request('/test_path/','PUT');
  __.request('/test_path/','GET');
});

})(platform());