
(function __($, window){

platform= function(module, store){ return module && use.apply(__, arguments) || __ }                  //T1 T22
$.__= function(){ return platform.apply(__, arguments) }                                              //T24

var
  config= {                                                                                           //T7
    debug: true
  },
  __= {
    ver: function(/* version */){ return ver.apply(window, arguments) },                              //T2
    api: function(/* version, methods */){ return api.apply(window, arguments) }                      //T23
  },
  versions= { module: {}, api: {} },                                                                  //T4
  storage                                                                                             //T4

Function.prototype.identify= function(){ return identify_function(this) }                             //T27

__
.ver('0.1.3')                                                                                         //T2
.api('0.2', {                                                                                         //T23
   restart: function(){ teardown() && setup(); return __ }                                            //T21
})

function setup(){ storage= {} }                                                                       //T20
function teardown(){ storage= undefined || true }
function use(module, defaults){ return module(__, store(module.name, defaults))                       //T22
  function store(name, data){ return function(){ return storage[name]= data }}                        //T22
}
function ver(version){ return utilize('module', version) }                                            //T2
function api(version, methods){ return utilize('api', version, methods) }                             //T23
function utilize(purpose, version, methods, module){ return version && (module= module())
  && function free(){ return versions[purpose][module] == undefined }()                               //T28
  && function use(){ return versions[purpose][module]= version }()                                    //T2 T23
  && function extend(){ return methods && $.extend(__, methods) || true }()                           //T23
  && __                                                                                               //T1
  || versions[purpose]                                                                                //T2 T23
  function module(){ return crawl(arguments.callee.caller)
    function crawl(it, name){ return it && (name= it.identify())                                      //T27
      && function is_module(){ return name.toString().match(/^[A-Z]|^__$/) }()
      && name
      || function seek_further(){ return it.caller && crawl(it.caller) || '__' }()
    }
  }
}
setup();

function identify_function(that, match){ return that.name                                             //T27
  || function locate(){ return match= that.toString().match(/^function (\S+)\(/g) }()
  && function isolate(){ return match.toString().replace(/function|\(|\s+/g, '') }()
}

/* dev helper */ typeof console == 'undefined' && (console= { log: function(){} });
/* dev helper */ function log(note,value){ console.log(note,value); return value }

})(jQuery, this);
