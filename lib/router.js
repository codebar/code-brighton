function router(req, res){
	res.writeHead(200, {
		'Accept': 'text/html'
	});
	res.write('<h1> Hello World </h1>');
	res.end();
}

module.exports = router;
