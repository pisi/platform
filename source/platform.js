
(function __($, window){

platform= function(module, store){ return module && use.apply(__, arguments) || __ }                  //T1 T22
$.__= function(){ return platform.apply(__, arguments) }                                              //T24
Function.prototype.id= function(){ return identify(this) }                                            //T27

var
  config= {                                                                                           //T7
    debug: true
  },
  __= {
    ver: function(/* version */){ return ver.apply(window, arguments) },                              //T2
    api: function(/* version, methods */){ return api.apply(window, arguments) }                      //T23
  },
  versions= { module: {}, api: {} },
  storage                                                                                             //T4

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
function utilize(kind, version, methods, slot){ return version && (slot= slot())
  && function free(){ return versions[kind][slot] == undefined }()                                    //T28
  && function use(){ return versions[kind][slot]= version }()                                         //T2 T23
  && function extend(){ return methods && $.extend(__, methods) || true }()                           //T23
  && __                                                                                               //T1
  || versions[kind]                                                                                   //T2 T23
  function slot(){ return crawl(arguments.callee.caller)
    function crawl(it, name){ return it && (name= it.id())                                            //T27
      && function module(){ return name.toString().match(/^[A-Z]|^__$/) }()
      && name
      || function seek(){ return it.caller && crawl(it.caller) || '__' }()
    }
  }
}
setup();

function identify(that, match){ return that.name                                                      //T27
  || function extract(){ return match= that.toString().match(/^function (\S+)\(/g) }()
  && function dry(){ return match.toString().replace(/function|\(|\s+/g, '') }()
}

/* dev helper */ typeof console == 'undefined' && (console= { log: function(){} });
/* dev helper */ function log(note,value){ console.log(note,value); return value }

})(jQuery, this);
