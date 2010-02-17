
(function(){
	
module( 'Core' );

test( 'T1: Public API global namespace', function(){
	equal( typeof window.platform, 'function' );
	equal( platform, window.platform );
	equal( typeof platform, 'function' );
	equal( typeof platform(), 'object' );
});
test( 'T2: API - version', function(){
	equal( typeof platform().version, 'string' );
	equal( platform().version, '0.1' );
});
test( 'T3: API - hello', function(){
	equal( typeof platform().hello, 'function' );
	equal( platform().hello(), 'Hello' );
});
test( 'T6: API - events (only for testing purposes)', function(){
	equal(typeof platform().on, 'function');
	equal(typeof platform().un, 'function');
	equal(typeof platform().kick, 'function');
})
test( 'T4: Maintains private data storage inside closure', function(){
	equal( typeof storage, 'undefined' );
	equal( typeof platform().storage, 'undefined' );
});
test( 'T7: Private configuration', function(){
	equal( typeof config, 'undefined' );
	equal( typeof platform().config, 'undefined' );
});
test( 'T5: Reacts on event kick', function(){
	var
		check= function(){
			platform().un('testEvent',check);
			ok( true );
		}
	expect(1);
	platform().on('testEvent',check);
	platform().kick('testEvent');
});
test( 'T8: Multiple different reactions on one event', function(){
	var
		check= function(){
			platform().un('testEvent',check);
			ok( true );
		},
		check_again= function(){
			platform().un('testEvent',check_again);
			ok( true );
		}
	expect(2);
	platform().on('testEvent',[check,check_again]);
	platform().kick('testEvent');
});
test( 'T9: Multiple identical reactions on one event are filtered', function(){
	var
		check= function(){
			platform().un('testEvent',check);
			ok( 'Fired just once' );
		}
	expect(1);
	platform().on('testEvent',[check,check]);
	platform().kick('testEvent');
});
test( 'T10: Reaction on multiple events', function(){
	var
		i= 0,
		check= function(){
			ok( true, 'Reacts' );
			if (i++ < 1) return;
			platform().un(['testEvent','otherTestEvent'],check);
		}
	expect(2);
	platform().on(['testEvent','otherTestEvent'],check);
	platform().kick('testEvent');
	platform().kick('otherTestEvent');
});
test( 'T11: Kicked event without parameters', function(){
	var
		check= function(e, none){
			equal( typeof none, 'undefined' );
		}
	expect(2);
	platform().on('testEvent', check);
	platform().kick('testEvent');
	platform().kick('testEvent', []);
	platform().un('testEvent', check);
});
test( 'T12: Kicked event can have a parameter', function(){
	var
		check= function(e, one){
			equal( typeof one, 'boolean' );
		}
	expect(2);
	platform().on('testEvent', check);
	platform().kick('testEvent', true);
	platform().kick('testEvent', [true]);
	platform().un('testEvent', check);
});
test( 'T13: Kicked event can have more than one parameter', function(){
	var
		check= function(e, first, second){
			equal( typeof first, 'boolean' );
			equal( typeof second, 'number' );
		}
	expect(2);
	platform().on('testEvent', check);
	platform().kick('testEvent', [true, 123]);
	platform().un('testEvent', check);
});
test( 'T14: Private event pool', function(){
	equal( typeof pool, 'undefined' );
	equal( typeof platform().pool, 'undefined' );
});
test( 'T15: Can kick multiple events at once', function(){
	var
		i= 0,
		check= function(){
			ok( true, 'Reacts' );
			if (i++ < 1) return;
			platform().un(['testEvent', 'otherTestEvent'], check);
		}
	expect(2);
	platform().on(['testEvent', 'otherTestEvent'], check);
	platform().kick(['testEvent', 'otherTestEvent']);
});

module( 'Responder' );

test( 'T16: API - methods', function(){
	equal( typeof platform().methods, 'function' );
});
test( 'T17: API - request', function(){
	equal( typeof platform().request, 'function' );
});
test( 'T18: Mirrors private core data storage bit inside closure', function(){
	equal( typeof store, 'undefined' );
	equal( typeof platform().store, 'undefined' );
	equal( typeof platform().storage, 'undefined' );
});
test( 'T19: Maintains private list of defined routes', function(){
	equal( typeof routes, 'undefined' );
	equal( typeof platform().routes, 'undefined' );
});
test( 'T20: Inner state can be reset', function(){
	var
		check= function(){
			ok( true );
		}
	platform().on('reset', check);
	platform().kick('reset');
	platform().un('reset', check);
});

return;
test( 'a && b', function()
{
	platform().request(3,'GET');
	platform().request('','POST');
	platform().request('/rere','PUTS');
	platform().request('/rere','PUT');
	platform().request('/test_path/','PUT');
	platform().request('/test_path/','GET');
});

})();