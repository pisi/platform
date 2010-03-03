
(function($, window){

platform(function Responder(__, storage){
  var
    config= {
      port: 5678,
      hostname: 'localhost'
    },
    store,
    routes= { before: {}, after: {} }
  __
  .ver('0.2 (Slim Jim)')
  .api('0.1', {
    dump: function(){ dump.apply(window); return __ },
    request: function(/* method, URI */){ request.apply(window, arguments); return __ },
    methods: function(/* methods */){ methods.apply(window, arguments); return __ },
    before: function(/* URI, callback */){ before.apply(window, arguments); return __ },
    after: function(/* URI, callback */){ after.apply(window, arguments); return __ }
  })
  
  function setup(){ store= storage() }
  function teardown(){ store= undefined }
  function dump(){ console.log(__, __.ver().__, __.ver().Responder, this, config, store, routes) }

  function methods(methods){ return store.methods= store.methods || methods && allow()
    function allow(){ $.each(methods.split(/ /), api_method); return methods
      function api_method(){ return global(this) && slot(this)
        function slot(method){ return routes[method]= {} }
        function global(method){ return __[method]= route_for
          function route_for(uri, callback){ route(method, uri, callback); return __ }
        }
      }
    }
  }
  function route(method, uri, callback){ return routes[method][uri.toString()]= register()
    function register(){ return { pattern: uri, callback: callback } }
  }
  function request(method, uri){ var result;
    return function proper(){ return typeof uri=='string' }()
    && function tidy(){ return uri= uri.replace(/^(\/| +)| +$/g, '') }()
    && function allowed(){ return store.methods.indexOf(method) >= 0 }()
    && function found(){ return route(method) }()
    && function before(){ var matched= route('before'); return result= matched && matched(result) || result }()
    && function execute(){ var matched= route(method); return result= matched && matched(result) }()
    && function after(){ var matched= route('after'); return result= matched && matched(result) || result }()
    && function success(){ return respond(200, result) }()
    || function error(){ return respond(404) }()
    function route(dir){ var matched; $.each(routes[dir], match); return matched
      function match(){ return uri.match(this.pattern) && (matched= this.callback) && false }
    }
    function respond(code, body){ console.log(code,method,uri,body); return code }
  }
  function before(uri, callback){ return route('before', uri, callback) }
  function after(uri, callback){ return route('after', uri, callback) }
  setup();
},{
  
});

})(jQuery, this);
