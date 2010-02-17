
(function($, server){
	
	server.methods('GET DELETE PUT POST');
	
	GET( /test_path.*/, function(e,on,un,hit){
		on('sos',function(){})
		console.log("HOME")
	});
	
})(jQuery, platform());