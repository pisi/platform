
(function($, window){

platform(function Events(__, storage){
  var
    config= {                                                                                         //T7
    },
    store,
    pool= $(document)                                                                                 //T14
  __
  .api('0.1', {
    kick: function(events, data){ trigger(events, data); return __ },                                 //T5 T6
    on: function(events, reactions){ event(true, events, reactions); return __ },                     //T5 T6
    un: function(events, reactions){ event(false, events, reactions); return __ }                     //T5 T6
  })

  function setup(){ store= storage() }
  function teardown(){ store= undefined }
  function many(subjects){ return typeof subjects=="object" && subjects || [subjects] }               //T-
  function event(create, events, reactions){ $.each(many(events), process)                            //T10
    function process(i, event){ $.each(many(reactions), handle)                                       //T8
      function handle(ii, reaction){ unbind() && create && bind()                                     //T8
        function unbind(){ return pool.unbind(event, reaction) }                                      //T9
        function bind(){ return pool.bind(event, reaction) }                                          //T5
      }
    }
  }
  function trigger(events, data){ report(); $.each(many(events), process)                             //T11 T12 T13 T15
    function process(i,event){ pool.trigger(event, data) }                                            //T5
    function report(){ config.debug && log()
      function log(){ debug.log(events.length==1 && events[0] || events, data || '') }                //D
    }
  }
  setup();
},{
  
});

})(jQuery, this);
