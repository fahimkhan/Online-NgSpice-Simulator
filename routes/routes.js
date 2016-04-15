module.exports = function(express,app,fs,os,io){
	console.log("Server started!!! ");	

	var router = express.Router();

	router.get('/',function(req,res,next){
        res.render('index',{host:app.get('host'),title:'Ngspice Simulator'});
    
    });

	io.on('connection', function (socket) {
  		socket.emit('loadingPage', 'User with socket ID '+socket.id+' is Connected');
  		socket.on('user', function (data) {
    		console.log('Socket ID : '+data['socketID']);
  		});

  		socket.on('netlist',function(netlistContent){
			console.log('Server : '+netlistContent);
			socket.emit('serverMessage','Client Message Received');
		});	
	});


    
	app.use('/',router);
}