
(function($){

platform(function Responder(__, storage){                                              //T18
  var
    config= {
    },
    store,
    routes= {}                                                                         //T19
  __
  .extend({
    request: function(url, method){ __.kick('Request', [method, url]) },               //T16
    methods: function(methods){ __.kick('methodsAllowed', methods) }                   //T17
  })
  .on('Restart', init)                                                                 //T20
  .on('methodsAllowed', allow_methods)                                                 //T*
  .on('routeDefined', add_route)                                                       //T*
  .on('Request', [validate_method, validate_cookie, validate_query ])
  .on('validMethod', set_method)
  .on('validCookie', set_cookie)
  .on('validQuery', set_query)
  .on('invalidQuery', respond_400)
  .on('newQuery', [match_route, match_method]);
  
  function init(e){ store= storage() }
  function allow_methods(e,methods){
    if (store.methods) return;
    store.methods= methods;
    $.each(methods.split(/ /), function(i, method){
      routes[method]= [];
      __[method]= function(url, callback){ __.kick('routeDefined', [method, url, callback]) }
    });
  }
  function validate_method(e,method,query,cookie,post){
    var
      method= method && method || 'GET',
      valid= method && store.methods.indexOf(method) > -1
    if (!valid) return __.kick('invalidMethod', method);
    __.kick('validMethod', method);
  }
  function set_method(e,method){
    store.method= method;
    __.kick('newMethod');
  }
  function validate_cookie(e,method,query,cookie,post){
    __.kick('noCookie');
  }
  function set_cookie(e,cookie){
    store.cookie= cookie;
    __.kick('newCookie');
  }
  function validate_query(e,method,query,cookie,post){
    var
      valid= /\/.*/.test(query)
    if (!valid) return __.kick('invalidQuery');
    __.kick('validQuery', query);
  }
  function set_query(e,query){
    store.query= query;
    __.kick('newQuery');
  }
  function respond(status){ __.kick('STATUS',status) }
	function respond_400(e,query){ respond(400) }
  function respond_404(e,query){ respond(404) }
  function respond_405(e,query){ respond(405) }
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
      store.route && route.callback.apply(__);
    });
    if (store.route) return __.kick('validRoute');
    __.kick('noRoute');
  }
  function match_method(e){
    __.kick('HTTP_GET')
  }
  
  init();
}, {
  method: '',                                                                          //T-
  methods: '',                                                                         //T-
  cookies: {},                                                                         //T-
  query: '',                                                                           //T-
  route: undefined                                                                     //T-
});

})(jQuery);