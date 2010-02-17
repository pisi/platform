
(function(P, $){
  
  P.methods('GET DELETE PUT POST');
  
  P.GET( /test_path.*/, function(e){
    P.on('sos',function(){})
  });
  
})(platform(), jQuery);