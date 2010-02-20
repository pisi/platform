// __ is platform
(function($){

platform= function(module, store){ return module && use.apply(__, arguments) || __ }   //T1 T22
$.__= function(){ return platform.apply(__, arguments) }                               //T24

var
  config= {                                                                            //T7
    debug: true
  },
  __= {
    version: '0.1.2',                                                                  //T2
    kick: function(events, data){ return trigger(events, data) },                      //T5 T6
    on: function(events, reactions){ return event(true, events, reactions) },          //T5 T6
    un: function(events, reactions){ return event(false, events, reactions) },         //T5 T6
    restart: function(){ return __.kick('Restart') },                                  //T21
    extend: function(methods){ return extend(methods) }                                //T23
  },
  storage,                                                                             //T4
  pool= $(document)                                                                    //T14

__.on('Restart', init);                                                                //T20

function init(e){ storage= {} }                                                        //T20
function use(module, defaults){ return module(__, use_storage(module.name,defaults)) } //T22
function use_storage(name, data){ return function(){ return storage[name]= data }}     //T22
function extend(api){ return $.extend(__, api) }                                       //T23
function many(subjects){ return typeof subjects=="object" && subjects || [subjects] }  //T-
function event(create, events, reactions){ $.each(many(events), process); return __    //T10
  function process(i,event){ $.each(many(reactions), handle)                           //T8
    function handle(ii,reaction){ unbind() && create && bind()                         //T8
      function unbind(){ return pool.unbind(event, reaction) }                         //T9
      function bind(){ return pool.bind(event, reaction) }                             //T5
    }
  }
}
function trigger(events, data){ report(); $.each(many(events), process); return __     //T11 T12 T13 T15
  function report(){ config.debug && log() }
  function log(){ console.log(events.length==1 && events[0] || events, data || '') }   //D
  function process(i,event){ (action() || sane()) && pool.trigger(event, data)         //T5
    function action(){ return /^[A-Z]/.test(event) && reset() }                        //T-
    function sane(){ return true }
    function reset(){ console.log("USER"); return true }
  }
}

init();                                                                                //T20

})(jQuery);
