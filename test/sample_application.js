
(function(__, $){
  var ok;
  __
  .methods('GET DELETE PUT POST')
  .methods('DELETE HACK')

  .before( /^test.*/, function(result){ return "Test: " + result })
  .after( /_path.*/, function(result){ return result + " FINISHED" })
  .after( 'POST', function(result){ return result + " POSTED" })
  
  .GET( /^test_path\/?$/, function(result){
    // return false;
    return result + 'AJHDGADJGH';
  })
  .GET( /^without_params\/?$/, function(result){
    return result + 'AJHDGADJGH';
  })
  .GET( /^with_params\/?/, function(result){
    return result + 'AJHDGADJGH';
  })
  .GET( /^test\/?$/, function(result){
    return result + 'AJHDGADJGHv g er gerg erhsf';
  })
  .GET( /^test654fg65h4df\/?$/, function(result){
    return result + '65654613531';
  })
  .POST( /^test\/?$/, function(result){
    return result + 'sg16rt5h46rt5h1d3';
  })
  .dump();

  __
  .request('GET', '/with_params?s=x&d=3') // 200
  .request('GET', '/with_params/?s=x&d=3') // 200
  .request('GET', '/without_params/') // 200
  .request('GET', '/without_params') // 200
  .request('GET', 'without_params') // 404
  .request('GET', '/test_path/') // 200
  .request('GET', 'test_path') // 200
  .request('POST', '/test') // 200
  .request('GET', '/test_path   ') // 200
  .request('GET', '/test_path?sds=sd2') // 200
  .request('GET', '   /test_path?sds=sd2') // 200
  .request('HACK', '/test_path') // 405
  .request('GET', '/another_test_path/') // 404
  .request('GET', '../test_path') // 404
  .request('POST', '/test_path') // 404
  .request('GET', 'test_path?sds=sd2     ') // 400
  
})(platform(), jQuery);