
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
  function dump(){ __.log(__.ver().Responder, __.ver().__, routes) }

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
  function request(method, uri, result){ return method && uri
    && function proper(){ return typeof uri== 'string' }()
    && function tidy(){ return uri= uri.replace(/^(\/| +)| +$/g, '') }()
    && function allowed(){ return store.methods.indexOf(method) >= 0 }()
    && function found(){ return route(method) }()
    && function prepare(){ return (result= '') || true }()
    && function before(){ return apply_route('before') }()!== false
    && function process(){ return apply_route(method) }()!== false
    && function after(){ return apply_route('after') }()!== false
    && function success(){ return respond(200, result) }()
    || function error(){ return respond(404) }()
    function apply_route(dir, matched){ return (matched= route(dir)) && (result= matched(result)) || result }
    function route(dir, matched){ $.each(routes[dir], match); return matched
      function match(){ return uri.match(this.pattern) && (matched= this.callback) && false }
    }
    function respond(code, body){ __.log(code,method,uri,body); return code }
  }
  function before(uri, callback){ return route('before', uri, callback) }
  function after(uri, callback){ return route('after', uri, callback) }
  setup();

},{
  
});

})(jQuery, this);
