module.exports = function(express,app,fs,os,io){
	console.log("Server started!!! ");	

	var router = express.Router();

	router.get('/',function(req,res,next){
        res.render('index',{host:app.get('host'),title:'Ngspice Simulator'});
    
    });

	io.on('connection', function (socket) {
  		socket.emit('loadingPage', 'User Connected');
  		socket.on('user', function (data) {
    		console.log('Server:'+data);
  		});
	});

	
    
	app.use('/',router);
}