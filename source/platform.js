
(function($){

platform= function(module){ return module && use.apply(__, arguments) || __ }          //T1 T22

/** Core */
var
  config= {                                                                            //T7
    debug: true
  },
  __= {
    version: '0.1.1',                                                                  //T2
    kick: function(events, data){ return action(many(events), data) },                 //T5 T6
    on: function(events, reactions){ return event(true, many(events), many(reactions)) }, //T5 T6
    un: function(events, reactions){ return event(false, many(events), many(reactions)) }, //T5 T6
    restart: function(){ return __.kick('Restart') }                                   //T21
  },
  storage,                                                                             //T4
  pool= $(document)                                                                    //T14

__.on('Restart', init);                                                                //T20

function init(e){ storage= {} }                                                        //T20
function use(module, defaults){                                                        //T22
  return module(__, function(){ return storage[module.name]= defaults });              //T22
}
function many(subjects){ return typeof subjects=="object" && subjects || [subjects] }  //T-
function event(create, events, reactions){
  $.each(events, function(i, event){                                                   //T10
    $.each(reactions, function(){                                                      //T8
      create && pool.unbind(event, this);                                              //T9
      pool[create && 'bind' || 'unbind'](event, this);                                 //T5
    });
  });
  return __;
}
function action(events, data){                                                         //T11 T12 T13
  config.debug && console.log(events.length==1 && events[0] || events, data || '');    //D
  $.each(events, function(i, event){                                                   //T15
    intervention(event) && console.log("USER EVENT")                                   //T*
    pool.trigger(event, data);                                                         //T5
  });
  return __;
}
function intervention(event){ return /^[A-Z]/.test(event) }                            //T-

init();                                                                                //T20

})(jQuery);
