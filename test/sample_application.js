
(function(__, $){
  
  __.methods('GET DELETE PUT POST');
  
  __.GET( /test_path.*/, function(e){
    __.on('sos',function(){})
  });
  
})(platform(), jQuery);