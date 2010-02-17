/**
 * JS.PLATFORM
 */
(function($, window){

window.platform= function(){ return application() }                                    //T1

/** Core */
var
  config= {                                                                            //T7
    debug: true
  },
  api= {
    version: '0.1',                                                                    //T2
    hello: function(){ return 'Hello' },                                               //T3
    reset: function(){ return kick('Reset') }
  },
  application= function(){ return api },                                               //T1
  storage= {},                                                                         //T4
  kick= function(events, data){ incident(many(events), data) },                        //T5
  on= function(events, reactions){ event(true, many(events), many(reactions)) },       //T5
  un= function(events, reactions){ event(false, many(events), many(reactions)) },      //T5
  pool= $(document)                                                                    //T14

  $.extend(api, { on: on, un: un, kick: kick });                                       //T6

	on('Reset', function(){ storage= {} });                                              //T20
  
function many(subjects){ return typeof subjects=="object" && subjects || [subjects] }  //T-
function intervention(event){ return /^[A-Z]/.test(event) }                            //T-
function event(create, events, reactions){
  $.each(events, function(i, event){                                                   //T10
    $.each(reactions, function(){                                                      //T8
      create && pool.unbind(event, this);                                              //T9
      pool[create && 'bind' || 'unbind'](event, this);                                 //T5
    });
  });
}
function incident(events, data){                                                       //T11 T12 T13
  config.debug && console.log(events.length==1 && events[0] || events, data || '');    //D
  $.each(events, function(i, event){                                                   //T15
    intervention(event) && console.log("USER EVENT")                                   //T*
    pool.trigger(event, data);                                                         //T5
  });
}

/** HTTP Server (Responder) */
(function Responder(){
  $.extend(api, {
    request: function(url, method){ kick('Request', [method, url]) },                  //T16
    methods: function(methods){ kick('methodsAllowed', methods) }                      //T17
  });
  var
    store,                                                                             //T18
    routes= {}                                                                         //T19
  on('Reset', reset);                                                                  //T20
  on('methodsAllowed', allow_methods);                                                 //T*
  on('routeDefined', add_route);                                                       //T*
  on('Request', [validate_method, validate_cookie, validate_query ]);
  on('validMethod', set_method);
  on('validCookie', set_cookie);
  on('validQuery', set_query);
  on('invalidQuery', respond_400);
  on('newQuery', [match_route, match_method]);
  reset();

  function reset(e){                                                                   //T20
		store= storage.responder= {
      method: '',                                                                      //T-
      methods: '',                                                                     //T-
      cookies: {},                                                                     //T-
      query: '',                                                                       //T-
      route: undefined                                                                 //T-
    }
	}
	function allow_methods(e,methods){
		if (store.methods) return;
    store.methods= methods;
    $.each(methods.split(' '), function(i, method){
      routes[method]= [];
      window[method]= function(url, callback){ kick('routeDefined', [method, url, callback]) }
    });
  }
  function validate_method(e,method,query,cookie,post){
    var
      method= method && method || 'GET',
      valid= method && store.methods.indexOf(method) > -1
    if (!valid) return kick('invalidMethod', method);
    kick('validMethod', method);
  }
  function set_method(e,method){
    store.method= method;
    kick('newMethod');
  }
  function validate_cookie(e,method,query,cookie,post){
    kick('noCookie');
  }
  function set_cookie(e,cookie){
    store.cookie= cookie;
    kick('newCookie');
  }
  function validate_query(e,method,query,cookie,post){
    var
      valid= /\/.*/.test(query)
    if (!valid) return kick('invalidQuery');
    kick('validQuery', query);
  }
  function set_query(e,query){
    store.query= query;
    kick('newQuery');
  }
  function respond_400(e,query){
    kick('STATUS',400)
  }
  function add_route(e,method,route,callback){
    routes[method].push({
      name: route.toString(),
      route: route,
      callback: callback
    });
  }
  function match_route(e){
    $.each(routes[store.method], function(i, route){
      var
        query= store.query.substr(1),
        match= route.route.test(query);
      store.route= !store.route && match && route;
      store.route && route.callback(e,on,un,kick); // «««« TEMPORARY
    });
    if (store.route) return kick('validRoute');
    kick('noRoute');
  }
  function match_method(e){
    kick('HTTP_GET')
  }
})();

})(jQuery, this);
