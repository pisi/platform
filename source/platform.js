
(function __($, window){

platform= function(module, store){ return module && use.apply(__, arguments) || __ }   //T1 T22
$.__= function(){ return platform.apply(__, arguments) }                               //T24

var
  config= {                                                                            //T7
    debug: true
  },
  __= {
    ver: function(/* version */){ return ver.apply(window, arguments) },               //T2
    api: function(/* version, methods */){ return api.apply(window, arguments) }       //T23
  },
  versions= { module: {}, api: {} },
  storage                                                                              //T4
__
.ver('0.1.3')                                                                          //T2
.api('0.2', {
   restart: function(){ teardown() && setup(); return __ }                             //T21
})

function setup(){ storage= {} }                                                        //T20
function teardown(){ storage= undefined || true }
function use(module, defaults){ return module(__, store(module.name, defaults))        //T22
  function store(name, data){ return function(){ return storage[name]= data }}         //T22
}
function ver(version){ return utilize('module', version) }
function api(version, methods){ return utilize('api', version, methods) }
function utilize(kind, version, methods){ var slot; return version && (slot= slot())
  && function free(){ return versions[kind][slot] == undefined }()
  && function use(){ return versions[kind][slot]= version }()
  && function extend(){ return methods && $.extend(__, methods) || true }()
  && __ || versions[kind]
  function slot(){ return crawl(arguments.callee.caller)
    function crawl(it){ return it
      && function module(){ return it.name.match(/^[A-Z]|^__$/) }()
      && it.name
      || function seek(){ return it.caller && crawl(it.caller) || '__' }()
    }
  }
}

setup();

})(jQuery, this);
